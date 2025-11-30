import { Request, Response, NextFunction } from 'express'
import { METRICS_KEYWORDS, incrementMetric } from '../metrics/metricsStore.js'

export function acceptLanguageLogger(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const acceptLanguage = <string>req.headers['Accept-Language']

  if (acceptLanguage) {
    const primaryLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase()

    switch (primaryLang) {
      case 'de':
        incrementMetric(METRICS_KEYWORDS.DE_REQUESTS)
        break
      case 'en':
        incrementMetric(METRICS_KEYWORDS.EN_REQUESTS)
        break
      case 'hu':
        incrementMetric(METRICS_KEYWORDS.HU_REQUESTS)
        break
      default:
        break
    }
  }
  next()
}
