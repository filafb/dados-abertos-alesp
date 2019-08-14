const parseFile = require('./')
const { Deputados } = require('../server/db/models')

process.on('message', async ({ file }) => {
  try {
    const parsedXML = await parseFile(file)
    const deputados = parsedXML.Deputados.Deputado.map( deputado => {
      return Deputados.create(deputado)
    })
    await Promise.all(deputados)
    const countDeputados = deputados.length
    process.send({created: countDeputados})
  } catch (e) {
    console.log(e)
    process.send({error: e})
  }
})
