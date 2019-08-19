const Sequelize = require('sequelize')
const db = require('../db')

const Comissoes = db.define('comissao', {
  DataFimComissao: {
    type: Sequelize.DATE,
    set(val) {
      this.setDataValue('DataFimComissao', Array.isArray(val) ? val[0] : val)
    }
  },
  IdComissao: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    set(val) {
      this.setDataValue('IdComissao', Array.isArray(val) ? Number(val[0]) : Number(val))
    }
  },
  NomeComissao: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('NomeComissao', Array.isArray(val) ? val[0] : val)
    }
  },
  SiglaComissao: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('SiglaComissao', Array.isArray(val) ? val[0] : val)
    }
  },
  DescricaoComissao: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('DescricaoComissao', Array.isArray(val) ? val[0] : val)
    }
  }
}, {
    tableName: 'comissoes'
  })

Comissoes.createNewOrUpdate = async function (comissao) {
  const id = Array.isArray(comissao.IdComissao) ? comissao.IdComissao[0] : comissao.IdComissao
  let created, comissaoInstance
  try {
    [comissaoInstance, created] = await Comissoes.findOrCreate({ where: { IdComissao: id }, defaults: comissao })

  } catch (e) {
    console.log(e)
  }
  let updated = false
  if (!created) {
    let { _changed } = await comissaoInstance.update(comissao)
    updated = !!Object.keys(_changed).length
  }
  return { created, updated }
}

module.exports = Comissoes

