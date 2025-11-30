import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { METRICS_KEYWORDS, setMetric } from '../metrics/metricsStore.js'

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload
}

const activeTokens = new Map<string, Date>()

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
    const verified = <JwtPayload>(
      jwt.verify(token, <jwt.Secret>process.env.JWT_SECRET)
    )
    req.user = verified
    if (!activeTokens.has(token)) {
      activeTokens.set(token, new Date(verified.exp! * 1000))
    }
    const now = new Date()
    for (const [t, exp] of activeTokens.entries()) {
      if (exp <= now) activeTokens.delete(t)
    }
    setMetric(METRICS_KEYWORDS.ACTIVE_TOKENS, activeTokens.size)
    next()
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}

export default authMiddleware
