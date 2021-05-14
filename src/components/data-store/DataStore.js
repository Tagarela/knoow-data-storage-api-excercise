const { DataStoreProviderAbstract } = require('./providers/DataStoreProviderAbstract')
const { ProviderFactory } = require('./ProviderFactory')
const config = require('../../config')

/**
 * Data Storage
 */
class DataStore {
  /**
   * constructor
   *
   * @param provider
   */
  constructor(provider) {
    if(!provider instanceof DataStoreProviderAbstract) {
      throw new Error('Incorrect Provider')
    }
    this.provider = provider
  }

  /**
   * Save data object
   *
   * @param Object obj
   *
   * @returns {Promise<*|SaveStatus|void>}
   */
  async save(obj) {
    return this.provider.save(obj)
  }

  /**
   * Get data by condition
   *
   * @param conditions
   *
   * @returns {Promise<*>}
   */
  async get(conditions) {
    return this.provider.get(conditions)
  }

  /**
   * Get active data Object by id
   *
   * @param string id
   *
   * @returns {Promise<*|void>}
   */
  async getActiveDataObject(id, repository) {
    return this.provider.getActiveDataObject(id, repository)
  }

  /**
   * Get Last Version Of Data Object By Id
   *
   * Different providers might have different logic
   *
   * @param Object data
   *
   * @returns {Promise<void>}
   */
  async getLastVersionOfDataObject(oid, repository) {
    return this.provider.getLastVersionOfDataObject(oid, repository)
  }

  /**
   * Check is object exist
   *
   * @param Object condition
   *
   * @returns {Promise<*>}
   */
  async existDataObject(dataObject) {
    return this.provider.existDataObject(dataObject)
  }
}

// init data storage
const provider = ProviderFactory.create(config.dataStorage)
const dataStore = new DataStore(provider)

exports.dataStore = dataStore
