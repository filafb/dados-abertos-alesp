const parseFile = require('./')
const { ComissoesMembros } = require('../server/db/models')

process.on('message', async ({file}) => {
  try {
    const parsedXML = await parseFile(file)
    const comissoesMembros = parsedXML.ComissoesMembros.MembroComissao.map(async comissaoMembro => {
      await ComissoesMembros.create(comissaoMembro)
    })
    await Promise.all(comissoesMembros)
    const countComissoesMembros = comissoesMembros.length
    process.send({created: countComissoesMembros})

  } catch (e) {
    console.log(e)
    process.send({error: e})
  }
})
