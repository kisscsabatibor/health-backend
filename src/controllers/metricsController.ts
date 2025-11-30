import { Request, Response } from 'express'
import { getAllMetrics, getLanguageMetrics } from '../metrics/metricsStore.js'

export const getMetrics = async (req: Request, res: Response) => {
  const metrics = getAllMetrics()
  res.json(metrics)
}

export const getLangMetrics = async (req: Request, res: Response) => {
  const metrics = getLanguageMetrics()
  res.json(metrics)
}
