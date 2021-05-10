require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV || 'local',
  port: process.env.PORT || 3001
}
