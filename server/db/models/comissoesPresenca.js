const Sequelize = require('sequelize')
const db = require('../db')

const ComissoesPresenca = db.define('presença', {

}, {
  tableName: 'presenças'
})

module.exports = ComissoesPresenca
