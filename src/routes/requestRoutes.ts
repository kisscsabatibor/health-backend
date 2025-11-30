import express from 'express'
import authMiddleware from '../middleware/auth.js'
import {
  createRequest,
  getAllRequests,
  deleteRequest,
} from '../controllers/requestController.js'

const router = express.Router()

router.post('/createRequest', authMiddleware, <any>createRequest)
router.get('/getRequests', authMiddleware, <any>getAllRequests)
router.delete('/deleteRequest', authMiddleware, <any>deleteRequest)

export default router
