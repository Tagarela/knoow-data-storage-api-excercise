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
   * Generate pattern for search in redis
   *
   * @param Object data
   *
   * @returns {string}
   */
  static generateDataRedisSearchPattern(data) {
    const patternObject = {
      repository: "*",
      hash: "*",
      oid: "*"
    }
    if (data.repository) {
      patternObject.repository = data.repository
    }
    if (data.hash) {
      patternObject.hash = data.hash
    }
    if (data.oid) {
      patternObject.oid = data.oid
    }
    return RedisProvider.generateDataRedisKey(patternObject)
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

  /**
   * Get data with condition
   *
   * @param data
   *
   * @returns {Promise<unknown[]>}
   */
  async get(data) {
    const pattern = RedisProvider.generateDataRedisSearchPattern(data)
    const keys = await this.service.asyncKeys(pattern)
    const requests = keys.map((key) => {
      return this.service.get(key)
    })
    const items = await Promise.all(requests)
    const result = items.map((item) => {
      return JSON.parse(item)
    })
    return result
  }

  /**
   * Get Active Data Object By Id
   *
   * @param string id
   *
   * @returns {Promise<void>}
   */
  async getActiveDataObjectById(oid) {
    const dataList = await this.get({oid: oid})
    const data = dataList.filter((item) => item.isActive)
    return data[0]
  }
}

RedisProvider.PROVIDER_NAME = 'redis'

exports.RedisProvider = RedisProvider
