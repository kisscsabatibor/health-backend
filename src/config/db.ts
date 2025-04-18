import mongoose from 'mongoose'
import { config } from 'dotenv'

config()
const uri = process.env.DB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(<string>uri)
    console.log('MongoDB Connected')
  } catch (err) {
    console.error('MongoDB Connection Error:', err)
    process.exit(1)
  }
}

export default connectDB
