import express from 'express'
import {
  createReport,
  getUserReports,
  deleteReport,
} from '../controllers/reportController.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.post('/createReport', authMiddleware, <any>createReport)
router.get('/reports', authMiddleware, <any>getUserReports)
router.delete('/deleteReport/:id', authMiddleware, <any>deleteReport)

export default router
