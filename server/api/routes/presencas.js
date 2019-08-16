const express = require('express')
const router = express.Router()
const { ComissoesPresenca } = require('../../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const listPresenca = await ComissoesPresenca.findAll()
    res.json(listPresenca)
  } catch(err) {
    next(err)
  }
})
