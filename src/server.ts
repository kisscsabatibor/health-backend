import { config } from 'dotenv'
import connectDB from './config/db'
import app from './app'

config()
const port = Number(process.env.PORT) || 3000

connectDB()
app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`))
