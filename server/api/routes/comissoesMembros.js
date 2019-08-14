const express = require('express')
const router = express.Router()
const { ComissoesMembros } = require('../../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const listComissoesMembros = await ComissoesMembros.findAll()
    res.json(listComissoesMembros)
  } catch (err) {
    next(err)
  }
})
