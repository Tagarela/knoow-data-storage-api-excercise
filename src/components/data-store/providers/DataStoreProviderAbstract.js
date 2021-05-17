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

/**
 * Abstract save method
 *
 * @param Object data
 */
DataStoreProviderAbstract.prototype.save = function(data) {
  throw new Error("Provider save method error")
}

/**
 * Abstract get method
 *
 * @param Object data
 */
DataStoreProviderAbstract.prototype.get = function(conditions) {
  throw new Error("Provider get method error")
}

/**
 * Abstract get active data object
 *
 * @param Object data
 */
DataStoreProviderAbstract.prototype.getActiveDataObjectById = function(conditions) {
  throw new Error("Provider get active data method error")
}

exports.DataStoreProviderAbstract = DataStoreProviderAbstract
