const Sequelize = require( 'sequelize')
const db = require( '../db')

const Deputados = db.define('deputado', {
  IdDeputado: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    set(val) {
      this.setDataValue('IdDeputado', Array.isArray(val) ? Number(val[0]) : Number(val))
    }
  },
  NomeParlamentar: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('NomeParlamentar', Array.isArray(val) ? val[0] : val)
    }
  },
  Aniversario: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Aniversario', Array.isArray(val) ? val[0] : val)
    }
  },
  Partido: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Partido', Array.isArray(val) ? val[0] : val)
    }
  },
  Situacao: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Situacao', Array.isArray(val) ? val[0] : val)
    }
  },
  Email: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Email', Array.isArray(val) ? val[0] : val)
    }
  },
  Sala: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Sala', Array.isArray(val) ? val[0] : val)
    }
  },
  Telefone: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Telefone', Array.isArray(val) ? val[0] : val)
    }
  },
  PlacaVeiculo: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('PlacaVeiculo', Array.isArray(val) ? val[0] : val)
    }
  },
  Biografia: {
    type: Sequelize.TEXT,
    set(val) {
      this.setDataValue('Biografia', Array.isArray(val) ? val[0] : val)
    }
  },
  HomePage: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('HomePage', Array.isArray(val) ? val[0] : val)
    }
  },
  Andar: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Andar', Array.isArray(val) ? val[0] : val)
    }
  },
  Fax: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('Fax', Array.isArray(val) ? val[0] : val)
    }
  },
  Matricula: {
    type: Sequelize.INTEGER,
    set(val) {
      this.setDataValue('Matricula', Array.isArray(val) ? Number(val[0]) : Number(val))
    }
  },
  IdSPL: {
    type: Sequelize.INTEGER,
    unique: true,
    set(val) {
      this.setDataValue('IdSPL', Array.isArray(val) ? Number(val[0]) : Number(val))
    }
  },
  IdUA: {
    type: Sequelize.INTEGER,
    set(val) {
      this.setDataValue('IdUA', Array.isArray(val) ? Number(val[0]) : Number(val))
    }
  },
  PathFoto: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('PathFoto', Array.isArray(val) ? val[0] : val)
    }
  }
})

Deputados.createNewOrUpdate = async function (deputado) {
  const id = Array.isArray(deputado.IdDeputado) ? deputado.IdDeputado[0] : deputado.IdDeputado

  let created, deputadoInstance
  try {
    [deputadoInstance, created] = await Deputados.findOrCreate({ where: {
      IdDeputado: id
    },
    defaults: deputado
  })
  } catch (e) {
    console.log(e)
  }
  let updated = false
  if(!created) {
    let { _changed } = await deputadoInstance.update(deputado)
    updated = !!Object.keys(_changed).length
  }
  return {created, updated}
}

module.exports = Deputados
