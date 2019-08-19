const parseFile = require('./')
const { Comissoes } = require('../server/db/models')

const legislaturaBeginning = new Date(2019, 2, 15)

process.on('message', async ({file}) => {
  try {
    const parsedXML = await parseFile(file)
    const allComissoes = parsedXML.Comissoes.Comissao
    const promisesComissoes = []
    for( let i = 0; i < allComissoes.length; i++) {
      const DataFimComissao = allComissoes[i].DataFimComissao ? new Date(allComissoes[i].DataFimComissao[0]) : null
      if(legislaturaBeginning < DataFimComissao || !DataFimComissao ) {
        promisesComissoes.push(Comissoes.createNewOrUpdate(allComissoes[i]))
      }
    }
    const comissoes =  await Promise.all(promisesComissoes)
    const summary = comissoes.reduce((result, curr) => {
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
