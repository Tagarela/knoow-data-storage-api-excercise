class CustomError extends Error {
  constructor (httpStatusCode, code = 500, message = 'Internal Error') {
    super()
    this.httpStatusCode = httpStatusCode
    this.message = message
  }
}

exports.CustomError = CustomError
