/**
 * Abstract class (interface for Data storage)
 */
class DataStoreProviderAbstract {
  constructor () {
    if (this.constructor === DataStoreProviderAbstract) {
      throw new Error('abstract class!')
    }
  }
}

/**
 * Abstract save method
 *
 * @param Object data
 */
DataStoreProviderAbstract.prototype.save = function (data) {
  throw new Error('Provider save method error')
}

/**
 * Abstract get method
 *
 * @param Object data
 */
DataStoreProviderAbstract.prototype.get = function (conditions) {
  throw new Error('Provider get method error')
}

/**
 * Abstract get active data object
 *
 * @param Object data
 */
DataStoreProviderAbstract.prototype.getActiveDataObject = function (id) {
  throw new Error('Provider get active data method error')
}

/**
 * Abstract get last version data object
 *
 * @param Object data
 */
DataStoreProviderAbstract.prototype.getLastVersionOfDataObject = function (oid, repository) {
  throw new Error('Provider get last version data method error')
}

/**
 * Abstract exist data object
 *
 * @param Object data
 */
DataStoreProviderAbstract.prototype.existDataObject = function (data) {
  throw new Error('Provider exist data method error')
}

/**
 * Abstract exist data object
 *
 * @param Object data
 */
DataStoreProviderAbstract.prototype.getDataObjectByVersion = function (oid, repository, version) {
  throw new Error('Provider getDataObjectByVersion data method error')
}

DataStoreProviderAbstract.prototype.deleteDataObjectById = function (oid, repository) {
  throw new Error('Provider deleteDataObjectById data method error')
}

exports.DataStoreProviderAbstract = DataStoreProviderAbstract
