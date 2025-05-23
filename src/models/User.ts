import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  birthDay: { type: Date, required: true },
  role: {
    type: String,
    required: true,
    enum: ['patient', 'doctor'],
    default: 'patient',
  },
  city: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
})
export default mongoose.model('User', UserSchema)
