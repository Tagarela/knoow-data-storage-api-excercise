const { CustomError } = require('./CustomError')
const { HttpStatusCode } = require('./HttpStatusCode')

const DEFAULT_CODE = 'BAD_REQUEST_ERROR'
const DEFAULT_MESSAGE = 'Bad request error'

/**
 * extends CustomError
 */
class BadRequestError extends CustomError {
  /**
   * @param code
   * @param message
   * @param options
   */
  constructor (message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(HttpStatusCode.BadRequest, code, message, options)
  }
}

exports.BadRequestError = BadRequestError
