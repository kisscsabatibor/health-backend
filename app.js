import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import reportRoutes from './routes/reportRoutes.js'
import assignRoutes from './routes/assignmentRoutes.js'
import requestRoutes from './routes/requestRoutes.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/report', reportRoutes)
app.use('/api/assignment', assignRoutes)
app.use('/api/request', requestRoutes)

export default app
