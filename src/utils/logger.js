/**
 * Logger
 */
class Logger {
  constructor (level = 'TRACE') {
    this.levelsMapping = {
      TRACE: 0,
      DEBUG: 1,
      INFO: 2,
      WARNING: 3,
      ERROR: 4
    }
    this.level = this.levelsMapping[level]
  }

  async base (level, message, data) {
    if (this.levelsMapping[level] >= this.level) {
      if (data !== null) console.log(`[${level}] ${message}`, data)
      else console.log(`[${level}] ${message}`)
    }
  }

  async trace (message, data = null) { this.base('TRACE', message, data) }
  async debug (message, data = null) { this.base('DEBUG', message, data) }
  async info (message, data = null) { this.base('INFO', message, data) }
  async warning (message, data = null) { this.base('WARNING', message, data) }
  async error (message, data = null) { this.base('ERROR', message, data) }

  async setLevel (level) { this.level = this.levelsMapping[level] }
}
const logger = new Logger(process.env.LOG_LEVEL)

exports.logger = logger
exports.setLevel = logger.setLevel
