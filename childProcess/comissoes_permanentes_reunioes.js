const parseFile = require('./')
const { ComissoesReunioes } = require('../server/db/models')

const currentLegislatura = 19

process.on('message', async ({ file }) => {
  try {
    const parsedXML = await parseFile(file)
    const allReunioes = parsedXML.ComissoesReunioes.ReuniaoComissao
    let promisesReunioes = []
    for (let i = 0; i < allReunioes.length; i++) {
      const numeroLegislatura = Number(allReunioes[i].NrLegislatura)
      if(numeroLegislatura === currentLegislatura) {
        promisesReunioes.push(ComissoesReunioes.create(allReunioes[i]))
      }
    }
    await Promise.all(promisesReunioes)
    const countReunioes = promisesReunioes.length
    process.send({created: countReunioes})
  } catch (e) {
    console.log(e)
    process.send({error:e})
  }
})
