const crypto = require('crypto')

/**
 * Object Helper
 * Helper for working with objects
 */
class ObjectHelper {
  /**
   * Get all object properties
   *
   * @param { Object } obj
   *
   * @returns [String]
   */
  static getObjectProperties(obj) {
    const stringProperties = []
    for (let prop in obj) {
      stringProperties.push(prop)
    }
    if (Object.getOwnPropertySymbols) {
      const symbolProperties = Object.getOwnPropertySymbols(obj)
      Array.prototype.push.apply(stringProperties, symbolProperties)
    }
    return stringProperties
  }

  /**
   * Calculate Object size
   *
   * @param seen
   * @param { Object } object
   *
   * @returns { number }
   */
  static sizeOfObject (seen, object) {
    if (object == null) {
      return 0
    }
    let bytes = 0
    const properties = ObjectHelper.getObjectProperties(object)
    for (let i = 0; i < properties.length; i++) {
      const key = properties[i]
      // Do not recalculate circular references
      if (typeof object[key] === 'object' && object[key] !== null) {
        if (seen.has(object[key])) {
          continue
        }
        seen.add(object[key])
      }

      bytes += ObjectHelper.getCalculator(seen)(key)
      try {
        bytes += ObjectHelper.getCalculator(seen)(object[key])
      } catch (ex) {
        if (ex instanceof RangeError) {
          // return 0 - as an error
          bytes = 0
        }
      }
    }

    return bytes
  }

  /**
   * Get function for calculating size
   *
   * @param { Object } seen
   *
   * @returns {function(*=): (*)}
   */
  static getCalculator (seen) {
    return function calculator(object) {
      if (Buffer.isBuffer(object)) {
        return object.length
      }
      const objectType = typeof (object)
      switch (objectType) {
        case 'string':
          return object.length * ObjectHelper.STRING
        case 'boolean':
          return ObjectHelper.BOOLEAN
        case 'number':
          return ObjectHelper.NUMBER
        case 'symbol':
          const isGlobalSymbol = Symbol.keyFor && Symbol.keyFor(object)
          return isGlobalSymbol ? Symbol.keyFor(object).length * ObjectHelper.STRING : (object.toString().length - 8) * ObjectHelper.STRING
        case 'object':
          if (Array.isArray(object)) {
            return object.map(ObjectHelper.getCalculator(seen)).reduce((acc, curr) => {
              return acc + curr
            }, 0)
          } else {
            return ObjectHelper.sizeOfObject(seen, object)
          }
        default:
          return 0
      }
    }
  }

  /**
   * Get Object size
   *
   * @param { Object } object
   *
   * @returns {*}
   */
  static getObjectSize (object) {
    return ObjectHelper.getCalculator(new WeakSet())(object)
  }

  /**
   * Sort Object
   *
   * @param obj
   *
   * @returns { Object }
   */
  static sortObject(object){
    const sortedObj = {}, keys = Object.keys(object)
    keys.sort((key1, key2) => {
      key1 = key1.toLowerCase(), key2 = key2.toLowerCase()
      if(key1 < key2) return -1
      if(key1 > key2) return 1
      return 0;
    });

    for(let index in keys){
      const key = keys[index]
      if(typeof object[key] == 'object' && !(object[key] instanceof Array)){
        sortedObj[key] = ObjectHelper.sortObject(object[key])
      } else {
        sortedObj[key] = object[key]
      }
    }

    return sortedObj;
  }

  /**
   * Hash Objject
   * @param obj
   * @returns {string}
   */
  static generateObjectHash (obj) {
    const sortObj = ObjectHelper.sortObject(obj)
    return crypto.createHash('sha256').update(JSON.stringify(sortObj)).digest('hex')
  }
}

ObjectHelper.STRING = 2
ObjectHelper.BOOLEAN = 4
ObjectHelper.NUMBER = 8

exports.ObjectHelper = ObjectHelper
