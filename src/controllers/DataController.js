const { DataHelper, HttpHelper, ObjectHelper } = require('../utils/helpers')
const { DataTransformer } = require('../utils/transformers')
const { dataStore } = require('../components/data-store/DataStore')
/**
 * Data controller class
 */
class DataController {
  static async uploadObject(req, res) {
    const body = HttpHelper.getBodyFromRequest(req)
    /*** Prepare data ***/
    const dataObject = DataHelper.generateDataObject(body)
    await dataStore.save(dataObject)
    return res.status(201).json(DataTransformer.formatDataResponseObject(dataObject))
  }
}

exports.DataController = DataController