const { RedisProvider } = require('./providers')

/**
 * Data Store Provider Factory
 */
class ProviderFactory {
  /**
   * Create provider
   *
   * @param { String } providerName
   *
   * @returns {RedisProvider}
   */
  static create(providerName) {
    let provider = {}
    switch (providerName){
      case RedisProvider.PROVIDER_NAME:
        provider = new RedisProvider()
        break
      default:
        throw Error('provider does not exist')
    }
    return provider
  }
}

exports.ProviderFactory = ProviderFactory
