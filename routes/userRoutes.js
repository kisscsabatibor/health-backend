import express from 'express'
import {
  deleteUser,
  getProfile,
  updateProfile,
} from '../controllers/userController.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.get('/profile', authMiddleware, getProfile)
router.delete('/profile', authMiddleware, deleteUser)
router.put('/profile', authMiddleware, updateProfile)

export default router
