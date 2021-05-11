const { CustomError } = require('./CustomError')
const { HttpStatusCode } = require('./HttpStatusCode')

const DEFAULT_CODE = 'UNAUTHORIZED_ERROR'
const DEFAULT_MESSAGE = 'Unauthorized error'

/**
 * extends CustomError
 */
class UnauthorizedError extends CustomError {
  /**
   * constructor
   * @param message
   * @param code
   * @param options
   */
  constructor (message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(HttpStatusCode.Unauthorized, code, message, options)
  }
}

exports.UnauthorizedError = UnauthorizedError
