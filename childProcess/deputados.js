const parseFile = require('./')
const { Deputados } = require('../server/db/models')

process.on('message', async ({ file }) => {
  try {
    const parsedXML = await parseFile(file)
    const deputados = parsedXML.Deputados.Deputado.map( deputado => {
      return Deputados.createNewOrUpdate(deputado)
    })
    const results = await Promise.all(deputados)
    const summary = results.reduce((result, curr) => {
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
