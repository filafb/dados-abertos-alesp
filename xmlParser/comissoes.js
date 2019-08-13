const parseFile = require('./')
const { Comissoes } = require('../server/db/models')

process.on('message', async ({file}) => {
  //const fileToString = data.file.buffer.data.toString()
  //console.log(file)
  try {
    const parsedXML = await parseFile(file)
    const comissoes = parsedXML.Comissoes.Comissao.map(async comissao => {
      await Comissoes.create(comissao)
    })
    await Promise.all(comissoes)
    //console.log(one)
    //await Comissoes.create(one)
    // const promises = await Comissoes.bulkUpdateOrCreate(parsedXML.Comissoes.Comissao)
    // console.log('promises', promises)
    const countComissoes = comissoes.length
    process.send({created: countComissoes})

  } catch (e) {
    console.log(e)
    process.send({error: e})
  }
})
