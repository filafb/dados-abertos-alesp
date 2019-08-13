const express = require('express')
const router = express.Router()
const { Deputados } = require('../../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const listDeputados = await Deputados.findAll()
    res.json(listDeputados)
  } catch (err) {
    next(err)
  }
})
