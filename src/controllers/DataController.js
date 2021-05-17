const { DataHelper, HttpHelper, ObjectHelper } = require('../utils/helpers')
const { DataTransformer } = require('../utils/transformers')
const { dataStore } = require('../components/data-store/DataStore')
/**
 * Data controller class
 */
class DataController {
  /**
   * Upload Object logic
   *
   * @param Object req
   * @param Object res
   *
   * @returns {Promise<*>}
   */
  static async uploadObject(req, res) {
    const body = HttpHelper.getBodyFromRequest(req)
    /*** Prepare data ***/
    const dataObject = DataHelper.generateDataObject(body)
    dataObject.repository = req.params.repository
    await dataStore.save(dataObject)
    return res.status(201).json(DataTransformer.formatDataResponseObject(dataObject))
  }

  /**
   *
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  static async downloadObject(req, res) {
    const params = req.params
    // const dataObject = await dataStore.get({oid: params.objectId})
    const dataObject = await dataStore.getActiveDataObjectById(params.objectId)
    res.status(200).json(dataObject)
  }
}

exports.DataController = DataController