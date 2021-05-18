const uuid = require('uuid')
const { ObjectHelper } = require('./ObjectHelper')
const { NotFoundError, InternalServerError } = require('./../http-errors')
const { dataStore } = require('../../components/data-store/DataStore')

/**
 * Data Helper
 *
 * Helper for working with data model
 */
class DataHelper {
  /**
   * Generate Data object id
   *
   * @returns string
   */
  static generateObjectId () {
    return uuid()
  }

  /**
   * Generate data object
   *
   * @param Object data
   * @param string oid
   *
   * @returns {{data: *, oid: string, isActive: number, version: number, hash: string}}
   */
  static generateDataObject (data, oid = undefined) {
    // generate object id
    if (!oid) {
      oid = DataHelper.generateObjectId()
    }
    const dataObject = {
      oid: oid,
      hash: ObjectHelper.generateObjectHash(data),
      data: data,
      version: 1, // version
      isActive: DataHelper.ACTIVE // set active 1 by default
    }
    if (dataObject.data.repository) {
      dataObject.repository = data.repository
      delete dataObject.data.repository
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
  static async publishNewDataObjectVersion (dataObject) {
    // get last version of object
    const lastDataObject = await dataStore.getLastVersionOfDataObject(dataObject.oid, dataObject.repository)
    if (!lastDataObject) {
      throw new NotFoundError('Object does not exist. Create it first')
    }
    try {
      dataObject.version = lastDataObject.version + 1
      // disable old version
      const activeDataObject = await dataStore.getActiveDataObject(dataObject.oid, dataObject.repository)
      if (activeDataObject) {
        activeDataObject.isActive = DataHelper.NOT_ACTIVE
        await dataStore.save(activeDataObject)
      }
      // save new version
      return dataStore.save(dataObject)
    } catch (e) {
      throw new InternalServerError(e.message)
    }
  }
}

DataHelper.ACTIVE = 1
DataHelper.NOT_ACTIVE = 0

exports.DataHelper = DataHelper
