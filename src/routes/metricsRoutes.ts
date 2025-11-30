import express from 'express'
import { getMetrics, getLangMetrics } from '../controllers/metricsController.js'

const router = express.Router()

router.get('/metrics', getMetrics)
router.get('/metrics/lang', getLangMetrics)

export default router
