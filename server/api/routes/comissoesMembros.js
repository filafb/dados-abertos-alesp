const express = require('express')
const router = express.Router()
const { ComissoesMembros, Comissoes } = require('../../db/models')

module.exports = router

router.get('/:IdMembro', async (req, res, next) => {
  const IdMembro = Number(req.params.IdMembro)
  try {
    const listComissoesMembros = await ComissoesMembros.findAll({
      where: {IdMembro},
      include: [{
        model:Comissoes,
        attributes: ['NomeComissao']
      }],
      attributes: ['DataInicio', 'DataFim', 'Papel', 'Efetivo', 'IdComissao', 'IdMembro']
    })
    for(let i = 0; i < listComissoesMembros.length; i++) {
      const reunioesAndPresenca = await listComissoesMembros[i].getReunioesAndPresenca()
      listComissoesMembros[i].dataValues.reunioes = reunioesAndPresenca
    }
    res.json(listComissoesMembros)
  } catch (err) {
    next(err)
  }
})
