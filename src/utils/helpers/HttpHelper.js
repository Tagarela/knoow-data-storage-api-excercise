/**
 * HttpResponse
 */
class HttpHelper {
  /**
   * Get Body from format
   *
   * @param event
   *
   * @returns {any}
   */
  static getBodyFromRequest(req) {
    return req.body
  }
  /**
   * Get POST/GET request params
   *
   * @param req
   *
   * @returns {*|{}}
   */
  static getAllParamsFromRequest(req) {
    let params = {}
    params = Object.assign(params, req.body)
    params = Object.assign(params, req.params)
    params = Object.assign(params, req.query)

    return params
  }
}

exports.HttpHelper = HttpHelper
