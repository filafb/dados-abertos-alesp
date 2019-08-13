const express = require('express')
const router = express.Router()
const multer = require("multer")
const upload = multer()
const { fork } = require('child_process')
const path = require('path')
const fs = require('fs')
const appDirectory = fs.realpathSync(process.cwd())
const xmlParserFolder = 'xmlParser'

module.exports = router

router.use(upload.single('file'))

router.post('/comissoes', (req, res, next) => {
  const parserComissoes = fork(path.join(appDirectory, xmlParserFolder, 'comissoes.js'))
  parserComissoes.send({file: req.file.buffer.toString()})
  parserComissoes.on('message', ({created, error}) => {
    parserComissoes.kill()
    if(error) {
      error.message = 'Could not update db'
      next(error)
    } else {
      res.status(201).json({created})
    }
  })
})

router.post('/deputados', (req, res, next) => {
  const parserDeputados = fork(path.join(appDirectory, xmlParserFolder, 'deputados.js'))
  parserDeputados.send({file: req.file.buffer.toString()})
  parserDeputados.on('message', ({created, error}) => {
    parserDeputados.kill()
    if(error) {
      error.message = 'Could not update db'
      next(error)
    } else {
      res.status(201).json({created})
    }
  })
})

