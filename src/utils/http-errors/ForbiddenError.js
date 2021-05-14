const { CustomError } = require('./CustomError')
const { HttpStatusCode } = require('./HttpStatusCode')

const DEFAULT_CODE = 'FORBIDDEN_ERROR'
const DEFAULT_MESSAGE = 'Forbidden error'

/**
 * extends CustomError
 */
class ForbiddenError extends CustomError {
  /**
   * @param code
   * @param message
   * @param options
   */
  constructor (message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(HttpStatusCode.Forbidden, code, message, options)
  }
}

exports.ForbiddenError = ForbiddenError
