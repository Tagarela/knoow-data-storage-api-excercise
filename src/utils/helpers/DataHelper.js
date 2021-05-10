const uuid = require('uuid')

/**
 *
 */
class DataHelper {
  /**
   * Generate Object id
   * @returns {*}
   */
  static generateObjectId() {
    return uuid()
  }
}

exports.DataHelper = DataHelper
