export enum METRICS_KEYWORDS {
  TOTAL_REGISTRATIONS = 'totalRegistrations',
  TOTAL_LOGINS = 'totalLogins',
  ACTIVE_TOKENS = 'activeTokens',
  REQUESTS = 'requests',
  DE_REQUESTS = 'deRequests',
  EN_REQUESTS = 'enRequests',
  HU_REQUESTS = 'huRequests',
}

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
  return Object.entries(metrics).map(([name, data]) => ({
    name,
    value: data.value,
    updatedAt: data.updatedAt,
  }))
}
