const parseFile = require('./')
const { ComissoesMembros, Deputados } = require('../server/db/models')


process.on('message', async ({file}) => {
  try {
    const parsedXML = await parseFile(file)
    const allComissoesMembros = parsedXML.ComissoesMembros.MembroComissao
    let promisesComissoesMembros = []
    const memoDep = {}
    //Filtrando deputados ativos. Arquivo original traz comissoes com deputados de outra legislatura, mas lista de deputados só traz os deputados desta legislatura. Como há associação entre as tabelas, necessário o filtro
    for( let i = 0; i < allComissoesMembros.length; i++) {
      const id = Number(allComissoesMembros[i].IdMembro[0])
      if(!memoDep[id]) {
        const deputado = await Deputados.findOne({where: {IdSPL: id}})
        if(deputado) {
          memoDep[id] = true
        }
      }
      if(memoDep[id]) {
        promisesComissoesMembros.push(ComissoesMembros.create(allComissoesMembros[i]))
      }
    }
    await Promise.all(promisesComissoesMembros)
    const countComissoesMembros = promisesComissoesMembros.length
    process.send({created: countComissoesMembros})

  } catch (e) {
    console.log(e)
    process.send({error: e})
  }
})
