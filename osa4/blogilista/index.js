const app = require('./app') // The Express app
const logger = require('./utils/logger')
const config = require('./utils/config')

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })