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
}

// init data storage
const provider = ProviderFactory.create(config.dataStorage)
const dataStore = new DataStore(provider)

exports.dataStore = dataStore
