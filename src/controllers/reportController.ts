import { Request, Response } from 'express'
import Report from '../models/Report.js'

interface AuthenticatedRequest extends Request {
  user: {
    userId: string
  }
}

export const createReport = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const { pulse, bloodPressure, weight, bloodSugar } = req.body

    const newReport = new Report({
      user: req.user.userId,
      pulse,
      bloodPressure,
      weight,
      bloodSugar,
    })

    await newReport.save()
    res.status(201).json(newReport)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: message })
  }
}

export const getUserReports = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const reports = await Report.find({ user: req.user.userId }).sort({
      createdAt: -1,
    })

    res.json(reports)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: message })
  }
}

export const deleteReport = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params

    const report = await Report.findById(id)

    if (!report) {
      res.status(404).json({ message: 'Report not found' })
      return
    }

    if (report.user.toString() !== req.user.userId) {
      res.status(403).json({ message: 'Unauthorized' })
      return
    }

    await report.deleteOne()
    res.json({ message: 'Report deleted successfully' })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: message })
  }
}
