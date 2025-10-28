import {
  MeterProvider,
  PeriodicExportingMetricReader
} from '@opentelemetry/sdk-metrics'
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'
import { resourceFromAttributes } from '@opentelemetry/resources'

const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: 'cdp-canary-deployment-backend'
})

const metricExporter = new OTLPMetricExporter({
  url:
    process.env.OTEL_EXPORTER_OTLP_ENDPOINT ??
    'http://localhost:4318/v1/metrics'
})

const meterProvider = new MeterProvider({
  resource,
  metricReaders: [
    new PeriodicExportingMetricReader({
      exporter: metricExporter,
      exportIntervalMillis: 5000
    })
  ]
})

export const meter = meterProvider.getMeter('cdp-canary-deployment-backend')

export const versionRequestCounter = meter.createCounter(
  'version_endpoint_total',
  {
    description: 'Total number of hits to the /version endpoint'
  }
)
