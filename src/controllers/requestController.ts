import { Request as ExpressRequest, Response } from 'express'
import RequestModel from '../models/Request.js'
import { Types } from 'mongoose'

interface AuthenticatedRequest extends ExpressRequest {
  user?: {
    userId: string
  }
}

export const createRequest = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const { patientId }: { patientId: string } = req.body
    const doctorId = req.user?.userId

    if (!patientId) {
      return res.status(400).json({ error: 'Patient ID is required' })
    }

    if (!doctorId) {
      return res.status(401).json({ error: 'Unauthorized: Missing doctor ID' })
    }

    const existingRequest = await RequestModel.findOne({
      doctor: doctorId,
      patient: patientId,
    })

    if (existingRequest) {
      return res.status(409).json({ error: 'Request already exists' })
    }

    const newRequest = new RequestModel({
      patient: new Types.ObjectId(patientId),
      doctor: new Types.ObjectId(doctorId),
    })
    await newRequest.save()

    res.status(201).json(newRequest)
  } catch (error: any) {
    res.status(500).json({ error: 'Server Error', details: error.message })
  }
}

export const getAllRequests = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user?.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: Missing user ID' })
    }

    const requests = await RequestModel.find({
      $or: [{ doctor: userId }, { patient: userId }],
    })
      .populate('patient', 'name')
      .populate('doctor', 'name')

    res.status(200).json(requests)
  } catch (error: any) {
    res.status(500).json({ error: 'Server Error', details: error.message })
  }
}

export const deleteRequest = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const { requestId }: { requestId: string } = req.body
    const userId = req.user?.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: Missing user ID' })
    }

    const request = await RequestModel.findById(requestId)

    if (!request) {
      return res.status(404).json({ error: 'Request not found' })
    }

    const isAuthorized =
      request.patient.toString() === userId ||
      request.doctor.toString() === userId

    if (!isAuthorized) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    await RequestModel.findByIdAndDelete(requestId)

    res.status(200).json({ message: 'Request deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ error: 'Server Error', details: error.message })
  }
}
