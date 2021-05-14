const { DataStoreProviderAbstract } = require('./DataStoreProviderAbstract')
const { RedisService } = require('../../../services/RedisService')
const { UnprocessableError } = require('../../../utils/http-errors')

/**
 * Redis Provider
 */
class RedisProvider extends DataStoreProviderAbstract {
  /**
   * constructor
   */
  constructor() {
    super();
    this.service = new RedisService()
  }

  /**
   * Check object exist
   *
   * @param Object dataObject
   *
   * @returns {Promise<boolean>}
   */
  async existDataObject(dataObject) {
    const data = await this.get(dataObject)
    return data.length !== 0 ? true : false
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
   * Get data with condition
   *
   * @param data
   *
   * @returns {Promise<[Object]>}
   */
  async get(condition) {
    const pattern = RedisProvider.generateDataRedisSearchPattern(condition)
    const keys = await this.service.asyncKeys(pattern)
    const requests = keys.map((key) => {
      return this.service.get(key)
    })
    const items = await Promise.all(requests)
    const result = items.map((item) => JSON.parse(item))
    return result
  }

  /**
   * Get Active Data Object By Id
   *
   * @param string id
   *
   * @returns {Promise<void>}
   */
  async getActiveDataObject(oid) {
    const dataList = await this.get({oid})
    const data = dataList.filter((item) => item.isActive)
    return data[0]
  }

  /**
   * Get Last Version Of Data Object By Id
   *
   * @returns {Promise<Object>}
   */
  async getLastVersionOfDataObject(oid, repository) {
    let dataObject = null
    const condition = {
      oid: oid,
      repository: repository
    }
    const objectList = await this.get(condition)
    if (objectList.length !== 0) {
      dataObject = objectList.reduce((previousItem, currentItem) => {
        return (previousItem.version > currentItem.version ? previousItem : currentItem);
      })
    }
    return dataObject
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
   * Get Data Object By Version
   *
   * @param string oid
   * @param string repository
   * @param string version
   *
   * @returns {Promise<*|Object>}
   */
  async getDataObjectByVersion(oid, repository, version) {
    const dataObjectList = await this.get({oid: oid, repository:repository})
    const dataObject =  dataObjectList.filter((item) => item.version.toString() === version.toString())
    if (dataObject.length > 1) {
      throw new Error('something went wrong')
    }
    return dataObject
  }
}

RedisProvider.PROVIDER_NAME = 'redis'

exports.RedisProvider = RedisProvider
