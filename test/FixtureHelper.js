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
   * Load Fixture
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
      return data[0]
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Load All Fixtures
   *
   * @returns {Promise<[]>}
   */
  static async loadAllFixtures () {
    const data = await fs.readdirSync(FixtureHelper.fixturePath)
    const promises = []
    data.forEach((item) => {
      promises.push(FixtureHelper.loadFixture(item))
    })
    return Promise.all(promises)
  }
}

FixtureHelper.fixturePath = './test/fixtures'

exports.FixtureHelper = FixtureHelper
