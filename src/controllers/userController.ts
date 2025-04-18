import { Request as ExpressRequest, Response } from 'express'
import User from '../models/User'

interface AuthenticatedRequest extends ExpressRequest {
  user?: {
    userId: string
  }
}

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const user = await User.findById(userId).select('-password')
    res.json(user)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const response = await User.findByIdAndDelete(userId)
    res.json(response)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user?.userId
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const updates = req.body
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select('-password')

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

export const getDoctors = async (_req: ExpressRequest, res: Response) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('-password')
    res.json(doctors)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

export const getPatients = async (_req: ExpressRequest, res: Response) => {
  try {
    const patients = await User.find({ role: 'patient' }).select('id name')
    res.json(patients)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
