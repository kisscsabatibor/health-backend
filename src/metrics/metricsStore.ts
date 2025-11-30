export enum METRICS_KEYWORDS {
  TOTAL_REGISTRATIONS = 'totalRegistrations',
  TOTAL_LOGINS = 'totalLogins',
  ACTIVE_TOKENS = 'activeTokens',
  REQUESTS = 'requests',
  DE_REQUESTS = 'deRequests',
  EN_REQUESTS = 'enRequests',
  HU_REQUESTS = 'huRequests',
}

const LANGUAGE_METRICS = [
  METRICS_KEYWORDS.DE_REQUESTS,
  METRICS_KEYWORDS.EN_REQUESTS,
  METRICS_KEYWORDS.HU_REQUESTS,
] as const

export const metrics: Record<string, { value: number; updatedAt: Date }> =
  Object.values(METRICS_KEYWORDS).reduce(
    (acc, key) => {
      acc[key] = { value: 0, updatedAt: new Date() }
      return acc
    },
    {} as Record<string, { value: number; updatedAt: Date }>,
  )

export function incrementMetric(metricName: string, amount = 1) {
  if (!metrics[metricName]) {
    throw new Error(`Metric "${metricName}" does not exist.`)
  }
  metrics[metricName].value += amount
  metrics[metricName].updatedAt = new Date()
}

export function setMetric(metricName: string, value: number) {
  if (!metrics[metricName]) {
    throw new Error(`Metric "${metricName}" does not exist.`)
  }
  metrics[metricName].value = value
  metrics[metricName].updatedAt = new Date()
}

export function getAllMetrics() {
  return Object.entries(metrics)
    .filter(
      ([name]) =>
        name != METRICS_KEYWORDS.DE_REQUESTS &&
        name != METRICS_KEYWORDS.EN_REQUESTS &&
        name != METRICS_KEYWORDS.HU_REQUESTS,
    )
    .map(([name, data]) => ({
      name,
      value: data.value,
      updatedAt: data.updatedAt,
    }))
}

export function getLanguageMetrics() {
  return LANGUAGE_METRICS.map((key) => ({
    name: key,
    value: metrics[key].value,
    updatedAt: metrics[key].updatedAt,
  }))
}
