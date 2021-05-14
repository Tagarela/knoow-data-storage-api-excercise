const { CustomError } = require('./CustomError')
const { HttpStatusCode } = require('./HttpStatusCode')

const DEFAULT_CODE = 'NOT_FOUND_ERROR'
const DEFAULT_MESSAGE = 'Entity not found'

/**
 * extends CustomError
 */
class NotFoundError extends CustomError {
  /**
   * @param code
   * @param message
   * @param options
   */
  constructor (message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(HttpStatusCode.NotFound, code, message, options)
  }
}

exports.NotFoundError = NotFoundError
