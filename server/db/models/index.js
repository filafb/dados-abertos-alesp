const Comissoes = require('./comissoes')
const Deputados = require('./deputados')
const ComissoesMembros = require('./comissoesMembros')
const ComissoesReunioes = require('./comissoesReunioes')

ComissoesMembros.belongsTo(Comissoes, {foreignKey: 'IdComissao'})
ComissoesMembros.belongsTo(Deputados, {foreignKey:'IdMembro', targetKey: 'IdSPL'})
Comissoes.hasMany(ComissoesMembros, {foreignKey: 'IdComissao'})
Deputados.hasMany(ComissoesMembros, {foreignKey: 'IdMembro', sourceKey:'IdSPL' })
ComissoesReunioes.belongsTo(Comissoes, {foreignKey: 'IdComissao'})
Comissoes.hasMany(ComissoesReunioes, {foreignKey: 'IdComissao'})


module.exports = {
  Comissoes,
  Deputados,
  ComissoesMembros,
  ComissoesReunioes
}

