const { CustomError, InternalServerError } = require('../http-errors')
const config = require('../../config')

/**
 * Error Handler Middleware Factory
 */
class ErrorHandlerMiddlewareFactory {
  /**
   * Create error handler middleware
   *
   * @returns {function(*=, *, *, *): (*|undefined)}
   */
  static errorHandler () {
    return (err, req, res, next) => {
      // next if not error
      if (!err) {
        return next()
      }

      // create custom error on unknown Error
      if (!(err instanceof CustomError)) {
        err = new InternalServerError(err.message)
      }

      // get http status code
      const httpStatusCode = err.httpStatusCode
      const error = {
        code: err.code,
        message: err.message,
        context: err.options && err.options.context
      }

      if (config.env !== 'prod') {
        error.stacktrace = err.stack && err.stack.split('\n')
      }

      res
        .status(httpStatusCode)
        .json({
          error
        })
        .end()
    }
  }
}

exports.ErrorHandlerMiddlewareFactory = ErrorHandlerMiddlewareFactory
