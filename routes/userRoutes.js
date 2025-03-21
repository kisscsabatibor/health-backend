import express from 'express'
import { deleteUser, getProfile } from '../controllers/userController.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.get('/profile', authMiddleware, getProfile)
router.delete('/profile', authMiddleware, deleteUser)

export default router
