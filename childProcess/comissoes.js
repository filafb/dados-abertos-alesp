const parseFile = require('./')
const { Comissoes } = require('../server/db/models')

process.on('message', async ({file}) => {
  try {
    const parsedXML = await parseFile(file)
    const comissoes = parsedXML.Comissoes.Comissao.map( comissao => {
      return Comissoes.create(comissao)
    })
    await Promise.all(comissoes)
    const countComissoes = comissoes.length
    process.send({created: countComissoes})

  } catch (e) {
    console.log(e)
    process.send({error: e})
  }
})
