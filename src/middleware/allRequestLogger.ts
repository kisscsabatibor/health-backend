import { Request, Response, NextFunction } from 'express'
import axios from 'axios'

const LOGTAIL_URL = 'https://s1613097.eu-nbg-2.betterstackdata.com'
const LOGTAIL_TOKEN = process.env.LOGTAIL_SOURCE_TOKEN

export const allRequestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now()

  res.on('finish', async () => {
    const duration = Date.now() - start

    const logData = {
      message: req.method + ' ' + req.originalUrl,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs: duration,
    }

    if (LOGTAIL_TOKEN) {
      try {
        await axios.post(LOGTAIL_URL, logData, {
          headers: {
            Authorization: `Bearer ${LOGTAIL_TOKEN}`,
            'Content-Type': 'application/json',
          },
        })
      } catch (err) {
        console.error('Failed to send log to Better Stack:', err)
      }
    }
  })

  next()
}
