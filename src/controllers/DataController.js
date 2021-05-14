const { DataHelper, HttpHelper } = require('../utils/helpers')
const { DataTransformer } = require('../utils/transformers')
const { dataStore } = require('../components/data-store/DataStore')
const { ConflictError, HttpStatusCode, NotFoundError } = require('../utils/http-errors')
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
    const body = req.body
    const params = req.params
    /*** Prepare data ***/
    const dataObject = DataHelper.generateDataObject(body)
    dataObject.repository = params.repository
    const dataObjectExist = await dataStore.get({ hash: dataObject.hash, repository: dataObject.repository })
    if (dataObjectExist.length > 0) {
      throw new ConflictError(`Such object in this repo already exist. oid: ${dataObjectExist[0].oid}, version: ${dataObjectExist[0].version}`)
    }
    await dataStore.save(dataObject)
    return res.status(HttpStatusCode.Created).json(DataTransformer.formatDataResponseObject(dataObject))
  }

  /**
   * download Object endpoint
   * @param Object req
   * @param Object res
   * @returns {Promise<void>}
   */
  static async downloadObject(req, res) {
    const params = req.params
    const dataObject = await dataStore.getActiveDataObjectById(params.objectId)
    res.status(200).json(dataObject)
  }

  /**
   * Publish new version of object
   *
   * @param Object req
   * @param Object res
   *
   * @returns {Promise<void>}
   */
  static async publish(req, res) {
    const params = req.params
    const body = req.body
    /*** check duplicates ***/
    const dataObject = DataHelper.generateDataObject(body, params.objectId)
    dataObject.repository = params.repository
    const dataObjectExist = await dataStore.get({ hash: dataObject.hash, repository: dataObject.repository })
    if (dataObjectExist.length > 0) {
      throw new ConflictError(`Such object in this repo already exist. oid: ${dataObjectExist[0].oid}, version: ${dataObjectExist[0].version}`)
    }
    await DataHelper.publishNewDataObjectVersion(dataObject)
    return res.status(HttpStatusCode.OK).json(DataTransformer.formatDataResponseObject(dataObject))
  }

  /**
   * Revert Object endpoint
   *
   * @param Object req
   * @param Object res
   *
   * @returns {Promise<void>}
   */
  static async revertObject(req, res) {
    const params = req.params
    console.log(params)
    res.end()
  }
}

exports.DataController = DataController