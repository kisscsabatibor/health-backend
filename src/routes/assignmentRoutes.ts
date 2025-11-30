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

router.post('/assign', authMiddleware, <any>assignDoctorToPatient)
router.get('/assignedDoctors', authMiddleware, <any>getPatientAssignedDoctors)
router.get('/assignedPatients', authMiddleware, <any>getDoctorsAssignedPatients)
router.get('/patientReports/:patientId', authMiddleware, <any>getPatientReports)
router.delete('/assign', authMiddleware, <any>deleteDoctorAssignment)

export default router
