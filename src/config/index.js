require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV || 'local',
  port: process.env.PORT || 3001,
  dataStorage: process.env.DATA_STORAGE_SYSTEM,
  redisConfig: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    url: process.env.REDIS_URL || `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_PASSWORD
  }
}
