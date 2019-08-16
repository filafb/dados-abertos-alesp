const express = require('express')
const router = express.Router()
const { ComissoesReunioes } = require('../../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const listReunioes = await ComissoesReunioes.findAll()
    res.json(listReunioes)
  } catch(err) {
    next(err)
  }
})

router.use('/presencas', require('./presencas'))
