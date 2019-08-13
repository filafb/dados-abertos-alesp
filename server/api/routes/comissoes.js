const express = require('express')
const router = express.Router()
const { Comissoes } = require('../../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const listComissoes = await Comissoes.findAll()
    res.json(listComissoes)
  } catch (err) {
    next(err)
  }
})
