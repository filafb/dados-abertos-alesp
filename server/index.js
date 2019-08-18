const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { db } = require('./db')
const app = express()
const PORT = process.env.PORT || 3000

const createApp = () => {
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))

  app.use(express.static(path.join(__dirname, '../public')))

  app.use('/api', require('./api'))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
  })

  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error')
  })

}

const startListening = () => {
  app.listen(PORT, () => console.log(`Shaking up on port ${PORT}`))
}

const syncDB = () => db.sync(
  //{force: true} // drop all tables every time server restart
  )

async function bootApp() {
  await syncDB()
  await createApp()
  await startListening()
}

if(require.main === module) {
  bootApp()
} else {
  createApp()
}

module.exports = app
