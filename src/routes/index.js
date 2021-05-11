const express = require('express')
require('express-async-errors')
const router = express.Router()
const { DataController } = require('../controllers/DataController')

router.route('/data/:repository')
  .put(DataController.uploadObject)

router.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

module.exports = router
