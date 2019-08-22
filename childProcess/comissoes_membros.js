const parseFile = require('./')
const { ComissoesMembros, Deputados, Comissoes } = require('../server/db/models')

const legislaturaBeginning = new Date(2019, 2, 15)

process.on('message', async ({file}) => {
  try {
    const parsedXML = await parseFile(file)
    const allComissoesMembros = parsedXML.ComissoesMembros.MembroComissao
    let promisesComissoesMembros = []
    const getDeputadosIdSPL = await Deputados.findAll({attributes: ['IdSPL']}).map(id => id.IdSPL)
    const comissoesLegislaturaAtual = await Comissoes.findAll({attributes: ['IdComissao']}).map(id => id.IdComissao)
    //Filtrando deputados ativos e comissoes na legislatura atual. Arquivo original traz comissoes com deputados de outra legislatura, mas lista de deputados só traz os deputados desta legislatura. Como há associação entre as tabelas, necessário o filtro
    for( let i = 0; i < allComissoesMembros.length; i++) {
      const comissaoId = Number(allComissoesMembros[i].IdComissao[0])
      const id = Number(allComissoesMembros[i].IdMembro[0])
      const dataFimParticipacao = allComissoesMembros[i].DataFim ? new Date(allComissoesMembros[i].DataFim) : null
      if(comissoesLegislaturaAtual.indexOf(comissaoId) !== -1 && getDeputadosIdSPL.indexOf(id) !== -1 && (dataFimParticipacao > legislaturaBeginning || !dataFimParticipacao)) {
        promisesComissoesMembros.push(ComissoesMembros.createNewOrUpdate(allComissoesMembros[i]))
      }
    }
    const comissoesMembros = await Promise.all(promisesComissoesMembros)
    const summary = comissoesMembros.reduce((result, curr) => {
      if(curr.created) result.created++
      if(curr.updated) result.updated++
      return result
    }, {created: 0, updated: 0})
    process.send(summary)

  } catch (e) {
    console.log(e)
    process.send({error: e})
  }
})
