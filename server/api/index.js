const express = require('express')
const router = express.Router()

module.exports = router

router.use('/upload', require('./routes/upload'))
router.use('/comissoes', require('./routes/comissoes'))


router.use((req, res, next) => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
})
