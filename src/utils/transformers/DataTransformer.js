const { DataHelper, ObjectHelper } = require('../helpers')

/**
 * Bookmark Transformer
 */
class DataTransformer {
  /**
   * Format Bookmark Response Object
   * @param data
   * @returns {{}}
   */
  static formatDataResponseObject (data) {
    const response = {
      size: ObjectHelper.getObjectSize(data),
      data: data
    }
    return response
  }
}

exports.DataTransformer = DataTransformer
