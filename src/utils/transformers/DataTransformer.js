const { ObjectHelper } = require('../helpers')

/**
 * Data Object Transformer
 */
class DataTransformer {
  /**
   * Format Data Object Response Object
   *
   * @param data
   *
   * @returns {{}}
   */
  static formatDataResponseObject (data) {
    const response = {
      oid: data.oid,
      size:  ObjectHelper.getObjectSize(data.data),
      version: data.version,
      data: data.data
    }
    return response
  }
}

exports.DataTransformer = DataTransformer
