const parseFile = require('./')
const { ComissoesMembros, Deputados } = require('../server/db/models')


process.on('message', async ({file}) => {
  try {
    const parsedXML = await parseFile(file)
    const allComissoesMembros = parsedXML.ComissoesMembros.MembroComissao
    let promisesComissoesMembros = []
    const getDeputadosIdSPL = await Deputados.findAll({attributes: ['IdSPL']}).map(id => id.IdSPL)
    //Filtrando deputados ativos. Arquivo original traz comissoes com deputados de outra legislatura, mas lista de deputados só traz os deputados desta legislatura. Como há associação entre as tabelas, necessário o filtro
    for( let i = 0; i < allComissoesMembros.length; i++) {
      const id = Number(allComissoesMembros[i].IdMembro[0])
      if(getDeputadosIdSPL.indexOf(id) !== -1) {
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
