const express = require('express')
const config = require('../src/config')
const router = require('./routes')

/**
 *  App class
 */
class App {
  /**
   * Create new Application
   */
  static createApplication () {
    const application = express()
    application.set('port', config.port)
    application.use(router)
    return application
  }
}

exports.App = App
