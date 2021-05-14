const { BadRequestError } = require('./BadRequestError')
const { CustomError } = require('./CustomError')
const { ConflictError } = require('./ConflictError')
const { ForbiddenError } = require('./ForbiddenError')
const { GatewayTimeOutError } = require('./GatewayTimeOutError')
const { InternalServerError } = require('./InternalServerError')
const { NotFoundError } = require('./NotFoundError')
const { UnauthorizedError } = require('./UnauthorizedError')
const { UnprocessableError } = require('./UnprocessableError')

module.exports = {
  ConflictError: ConflictError,
  BadRequestError: BadRequestError,
  CustomError: CustomError,
  ForbiddenError: ForbiddenError,
  GatewayTimeOutError: GatewayTimeOutError,
  InternalServerError: InternalServerError,
  NotFoundError: NotFoundError,
  UnauthorizedError: UnauthorizedError,
  UnprocessableError: UnprocessableError
}
