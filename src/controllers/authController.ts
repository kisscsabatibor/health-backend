import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, role, birthDay } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      email,
      password: hashedPassword,
      name,
      role,
      birthDay,
    })

    await user.save()

    res.status(201).json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: message })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw new Error('JWT_SECRET not defined in environment')
    }

    const token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: '1h',
    })

    res.json({ token, role: user.role })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: message })
  }
}
