import Assignment from '../models/Assignment.js'
import User from '../models/User.js'
import Report from '../models/Report.js'
import Request from '../models/Request.js'

export const assignDoctorToPatient = async (req, res) => {
  const patientId = req.user.userId
  const { doctorId } = req.body

  try {
    const patient = await User.findById(patientId)
    const doctor = await User.findById(doctorId)

    if (!patient || !doctor) {
      return res.status(400).json({ message: 'Patient or Doctor not found' })
    }

    if (patient.role !== 'patient' || doctor.role !== 'doctor') {
      return res.status(400).json({ message: 'Invalid roles' })
    }

    let assignment = await Assignment.findOne({ patient: patientId })

    await Request.deleteOne({
      patient: patientId,
      doctor: doctorId,
    })

    if (!assignment) {
      assignment = new Assignment({
        patient: patientId,
        doctors: [doctorId],
      })
      await assignment.save()
    } else {
      if (assignment.doctors.includes(doctorId)) {
        return res
          .status(400)
          .json({ message: 'Doctor is already assigned to this patient' })
      }

      assignment.doctors.push(doctorId)
      await assignment.save()
    }

    res.status(201).json({ message: 'Doctor assigned to patient successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const getPatientAssignedDoctors = async (req, res) => {
  const patientId = req.user.userId
  try {
    const assignment = await Assignment.findOne({
      patient: patientId,
    }).populate('doctors')

    if (!assignment) {
      return res
        .status(404)
        .json({ message: 'No doctors assigned to this patient' })
    }

    res.status(200).json(assignment.doctors)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const getDoctorsAssignedPatients = async (req, res) => {
  const doctorId = req.user.userId

  try {
    const assignments = await Assignment.find({ doctors: doctorId })
      .populate('patient')
      .exec()

    if (assignments.length === 0) {
      return res
        .status(404)
        .json({ message: 'No patients found for this doctor.' })
    }

    const patients = assignments.map((assignment) => assignment.patient)

    return res.status(200).json(patients)
  } catch (error) {
    return res.status(500).json({ message: 'Server error.' })
  }
}

export const deleteDoctorAssignment = async (req, res) => {
  const patientId = req.user.userId
  const { doctorId } = req.body

  try {
    const assignment = await Assignment.findOne({ patient: patientId })

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' })
    }

    assignment.doctors = assignment.doctors.filter(
      (docId) => docId.toString() !== doctorId,
    )

    if (assignment.doctors.length === 0) {
      await Assignment.findByIdAndDelete(assignment._id)
    } else {
      await assignment.save()
    }

    res.status(200).json({ message: 'Doctor assignment removed successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const getPatientReports = async (req, res) => {
  const doctorId = req.user.userId
  const patientId = req.params.patientId

  try {
    const doctor = await User.findById(doctorId)
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(403).json({ message: 'Access denied. Not a doctor.' })
    }

    const assignment = await Assignment.findOne({
      patient: patientId,
      doctors: doctorId,
    })

    if (!assignment) {
      return res
        .status(403)
        .json({ message: 'You are not assigned to this patient.' })
    }

    const reports = await Report.find({ user: patientId }).sort({
      createdAt: -1,
    })
    return res.status(200).json(reports)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error.' })
  }
}
