require('@babel/polyfill')
const { db } = require('../../server/db')

module.exports = () => {
  global.__DB__ = db
}
