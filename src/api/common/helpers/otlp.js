// src/lib/metrics.js
import {
  MeterProvider,
  PeriodicExportingMetricReader
} from '@opentelemetry/sdk-metrics'
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'

const metricExporter = new OTLPMetricExporter({
  url:
    process.env.OTEL_EXPORTER_OTLP_ENDPOINT ??
    'http://localhost:4318/v1/metrics'
})

const meterProvider = new MeterProvider({})
meterProvider.addMetricReader(
  new PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: 5000
  })
)

const meter = meterProvider.getMeter('cdp-canary-backend')

export const versionRequestCounter = meter.createCounter(
  'version_endpoint_total',
  {
    description: 'Total number of hits to the /version endpoint'
  }
)
