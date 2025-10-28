import { versionController } from '~/src/api/version/controllers/index.js'
import { versionRequestCounter } from '~/src/api/common/helpers/otlp.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
const version = {
  plugin: {
    name: 'version',
    register: (server) => {
      server.route([
        {
          method: 'GET',
          path: '/version',
          // Spread the existing controller config (validate, tags, etc)
          ...versionController,
          // Override handler so we can increment the metric first
          handler: async (request, h) => {
            versionRequestCounter.add(1)
            return await versionController.handler(request, h)
          }
        }
      ])
    }
  }
}

export { version }

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
