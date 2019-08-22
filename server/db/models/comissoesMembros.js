const Sequelize = require('sequelize')
const db = require('../db')

const ComissoesMembros = db.define('comissoes-membro', {
  DataInicio: {
    type: Sequelize.DATE,
    set(val) {
      this.setDataValue('DataInicio', Array.isArray(val) ? val[0] : val)
    }
  },
  IdPapel: {
    type: Sequelize.INTEGER,
    set(val) {
      this.setDataValue('IdPapel', Array.isArray(val) ? Number(val[0]) : Number(val))
    }
  },
  Papel: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Papel', Array.isArray(val) ? val[0] : val)
    }
  },
  Efetivo: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Efetivo', Array.isArray(val) ? val[0] : val)
    }
  },
  DataFim: {
    type: Sequelize.DATE,
    set(val) {
      this.setDataValue('DataFim', Array.isArray(val) ? val[0] : val)
    }
  }
})

module.exports = ComissoesMembros
