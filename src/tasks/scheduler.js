import cron from 'node-cron'
import { checkMongo } from '~/src/tasks/mongo-canary.js'
import { metricsTimer } from '~/src/api/common/helpers/metrics.js'

export const mongoScheduler = {
  plugin: {
    name: 'Mongo Scheduler',
    version: '0.1.0',
    register: (server, options) => {
      if (!options.enabled) {
        server.logger.info('Mongo scheduler is NOT enabled')
        return
      }

      server.logger.info(
        `Mongo scheduler is enabled, running every ${options.interval}`
      )
      cron.schedule(options.interval, async () => {
        await metricsTimer('canaryMongo', async () => await checkMongo(server))
      })
    }
  }
}
