export const enum METRICS_KEYWORDS {
  TOTAL_REGISTRATIONS = 'totalRegistrations',
  TOTAL_LOGINS = 'totalLogins',
  ACTIVE_TOKENS = 'activeTokens',
  DE_REQUESTS = 'deRequests',
  EN_REQUESTS = 'enRequests',
  HU_REQUESTS = 'huRequests',
}

export const metrics: Record<string, { value: number; updatedAt: Date }> = {}

export function incrementMetric(metricName: string, amount = 1) {
  if (!metrics[metricName]) {
    metrics[metricName] = { value: 0, updatedAt: new Date() }
  }
  metrics[metricName].value += amount
  metrics[metricName].updatedAt = new Date()
}

export function setMetric(metricName: string, value: number) {
  metrics[metricName] = { value, updatedAt: new Date() }
}

export function getAllMetrics() {
  return Object.entries(metrics).map(([name, data]) => ({
    name,
    value: data.value,
    updatedAt: data.updatedAt,
  }))
}
