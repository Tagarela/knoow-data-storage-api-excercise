/**
 * Abstract class (interface for Data storage)
 */
class DataStoreProviderAbstract {
  constructor() {
    if (this.constructor === DataStoreProviderAbstract) {
      throw new Error("abstract class!")
    }
  }
}

DataStoreProviderAbstract.prototype.save = function() {
  throw new Error("Provider save method error")
}

exports.DataStoreProviderAbstract = DataStoreProviderAbstract
