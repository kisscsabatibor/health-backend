import express from 'express'
import {
  assignDoctorToPatient,
  getPatientAssignedDoctors,
  getDoctorsAssignedPatients,
  deleteDoctorAssignment,
  getPatientReports,
} from '../controllers/assignmentController.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.post('/assign', authMiddleware, assignDoctorToPatient)
router.get('/assignedDoctors', authMiddleware, getPatientAssignedDoctors)
router.get('/assignedPatients', authMiddleware, getDoctorsAssignedPatients)
router.get('/patientReports/:patientId', authMiddleware, getPatientReports)
router.delete('/assign', authMiddleware, deleteDoctorAssignment)

export default router
