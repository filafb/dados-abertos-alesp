const Comissoes = require('./comissoes')
const Deputados = require('./deputados')
const ComissoesMembros = require('./comissoesMembros')

ComissoesMembros.belongsTo(Comissoes, {foreignKey: 'IdComissao'})
ComissoesMembros.belongsTo(Deputados, {foreignKey:'IdMembro'})
Comissoes.hasMany(ComissoesMembros, {foreignKey: 'IdComissao'})
Deputados.hasMany(ComissoesMembros, {foreignKey:'IdMembro'})


module.exports = {
  Comissoes,
  Deputados,
  ComissoesMembros
}

