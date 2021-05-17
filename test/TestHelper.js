const { RedisService } = require('./../src/services/RedisService')
const { FixtureHelper } = require('./FixtureHelper')
const { redisClient } = require('./../src/utils/redis')

/**
 * Fixture Helper
 */
class TestHelper {
  /**
   * Set Up
   *
   * @returns {Promise<void>}
   */
  static async setUp (done) {
    // set mock redis prefix
    RedisService.REPO_TABLE_PREFIX = 'test'
    return done()
  }

  /**
   * Tear down
   *
   * @returns {Promise<void>}
   */
  static async tearDown (done) {
    await FixtureHelper.removeAllFixtures()
    return done()
  }

  /**
   * Tear all down
   *
   * @param Function done
   *
   * @returns {Promise<void>}
   */
  static async tearAllDown (done) {
    await TestHelper.tearDown(done)
    await redisClient.quit()
    return done()
  }
}

exports.TestHelper = TestHelper
