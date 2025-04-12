import express from 'express'
import {
  assignDoctorToPatient,
  getPatientAssignedDoctors,
  getDoctorsAssignedPatients,
  deleteDoctorAssignment,
} from '../controllers/assignmentController.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.post('/assign', authMiddleware, assignDoctorToPatient)
router.get('/assignedDoctors', authMiddleware, getPatientAssignedDoctors)
router.get('/assignedPatients', authMiddleware, getDoctorsAssignedPatients)
router.delete('/assign', authMiddleware, deleteDoctorAssignment)

export default router
