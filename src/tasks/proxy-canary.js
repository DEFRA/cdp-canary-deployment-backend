import Wreck from '@hapi/wreck'
import { config } from '../config/index.js'
import { metricsCounter } from '~/src/api/common/helpers/metrics.js'

export async function checkProxy(server) {
  const url = config.get('proxyCanary.url')
  try {
    const { res } = await Wreck.get(url)
    await Wreck.read(res)
    if (res.statusCode >= 200 && res.statusCode < 300) {
      server.logger.info(`Proxy call to ${url} ok: code ${res.statusCode}`)
      await metricsCounter('proxy-canary', 1)
    } else {
      await metricsCounter('proxy-canary', 0)
      server.logger.error(
        `Proxy to call ${url} responded with code status ${res.statusCode}`
      )
    }
  } catch (e) {
    server.logger.error(`Failed to call ${url} via the proxy`, e)
  }
}
