const { redisClient } = require('../utils/redis')
const { InternalServerError } = require('../utils/http-errors')

/**
 * Redis Service Client
 */
class RedisService {
  /**
   * constructor
   */
  constructor () {
    this.client = redisClient
  }
  /**
   * Save Data
   *
   * @param Object content
   *
   * @returns {Promise<void>}
   */
  async set (key, content) {
    if (!content || !key) {
      throw new InternalServerError('Save data error')
    }
    return this.client.asyncSet(key, JSON.stringify(content))
  }

  /**
   * async Keys
   *
   * @param pattern
   *
   * @returns {Promise<*>}
   */
  async asyncKeys (pattern) {
    return this.client.asyncKeys(pattern)
  }

  /**
   * Get record
   *
   * @param string key
   *
   * @returns {Promise<*>}
   */
  async get(key) {
    return this.client.asyncGet(key)
  }
}

RedisService.REPO_TABLE_PREFIX = 'repo'
exports.RedisService = RedisService