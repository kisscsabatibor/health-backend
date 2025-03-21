import express from 'express'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from './models/User.js'
import authMiddleware from './middleware/auth.js'

const app = express()
app.use(express.json())
const port = 3000
config()
const uri = process.env.DB_URI
mongoose
  .connect(uri)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashedPassword })
    await user.save()
    res.status(201).send('User registered')
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials')
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    res.json({ token })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.get('/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password')
  res.json(user)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
})
