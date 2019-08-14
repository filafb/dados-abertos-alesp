const express = require('express')
const router = express.Router()
const { Deputados, ComissoesMembros } = require('../../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const listDeputados = await Deputados.findAll({include: [ComissoesMembros]})
    res.json(listDeputados)
  } catch (err) {
    next(err)
  }
})
