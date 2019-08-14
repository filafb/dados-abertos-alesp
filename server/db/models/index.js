const Comissoes = require('./comissoes')
const Deputados = require('./deputados')
const ComissoesMembros = require('./comissoesMembros')

ComissoesMembros.belongsTo(Comissoes, {foreignKey: 'IdComissao'})
ComissoesMembros.belongsTo(Deputados, {foreignKey:'IdMembro', targetKey: 'IdSPL'})
Comissoes.hasMany(ComissoesMembros, {foreignKey: 'IdComissao'})
Deputados.hasMany(ComissoesMembros, {foreignKey: 'IdMembro', targetKey: 'IdSPL'})


module.exports = {
  Comissoes,
  Deputados,
  ComissoesMembros
}

