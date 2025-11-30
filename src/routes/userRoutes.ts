import express from 'express'
import {
  deleteUser,
  getProfile,
  updateProfile,
  getDoctors,
  getPatients,
} from '../controllers/userController.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.get('/profile', authMiddleware, <any>getProfile)
router.get('/doctors', authMiddleware, getDoctors)
router.get('/patients', authMiddleware, getPatients)
router.delete('/profile', authMiddleware, <any>deleteUser)
router.put('/profile', authMiddleware, <any>updateProfile)

export default router
