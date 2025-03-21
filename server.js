import { config } from 'dotenv'
import connectDB from './config/db.js'
import app from './app.js'

config()
const port = process.env.PORT || 3000

connectDB()
app.listen(port, () => console.log(`Server running on port ${port}`))
