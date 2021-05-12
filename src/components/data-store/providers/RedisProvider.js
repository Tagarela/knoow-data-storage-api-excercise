const { DataStoreProviderAbstract } = require('./DataStoreProviderAbstract')
const { RedisService } = require('../../../services/RedisService')
const { UnprocessableError } = require('../../../utils/http-errors')

/**
 * Redis Provider
 */
class RedisProvider extends DataStoreProviderAbstract {
  constructor() {
    super();
    this.service = new RedisService()
  }

  /**
   * Generate redis key
   *
   * @param Object data
   *
   * @returns string
   */
  static generateDataRedisKey(data) {
    if (!data.repository || !data.oid || !data.hash) {
      throw new UnprocessableError('something went wrong')
    }
    const key = RedisService.REPO_TABLE_PREFIX + '::' + data.repository + '::' + data.hash + '::' + data.oid
    return key
  }

  /**
   * Save Data
   *
   * @param Object data
   *
   * @returns {Promise<void>}
   */
  async save(data) {
    const key = RedisProvider.generateDataRedisKey(data)
    await this.service.set(key, data)
    return data.oid
  }
}

RedisProvider.PROVIDER_NAME = 'redis'

exports.RedisProvider = RedisProvider
