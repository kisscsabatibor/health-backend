import express from 'express'
import authMiddleware from '../middleware/auth'
import {
  createRequest,
  getAllRequests,
  deleteRequest,
} from '../controllers/requestController'

const router = express.Router()

router.post('/createRequest', authMiddleware, <any>createRequest)
router.get('/getRequests', authMiddleware, <any>getAllRequests)
router.delete('/deleteRequest', authMiddleware, <any>deleteRequest)

export default router
