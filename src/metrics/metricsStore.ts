export const metrics = {
  logins: { value: 0, updatedAt: new Date() },
  registrations: { value: 0, updatedAt: new Date() },
}

type metricType = 'logins' | 'registrations'

export function increment(metricName: metricType, amount = 1) {
  if (!metrics[metricName]) {
    metrics[metricName] = { value: 0, updatedAt: new Date() }
  }
  metrics[metricName].value += amount
  metrics[metricName].updatedAt = new Date()
}

export function getAllMetrics() {
  return Object.entries(metrics).map(([name, data]) => ({
    name,
    value: data.value,
    updatedAt: data.updatedAt,
  }))
}
