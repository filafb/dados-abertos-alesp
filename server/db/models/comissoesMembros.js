const Sequelize = require('sequelize')
const db = require('../db')

const ComissoesMembros = db.define('comissoes-membro', {
  DataInicio: {
    type: Sequelize.DATE,
    set(val) {
      this.setDataValue('DataInicio', val[0])
    }
  },
  IdPapel: {
    type: Sequelize.INTEGER,
    set(val) {
      this.setDataValue('IdPapel', Number(val[0]))
    }
  },
  Papel: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Papel', val[0])
    }
  },
  Efetivo: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Efetivo', val[0])
    }
  },
  DataFim: {
    type: Sequelize.DATE,
    set(val) {
      this.setDataValue('DataFim', val[0])
    }
  }
})

module.exports = ComissoesMembros
