require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV || 'local',
  port: process.env.PORT || 3001,
  dataStorage: process.env.DATA_STORAGE_SYSTEM
}
