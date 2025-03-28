import express from 'express'
import {
  createReport,
  getUserReports,
  deleteReport,
} from '../controllers/reportController.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.post('/createReport', authMiddleware, createReport)
router.get('/reports', authMiddleware, getUserReports)
router.delete('/deleteReport/:id', authMiddleware, deleteReport)

export default router
