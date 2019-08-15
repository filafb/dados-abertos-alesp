const Sequelize = require('sequelize')
const db = require('../db')

const ComissoesReunioes = db.define('reunião', {
  IdReuniao: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    set(val) {
      this.setDataValue('IdReuniao', Number(val[0]))
    },
  },
  IdPauta: {
    type: Sequelize.INTEGER,
    set(val) {
      this.setDataValue('IdPauta', Number(val[0]))
    }
  },
  NrLegislatura: {
    type: Sequelize.INTEGER,
    set(val) {
      this.setDataValue('NrLegislatura', Number(val[0]))
    }
  },
  NrConvocacao: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('NrConvocacao', val[0])
    }
  },
  TipoConvocacao: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('TipoConvocacao', val[0])
    }
  },
  Data: {
    type: Sequelize.DATE,
    set(val) {
      this.setDataValue('Data', val[0])
    }
  },
  CodSituacao: {
    type: Sequelize.STRING,
    set(val){
      this.setDataValue('CodSituacao', val[0])
    }
  },
  Situacao: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Situacao', val[0])
    }
  },
  Presidente: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Presidente', val[0])
    }
  }
},{
  tableName: 'reuniões'
})


module.exports = ComissoesReunioes
