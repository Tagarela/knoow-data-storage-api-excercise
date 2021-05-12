const uuid = require('uuid')
const { ObjectHelper } = require('./ObjectHelper')
/**
 * Data Helper
 * Helper for working with data model
 */
class DataHelper {
  /**
   * Generate Data object id
   *
   * @returns {*}
   */
  static generateObjectId() {
    return uuid()
  }

  /**
   * Generate data object
   *
   * @param Object data
   */
  static generateDataObject (data) {
    const dataObject = {
      oid: DataHelper.generateObjectId(),
      hash: ObjectHelper.generateObjectHash(data),
      data: data,
      version: 'v1'
    }
    return dataObject
  }
}

exports.DataHelper = DataHelper
