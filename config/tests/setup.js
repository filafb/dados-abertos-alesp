require('@babel/polyfill')
const { db } = require('../../server/db')

module.exports = async () => {
  await db.sync({force: true})
  global.__DB__ = db
}
