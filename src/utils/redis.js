'use strict'
const config = require('../config/index.js')
const redis = require('redis')
const { promisify } = require('util')
const { logger } = require('./logger')

/**
 * Redis Instance
 */
class RedisInstance {
  createClient () {
    const redisConfig = config.redisConfig
    const connection = {
      host: redisConfig.host,
      port: redisConfig.port,
      retry_strategy: function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
          return new Error('The server refused the connection')
        }
        if (options.total_retry_time && options.total_retry_time > 1000 * 60) {
          return new Error('Retry time exhausted')
        }
        if (options.attempt > 5) {
          return undefined
        }
        return Math.min(options.attempt * 100, 3000)
      }
    }
    const redisClient = redis.createClient(connection)
    redisClient.on(RedisInstance.ON_RECONNECTING, (param) => {
      logger.info(`Redis connection has not been established. Reconnecting... Attempt: ${param.attempt}`)

      if (param.attempt >= 10) {
        logger.error('Web server is going to shut down. Disconnecting...')
        process.exit(1)
      }
    })
    redisClient.on(RedisInstance.ON_ERROR, (error) => logger.error(error))
    redisClient.on(RedisInstance.ON_CONNECT, () => logger.info('Redis successfully connected'))
    // add promisify functions
    redisClient.asyncGet = promisify(redisClient.get).bind(redisClient)
    redisClient.asyncHMSet = promisify(redisClient.hmset).bind(redisClient)
    redisClient.asyncHMGet = promisify(redisClient.mget).bind(redisClient)
    redisClient.asyncSet = promisify(redisClient.set).bind(redisClient)
    redisClient.asyncKeys = promisify(redisClient.keys).bind(redisClient)
    redisClient.asyncDel = promisify(redisClient.del).bind(redisClient)
    redisClient.asyncExists = promisify(redisClient.exists).bind(redisClient)
    return redisClient
  }
}

RedisInstance.ON_RECONNECTING = 'reconnecting'
RedisInstance.ON_ERROR = 'error'
RedisInstance.ON_CONNECT = 'connect'

const redisInstance = new RedisInstance()

exports.redisClient = redisInstance.createClient()
