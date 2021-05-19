const { CustomError } = require('./CustomError')
const { HttpStatusCode } = require('./HttpStatusCode')

const DEFAULT_CODE = 'GATEWAY_TIMEOUT_ERROR'
const DEFAULT_MESSAGE = 'Gateway timeout error'

/**
 * extends CustomError
 */
class GatewayTimeOutError extends CustomError {
  /**
   * constructor
   *
   * @param integer code
   * @param string message
   * @param Object options
   */
  constructor (message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(HttpStatusCode.GatewayTimeOut, code, message, options)
  }
}

exports.GatewayTimeOutError = GatewayTimeOutError
