import { config } from '~/src/config/index.js'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'

const serviceVersion = config.get('serviceVersion')

/**
 * Version controller
 * Returns the version of this service
 * @satisfies {Partial<ServerRoute>}
 */
const versionController = {
  handler: (_request, h) =>
    h
      .response({ message: 'success', version: serviceVersion })
      .code(statusCodes.ok)
}

export { versionController }
