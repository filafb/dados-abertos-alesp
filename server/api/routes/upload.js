const express = require('express')
const router = express.Router()
const multer = require("multer")
const upload = multer()
const { fork } = require('child_process')
const path = require('path')
const fs = require('fs')
const appDirectory = fs.realpathSync(process.cwd())

module.exports = router

router.post('/comissoes', upload.single('file'), (req, res, next) => {
  const parserComissoes = fork(path.join(appDirectory, 'xmlParser', 'comissoes.js'))
  parserComissoes.send({file: req.file.buffer.toString()})
  parserComissoes.on('message', ({parsedXML, e}) => {
    parserComissoes.kill()
    res.json(parsedXML || e)
  })
})


