import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')
  if (!token) {
    res.status(401).send('Access Denied')
    return
  }
  try {
    const verified = jwt.verify(token, <jwt.Secret>process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}

export default authMiddleware
