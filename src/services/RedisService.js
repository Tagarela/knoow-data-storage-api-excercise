const { redisClient } = require('../utils/redis')
const { InternalServerError } = require('../utils/http-errors')

/**
 * Redis Service Client
 */
class RedisService {
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
    const res = await this.client.asyncSet(key, JSON.stringify(content))
    return res
  }
}

RedisService.REPO_TABLE_PREFIX = 'repo'
exports.RedisService = RedisService