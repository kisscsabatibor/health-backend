import { Request, Response } from 'express'
import { getAllMetrics } from '../metrics/metricsStore.js'

export const getMetrics = async (req: Request, res: Response) => {
  const metrics = getAllMetrics()
  res.json(metrics)
}
