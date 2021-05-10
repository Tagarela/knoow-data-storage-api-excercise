const { HttpHelper } = require('../utils/helpers')
const { DataTransformer } = require('../utils/transformers')
/**
 * Data controller class
 */
class DataController {
  static async uploadObject(req, res) {
    const body = HttpHelper.getBodyFromRequest(req)
    return res.status(201).json(DataTransformer.formatDataResponseObject(body))
  }
}

exports.DataController = DataController