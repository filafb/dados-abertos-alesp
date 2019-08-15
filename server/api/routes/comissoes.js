const express = require('express')
const router = express.Router()
const { Comissoes, ComissoesMembros } = require('../../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const listComissoes = await Comissoes.findAll({include: [ComissoesMembros]})
    res.json(listComissoes)
  } catch (err) {
    next(err)
  }
})
