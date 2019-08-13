const Sequelize = require( 'sequelize')
const db = require( '../db')

const Deputados = db.define('deputado', {
  IdDeputado: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    set(val) {
      this.setDataValue('IdDeputado', Number(val[0]))
    }
  },
  NomeParlamentar: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('NomeParlamentar', val[0])
    }
  },
  Aniversario: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Aniversario', val[0])
    }
  },
  Partido: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Partido', val[0])
    }
  },
  Situacao: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Situacao', val[0])
    }
  },
  Email: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Email', val[0])
    }
  },
  Sala: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Sala', val[0])
    }
  },
  Telefone: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Telefone', val[0])
    }
  },
  PlacaVeiculo: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('PlacaVeiculo', val[0])
    }
  },
  Biografia: {
    type: Sequelize.TEXT,
    set(val) {
      this.setDataValue('Biografia', val[0])
    }
  },
  HomePage: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('HomePage', val[0])
    }
  },
  Andar: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Andar', val[0])
    }
  },
  Fax: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Fax', val[0])
    }
  },
  Matricula: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Matricula', val[0])
    }
  },
  IdSPL: {
    type: Sequelize.INTEGER,
    set(val) {
      this.setDataValue('IdSPL', Number(val[0]))
    }
  },
  IdUA: {
    type: Sequelize.INTEGER,
    set(val) {
      this.setDataValue('IdUA', Number(val[0]))
    }
  },
  PathFoto: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('PathFoto', val[0])
    }
  }
})

module.exports = Deputados
