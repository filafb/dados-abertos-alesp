const Sequelize = require('sequelize')
const db = require('../db')

const Comissoes = db.define('comissao', {
  DataFimComissao: {
    type: Sequelize.DATE,
    set(val) {
      this.setDataValue('DataFimComissao', val[0])
    }
  },
  IdComissao: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    set (val) {
      this.setDataValue('IdComissao', Number(val[0]))
    }
  },
  NomeComissao: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('NomeComissao', val[0])
    }
  },
  SiglaComissao: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('SiglaComissao', val[0])
    }
  },
  DescricaoComissao: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('DescricaoComissao', val[0])
    }
  }
})


module.exports = Comissoes

