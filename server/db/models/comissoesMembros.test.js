const { ComissoesMembros, Deputados, Comissoes } = require('./')

const aYearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
const today = new Date()

const comissaoMembroArr = {
  DataInicio: [aYearAgo],
  IdPapel: [1],
  Papel: ['a nice role'],
  Efetivo: ['S'],
  DataFim: [today]
}

const comissaoMembro = {
  DataInicio: aYearAgo,
  IdPapel: 1,
  Papel: 'a nice role',
  Efetivo: 'S',
  DataFim: today
}


describe('Comissoes Membros', () => {

  describe('can deal with different types of inputs', () => {

    beforeEach(() => ComissoesMembros.destroy({
      where: {},
      truncate: true,
      cascade: true
    }))

    test('Can deal with inputs placed inside an array', async () => {
      const newEntry = await ComissoesMembros.create(comissaoMembroArr)
      expect(newEntry).toMatchObject(comissaoMembro)
    })

    test('and inputs out of an array', async () => {
      const newEntry = await ComissoesMembros.create(comissaoMembro)
      expect(newEntry).toMatchObject(comissaoMembro)
    })
  })
  describe('It has associations', () => {

    beforeEach(() => ComissoesMembros.destroy({
      where: {},
      truncate: true,
      cascade: true
    }))

    const deputado = { IdDeputado: 456, IdSPL: 100210 }
    const comissao = { IdComissao: 1234 }
    test('with Deputados Model', async () => {
      const comissaoMembroWithMembro = { ...comissaoMembro, IdMembro: deputado.IdSPL }
      let error
      try {
        await ComissoesMembros.create(comissaoMembroWithMembro)
      } catch (e) {
        error = e
      }
      expect(error).not.toBeUndefined()
      const newDeputado = await Deputados.create(deputado)
      const newMembro = await ComissoesMembros.create(comissaoMembroWithMembro)
      expect(newMembro.IdMembro).toBe(newDeputado.IdSPL)
      newDeputado.destroy()
    })
    test('and Comissoes Model', async () => {
      const comissaoMembroWithComissao = { ...comissaoMembro, IdComissao: comissao.IdComissao }
      let error
      try {
        await ComissoesMembros.create(comissaoMembroWithComissao)
      } catch (e) {
        error = e
      }
      expect(error).not.toBeUndefined()
      const newComissao = await Comissoes.create(comissaoMembroWithComissao)
      const newComissaoMembro = await ComissoesMembros.create(comissaoMembroWithComissao)
      expect(newComissaoMembro.IdComissao).toBe(newComissao.IdComissao)
      newComissao.destroy()
    })
  })
  describe('has a class Method named Create New or Update', () => {
    describe('It checks an instance on db based on DataInicio, IdMembro and IdComissao', () => {

      beforeAll(() => ComissoesMembros.destroy({
        where: {},
        truncate: true,
        cascade: true
      }))


      const deputado = { IdDeputado: 456, IdSPL: 100210 }
      const comissao = { IdComissao: 1234 }
      const comissaoEntry = { ...comissaoMembro, IdMembro: deputado.IdSPL, IdComissao: comissao.IdComissao, DataFim: null }

      let deputadoInstance
      let comissaoInstance
      let comissaoInstanceTwo
      let deputadoInstanceTwo

      afterAll(async () => {
        await ComissoesMembros.destroy({
          where: {},
          truncate: true,
          cascade: true
        })
        deputadoInstance.destroy()
        comissaoInstance.destroy()
        comissaoInstanceTwo.destroy()
        deputadoInstanceTwo.destroy()
      })

      test('it creates a new instance if it is not on db', async () => {
        //creates new Deputado
        deputadoInstance = await Deputados.create(deputado)
        //creates new Comissao
        comissaoInstance = await Comissoes.create(comissao)
        //creates new ComissaoMembro, based on deputado and comissao from above
        const { created, updated } = await ComissoesMembros.createNewOrUpdate(comissaoEntry)
        expect(created).toBe(true)
        expect(updated).toBe(false)
        const allComissaoMembro = await ComissoesMembros.findAll({ where: { IdMembro: deputado.IdSPL } })
        //Check that there is only one instance for this deputado
        expect(allComissaoMembro).toHaveLength(1)
        //and DataFim is the same as ComissaoEntry
        expect(allComissaoMembro[0].DataFim).toBeNull()
      })

      test('it updates an instance if DataInicio, IdMembro e IdComissao match with an instance already in db', async () => {
        comissaoEntry.DataFim = today
        //Update DataFim and update instance
        const { created, updated } = await ComissoesMembros.createNewOrUpdate(comissaoEntry)
        expect(created).toBe(false)
        expect(updated).toBe(true)
        //Check in the db there is still only one entry and DataFim is updated
        const allComissaoMembroUpdated = await ComissoesMembros.findAll({ where: { IdMembro: deputado.IdSPL } })
        expect(allComissaoMembroUpdated).toHaveLength(1)
        expect(allComissaoMembroUpdated[0].DataFim).toEqual(today)
      })

      test('it creates a new membro if any of IdMembro, IdComissao or DataInicio dont match', async () => {
        const newComissao = { IdComissao: 987 }
        const newDeputado = { IdDeputado: 12928, IdSPL: 1111210 }
        //Creates a new comissao
        comissaoInstanceTwo = await Comissoes.create(newComissao)
        deputadoInstanceTwo = await Deputados.create(newDeputado)
        comissaoEntry.IdComissao = newComissao.IdComissao
        const { created, updated } = await ComissoesMembros.createNewOrUpdate(comissaoEntry)
        expect(created).toBe(true)
        expect(updated).toBe(false)

        const allComissaoMembro = await ComissoesMembros.findAll({ where: { IdMembro: deputado.IdSPL } })
        expect(allComissaoMembro).toHaveLength(2)

        comissaoEntry.IdMembro = newDeputado.IdSPL
        const { created: secondCreated, updated: secondUpdated } = await ComissoesMembros.createNewOrUpdate(comissaoEntry)
        expect(secondCreated).toBe(true)
        expect(secondUpdated).toBe(false)
        const allComissaoMembroDepOne = await ComissoesMembros.findAll({ where: { IdMembro: deputado.IdSPL } })
        expect(allComissaoMembroDepOne).toHaveLength(2)
        const allComissaoMembroDepTwo = await ComissoesMembros.findAll({ where: { IdMembro: newDeputado.IdSPL } })
        expect(allComissaoMembroDepTwo).toHaveLength(1)
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        comissaoEntry.DataInicio = yesterday;
        const { created: thirdCreated, updated: thirdUpdated } = await ComissoesMembros.createNewOrUpdate(comissaoEntry)
        expect(thirdCreated).toBe(true)
        expect(thirdUpdated).toBe(false)
        const searchPerDate = await ComissoesMembros.findAll({ where: { DataInicio: yesterday } })
        expect(searchPerDate).toHaveLength(1)
        await allComissaoMembroDepTwo[0].reload()
        expect(searchPerDate[0].DataInicio).not.toEqual(allComissaoMembroDepTwo[0].DataInicio)
        expect(searchPerDate[0].DataInicio).toEqual(yesterday)
      })
    })
  })
})
