const Sequelize = require('sequelize')
const db = require('../db')

const ComissoesReunioes = db.define('reunião', {
  IdReuniao: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    set(val) {
      this.setDataValue('IdReuniao', Array.isArray(val) ? Number(val[0]) : Number(val))
    },
  },
  IdPauta: {
    type: Sequelize.INTEGER,
    set(val) {
      this.setDataValue('IdPauta', Array.isArray(val) ? Number(val[0]) : Number(val))
    }
  },
  NrLegislatura: {
    type: Sequelize.INTEGER,
    set(val) {
      this.setDataValue('NrLegislatura', Array.isArray(val) ? Number(val[0]) : Number(val))
    }
  },
  NrConvocacao: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('NrConvocacao', Array.isArray(val) ? val[0] : val)
    }
  },
  TipoConvocacao: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('TipoConvocacao', Array.isArray(val) ? val[0] : val)
    }
  },
  Data: {
    type: Sequelize.DATE,
    set(val) {
      this.setDataValue('Data', Array.isArray(val) ? val[0] : val)
    }
  },
  CodSituacao: {
    type: Sequelize.STRING,
    set(val){
      this.setDataValue('CodSituacao', Array.isArray(val) ? val[0] : val)
    }
  },
  Situacao: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Situacao', Array.isArray(val) ? val[0] : val)
    }
  },
  Presidente: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Presidente', Array.isArray(val) ? val[0] : val)
    }
  }
},{
  tableName: 'reuniões'
})

ComissoesReunioes.Realizadas = function () {
  return ComissoesReunioes.findAll({where: {Situacao: 'REALIZADA'}})
}


module.exports = ComissoesReunioes
