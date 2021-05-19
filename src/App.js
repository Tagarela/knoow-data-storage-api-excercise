const config = require('../src/config')
const express = require('express')
const router = require('./routes')
const cors = require('cors')
const { ErrorHandlerMiddlewareFactory } = require('./utils/middlewares/ErrorHandlerMiddlewareFactory')

/**
 *  App class
 */
class App {
  /**
   * Create new Application
   */
  static createApplication () {
    const application = express()
    application.use(cors())
    application.set('port', config.port)
    application.set('mode', config.env)
    application.use(express.json())
    application.use(router)
    application.use(ErrorHandlerMiddlewareFactory.errorHandler())
    return application
  }
}

exports.App = App
