import { versionController } from '~/src/api/version/controllers/index.js'

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
          ...versionController
        }
      ])
    }
  }
}

export { version }

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
