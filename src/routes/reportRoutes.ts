import express from 'express'
import {
  createReport,
  getUserReports,
  deleteReport,
} from '../controllers/reportController'
import authMiddleware from '../middleware/auth'

const router = express.Router()

router.post('/createReport', authMiddleware, <any>createReport)
router.get('/reports', authMiddleware, <any>getUserReports)
router.delete('/deleteReport/:id', authMiddleware, <any>deleteReport)

export default router
