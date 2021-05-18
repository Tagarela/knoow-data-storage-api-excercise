const { redisClient } = require('../src/utils/redis')

/**
 * Fixture Helper
 */
class FixtureHelper {
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
}

FixtureHelper.fixturePath = './fixtures'

exports.FixtureHelper = FixtureHelper
