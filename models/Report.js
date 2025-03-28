import mongoose from 'mongoose'
const ReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pulse: { type: Number },
  bloodPressure: { type: String },
  weight: { type: Number },
  bloodSugar: { type: Number },
})
export default mongoose.model('Report', ReportSchema)
