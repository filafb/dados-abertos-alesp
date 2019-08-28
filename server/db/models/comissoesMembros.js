const Sequelize = require('sequelize')
const db = require('../db')
const ComissoesReunioes = require('./comissoesReunioes')
const ComissoesPresenca = require('./comissoesPresenca')
const Op = Sequelize.Op

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

ComissoesMembros.createNewOrUpdate = async function(comissaoMembro) {
  const IdMembro = Array.isArray(comissaoMembro.IdMembro) ? comissaoMembro.IdMembro[0] : comissaoMembro.IdMembro
  const IdComissao = Array.isArray(comissaoMembro.IdComissao) ? comissaoMembro.IdComissao[0] : comissaoMembro.IdComissao
  const DataInicio = Array.isArray(comissaoMembro.DataInicio) ? comissaoMembro.DataInicio[0] : comissaoMembro.DataInicio
  let created, comisssaoMembroInstance
  try {
    [comisssaoMembroInstance, created] = await ComissoesMembros.findOrCreate({where: {
      IdMembro,
      IdComissao,
      DataInicio
    }, defaults: comissaoMembro})
  } catch (e) {
    console.log(e)
  }
  let updated = false
  if(!created) {
    let { _changed } = await comisssaoMembroInstance.update(comissaoMembro)
    updated = !!Object.keys(_changed).length
  }
  return { created, updated }
}

ComissoesMembros.prototype.getReunioesAndPresenca = function () {
  return ComissoesReunioes.findAll({
    where: {
      IdComissao: this.IdComissao,
      Situacao: 'REALIZADA',
      Data: {
        [Op.gte]: this.DataInicio,
        [Op.lte]: this.DataFim ? this.DataFim : new Date()
      }
    },
    include: [ {
      model: ComissoesPresenca,
      where: {
        IdDeputado: this.IdMembro
      },
      required: false
    }]
  })
}

module.exports = ComissoesMembros
