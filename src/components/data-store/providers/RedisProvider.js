const { DataStoreProviderAbstract } = require('./DataStoreProviderAbstract')
class RedisProvider extends DataStoreProviderAbstract {
  constructor() {
    super();
  }

  async save(data) {
    console.log(data)
  }
}

RedisProvider.PROVIDER_NAME = 'redis'

exports.RedisProvider = RedisProvider
