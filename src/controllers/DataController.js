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
   * Download Object endpoint
   *
   * @param Object req
   * @param Object res
   *
   * @returns {Promise<void>}
   */
  static async downloadObject(req, res) {
    const params = req.params
    const dataObject = await dataStore.getActiveDataObject(params.objectId)
    if (!dataObject) {
      throw new NotFoundError()
    }
    res.status(HttpStatusCode.OK).json(DataTransformer.formatDataResponseObject(dataObject))
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
    /*** Get Data Object ***/
    let dataObject = await dataStore.getDataObjectByVersion(params.objectId, params.repository, params.version)
    if (dataObject.length === 0) {
      throw new NotFoundError()
    }
    dataObject = dataObject[0]
    // get active version
    const activeDataObject = await dataStore.getActiveDataObject(params.objectId, params.repository)

    /*** disable active version ***/
    if (activeDataObject) {
      activeDataObject.isActive = 0
      dataStore.save(activeDataObject)
    }
    /*** enable active version ***/
    dataObject.isActive = 1
    dataStore.save(dataObject)
    return res.status(HttpStatusCode.OK).json(DataTransformer.formatDataResponseObject(dataObject))
  }

  /**
   * Delete object
   *
   * @param Object req
   * @param Object res
   */
  static async deleteObject(req, res) {
    const params = req.params
    await dataStore.deleteDataObjectById(params.objectId, params.repository)
    return res.status(204).end()
  }
}

exports.DataController = DataController