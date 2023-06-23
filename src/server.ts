import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'
async function database() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(' Database is Connected Successfully')
    app.listen(config.port, () => {
      logger.info(`App Listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(`Failed to connect database.`, error)
  }
}
database()
