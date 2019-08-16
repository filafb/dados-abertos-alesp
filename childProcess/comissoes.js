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
        promisesComissoes.push(Comissoes.create(allComissoes[i]))
      }
    }
    await Promise.all(promisesComissoes)
    const countComissoes = promisesComissoes.length
    process.send({created: countComissoes})

  } catch (e) {
    console.log(e)
    process.send({error: e})
  }
})
