const Comissoes = require('./comissoes')
const Deputados = require('./deputados')
const ComissoesMembros = require('./comissoesMembros')
const ComissoesReunioes = require('./comissoesReunioes')
const ComissoesPresenca = require('./comissoesPresenca')

ComissoesMembros.belongsTo(Comissoes, {foreignKey: 'IdComissao'})
ComissoesMembros.belongsTo(Deputados, {foreignKey:'IdMembro', targetKey: 'IdSPL'})
Comissoes.hasMany(ComissoesMembros, {foreignKey: 'IdComissao'})
Deputados.hasMany(ComissoesMembros, {foreignKey: 'IdMembro', sourceKey:'IdSPL' })
ComissoesReunioes.belongsTo(Comissoes, {foreignKey: 'IdComissao'})
Comissoes.hasMany(ComissoesReunioes, {foreignKey: 'IdComissao'})
ComissoesPresenca.belongsTo(ComissoesReunioes, {foreignKey: 'IdReuniao'})
ComissoesPresenca.belongsTo(Deputados, {foreignKey:'IdDeputado', targetKey: 'IdSPL'} )
ComissoesReunioes.hasMany(ComissoesPresenca, {foreignKey: 'IdReuniao'})
Deputados.hasMany(ComissoesPresenca, {foreignKey: 'IdDeputado', sourceKey:'IdSPL' } )


module.exports = {
  Comissoes,
  Deputados,
  ComissoesMembros,
  ComissoesReunioes,
  ComissoesPresenca
}

