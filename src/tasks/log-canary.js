export async function checkLog(server) {
  // Removing this will result in platform alerts
  await server.logger.info(`Synthetic log event`)
}
