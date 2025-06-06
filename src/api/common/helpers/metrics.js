import {
  createMetricsLogger,
  Unit,
  StorageResolution
} from 'aws-embedded-metrics'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/api/common/helpers/logging/logger.js'

const logger = createLogger()

/**
 * @param {string} metricName
 * @param {number} value
 */
const metricsCounter = async (metricName, value = 1) => {
  const isMetricsEnabled = config.get('isMetricsEnabled')

  if (!isMetricsEnabled) {
    return
  }

  const metricsLogger = createMetricsLogger()

  try {
    metricsLogger.putMetric(
      metricName,
      value,
      Unit.Count,
      StorageResolution.Standard
    )
    await metricsLogger.flush()
  } catch (error) {
    logger.error(error, error.message)
  }
}

/**
 * @param {string} metricName
 * @param {Function} fn
 */
export const metricsTimer = async (metricName, fn) => {
  const isMetricsEnabled = config.get('isMetricsEnabled')

  if (!isMetricsEnabled) {
    return
  }

  const metricsLogger = createMetricsLogger()

  const start = process.hrtime.bigint()

  try {
    return await fn()
  } finally {
    const end = process.hrtime.bigint()
    const durationMs = Number(end - start) / 1_000_000
    try {
      metricsLogger.putMetric(
        metricName,
        durationMs,
        Unit.Milliseconds,
        StorageResolution.Standard
      )
      await metricsLogger.flush()
    } catch (error) {
      logger.error(error, error.message)
    }
  }
}

export { metricsCounter }
