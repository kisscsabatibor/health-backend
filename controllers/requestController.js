import Request from '../models/Request.js'

export const createRequest = async (req, res) => {
  try {
    const { patientId } = req.body
    const doctorId = req.user.userId

    if (!patientId) {
      return res.status(400).json({ error: 'Patient ID is required' })
    }

    const existingRequest = await Request.findOne({
      doctor: doctorId,
      patient: patientId,
    })

    if (existingRequest) {
      return res.status(409).json({ error: 'Request already exists' })
    }

    const newRequest = new Request({
      patient: patientId,
      doctor: doctorId,
    })
    await newRequest.save()

    res.status(201).json(newRequest)
  } catch (error) {
    res.status(500).json({ error: 'Server Error', details: error.message })
  }
}

export const getAllRequests = async (req, res) => {
  try {
    const userId = req.user.userId

    const requests = await Request.find({
      $or: [{ doctor: userId }, { patient: userId }],
    })
      .populate('patient', 'name')
      .populate('doctor', 'name')

    res.status(200).json(requests)
  } catch (error) {
    res.status(500).json({ error: 'Server Error', details: error.message })
  }
}

export const deleteRequest = async (req, res) => {
  try {
    const { requestId } = req.body
    const userId = req.user.userId

    const request = await Request.findById(requestId)

    if (!request) {
      return res.status(404).json({ error: 'Request not found' })
    }

    const isAuthorized =
      request.patient.toString() === userId ||
      request.doctor.toString() === userId

    if (!isAuthorized) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    await Request.findByIdAndDelete(requestId)

    res.status(200).json({ message: 'Request deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Server Error', details: error.message })
  }
}
