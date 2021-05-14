const express = require('express')
require('express-async-errors')
const router = express.Router()
const { DataController } = require('../controllers/DataController')

router.route('/data/:repository')
  .put(DataController.uploadObject)

router.route('/data/:repository/:objectId')
  .put(DataController.publish)

router.route('/data/:repository/:objectId/:version')
  .put(DataController.revertObject)

router.route('/data/:repository/:objectId')
  .get(DataController.downloadObject)

router.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

module.exports = router
