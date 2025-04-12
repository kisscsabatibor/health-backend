import mongoose from 'mongoose'

const AssignmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctors: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ],
  assignedAt: { type: Date, default: Date.now },
})

export default mongoose.model('Assignment', AssignmentSchema)
