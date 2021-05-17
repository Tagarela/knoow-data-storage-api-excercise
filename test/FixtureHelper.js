const fs = require('fs')
const { redisClient } = require('../src/utils/redis')

/**
 * Fixture Helper
 */
class FixtureHelper {
  /**
   * Get Fixture Data
   *
   * @param file
   *
   * @returns {Promise<any>}
   */
  static getFixtureData (file) {
    const filePath = FixtureHelper.fixturePath + '/' + file
    const fileData = fs.readFileSync(filePath).toString()
    const data = JSON.parse(fileData)
    return data
  }

  /**
   * load Fixture
   *
   * @param string file
   *
   * @returns {Promise<void>}
   */
  static async loadFixture (file) {
    const data = FixtureHelper.getFixtureData(file)
    const promises = []
    data.forEach((item) => {
      promises.push(redisClient.asyncSet(item.key, JSON.stringify(item.value)))
    })
    try {
      await Promise.all(promises)
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * load All Fixtures
   *
   * @returns {Promise<void>}
   */
  static async loadAllFixtures () {
    const data = await fs.readdirSync(FixtureHelper.fixturePath)
    const promises = []
    data.forEach((item) => {
      promises.push(FixtureHelper.loadFixture(item))
    })

    await Promise.all(promises)
  }

  /**
   * Remove All test Fixtures
   *
   * @returns {Promise<void>}
   */
  static async removeAllFixtures () {
    const keys = await redisClient.asyncKeys('test::*::*::*')
    const promises = []
    keys.forEach((item) => {
      promises.push(redisClient.asyncDel(item))
    })
    await Promise.all(promises)
  }

  /**
   * Check is record exist
   *
   * @param key
   */
  static async isRecordExist (key) {
    return redisClient.asyncExists(key)
  }

  /**
   * Get data
   *
   * @param string key
   *
   * @returns {Promise<any>}
   */
  static async getData (key) {
    const data = await redisClient.asyncGet(key)
    return JSON.parse(data)
  }
}

FixtureHelper.fixturePath = './fixtures'

exports.FixtureHelper = FixtureHelper
