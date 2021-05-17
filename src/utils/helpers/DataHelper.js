const uuid = require('uuid')
const { ObjectHelper } = require('./ObjectHelper')
const { NotFoundError, InternalServerError } = require('./../http-errors')
const { dataStore } = require('../../components/data-store/DataStore')

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
  static generateDataObject (data, oid = undefined) {
    if (!oid) {
      oid = DataHelper.generateObjectId()
    }
    const dataObject = {
      oid: oid,
      hash: ObjectHelper.generateObjectHash(data),
      data: data,
      version: 1,
      isActive: 1
    }
    return dataObject
  }

  /**
   * Publish new object version
   *
   * @param Object dataObject
   *
   * @returns {Promise<void>}
   */
  static async publishNewDataObjectVersion(dataObject) {
    /*** get last version of object ***/
    const lastDataObject = await dataStore.getLastVersionOfDataObject(dataObject.oid, dataObject.repository)
    if (!lastDataObject) {
      throw new NotFoundError('Object does not exist. Create it first')
    }
    try {
      dataObject.version = lastDataObject.version + 1
      /*** disable old version ***/
      const activeDataObject = await dataStore.getActiveDataObject(dataObject.oid, dataObject.repository)
      if(activeDataObject) {
        activeDataObject.isActive = 0
        await dataStore.save(activeDataObject)
      }
      /*** save new version ***/
      await dataStore.save(dataObject)
    } catch (e) {
      throw new InternalServerError(e.message)
    }
  }
}

exports.DataHelper = DataHelper
