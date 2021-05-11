const { CustomError } = require('./CustomError')
const { HttpStatusCode } = require('./HttpStatusCode')

const DEFAULT_CODE = 'UNPROCESSABLE_ERROR'
const DEFAULT_MESSAGE = 'Unprocessable entity error'

/**
 * extends CustomError
 */
class UnprocessableError extends CustomError {
  /**
   * constructor
   *
   * @param code
   * @param message
   * @param options
   */
  constructor (message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(HttpStatusCode.Unprocessable, code, message, options)
  }
}

exports.UnprocessableError = UnprocessableError
