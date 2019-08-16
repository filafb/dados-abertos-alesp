const parseFile = require('./')
const { ComissoesPresenca, ComissoesReunioes } = require('../server/db/models')

process.on('message', async ({file}) => {
  try {
    const parsedXML = await parseFile(file)
    const allPresencas = parsedXML.ComissoesReunioesPresencas.ReuniaoComissaoPresenca
    const promisesPresenca = []
    const getReunioes = await ComissoesReunioes.findAll({attributes: ['IdReuniao']}).map(id => id.IdReuniao)
    for(let i = 0; i < allPresencas.length; i++) {
      const id = Number(allPresencas[i].IdReuniao)
      if(getReunioes.indexOf(id) !== -1) {
        promisesPresenca.push(ComissoesPresenca.create(allPresencas[i]))
      }
    }
    await Promise.all(promisesPresenca)
    const countPresencas = promisesPresenca.length
    process.send({created: countPresencas})

  } catch (e) {
    console.log(e)
    process.send({error: e})
  }
})
