import mongoose from 'mongoose'

const RequestSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedAt: { type: Date, default: Date.now },
})

export default mongoose.model('Request', RequestSchema)
