import express from 'express'
import authMiddleware from '../middleware/auth.js'
import {
  createRequest,
  getAllRequests,
  deleteRequest,
} from '../controllers/requestController.js'

const router = express.Router()

router.post('/createRequest', authMiddleware, createRequest)
router.get('/getRequests', authMiddleware, getAllRequests)
router.delete('/deleteRequest', authMiddleware, deleteRequest)

export default router
