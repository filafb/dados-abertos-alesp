const { db } = require('../')
const Comissoes = db.model('comissao')

const comissaoArr = {
  IdComissao: ['103'],
  NomeComissao: ['Mesa'],
  SiglaComissao: ['MESA'],
  DescricaoComissao: ['Uma definicao generica']
}

const comissao = {
  IdComissao: 103,
  NomeComissao: 'Mesa',
  SiglaComissao: 'MESA',
  DescricaoComissao: 'Uma definicao generica'
}

describe('Comissoes', () => {
  beforeEach(() => db.sync({force: true}))


  test('Can deal with inputs placed inside an array', async () => {
    const newEntry = await Comissoes.create(comissaoArr)
    expect(newEntry).toMatchObject(comissao)
  } )

  test('and inputs out of a array', async () => {
    const newEntry = await Comissoes.create(comissao)
    expect(newEntry).toMatchObject(comissao)
  } )

  describe('has a class Method Create New or Update', () => {

    test('that creates a new instance or update it if it already exists', async () => {
      //make sure db is empty
      const empty = await Comissoes.findOne({where: {IdComissao: comissao.IdComissao}})
      expect(empty).toBeNull()
      //create a new one
      const {created, updated} = await Comissoes.createNewOrUpdate(comissao)
      expect(created).toBeTruthy()
      expect(updated).toBeFalsy()
      const newCreated = await Comissoes.findOne({where: {IdComissao: comissao.IdComissao}})
      expect(newCreated).toMatchObject(comissao)
      //update the one that is already in the db
      const updatedComissao = {...comissao, DataFimComissao: new Date() }
      const {created: createdUp, updated: newUpdated} = await Comissoes.createNewOrUpdate(updatedComissao)
      expect(createdUp).toBeFalsy()
      expect(newUpdated).toBeTruthy()
      const instanceUpdated = await Comissoes.findOne({where: {IdComissao: comissao.IdComissao}})
      expect(instanceUpdated).toMatchObject(updatedComissao)
    })
  })
})
