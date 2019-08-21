const { Deputados } = require('./')
//const { db } = require('../')

// beforeAll(async () => {
//   await db.sync({ force: true })
// })

// afterAll(() => {
//   return db.drop()
// })

const deputadoArr = {
  IdDeputado: ['123'],
  NomeParlamentar: ['Marina Helou'],
  Aniversario: ['25/08'],
  Partido: ['REDE'],
  Situacao: ['EXE'],
  Email: ['mandato@marinahelou.com.br'],
  Sala: ['2104'],
  Telefone: ['3886-6084'],
  PlacaVeiculo: ['abc-1234'],
  Biografia: ['A very nice bio'],
  HomePage: ['www.averyniceurl.com'],
  Andar: ['2º'],
  Fax: ['3886-6084'],
  Matricula: ['300636'],
  IdSPL: ['1000000349'],
  IdUA: ['20403'],
  PathFoto: ['http://www3.al.sp.gov.br/repositorio/deputadoPortal/fotos/20190315-153714-id=518-PEQ.png'],
}

const deputado = {
  IdDeputado: 123,
  NomeParlamentar: 'Marina Helou',
  Aniversario: '25/08',
  Partido: 'REDE',
  Situacao: 'EXE',
  Email: 'mandato@marinahelou.com.br',
  Sala: '2104',
  Telefone: '3886-6084',
  PlacaVeiculo: 'abc-1234',
  Biografia: 'A very nice bio',
  HomePage: 'www.averyniceurl.com',
  Andar: '2º',
  Fax: '3886-6084',
  Matricula: 300636,
  IdSPL: 1000000349,
  IdUA: 20403,
  PathFoto: 'http://www3.al.sp.gov.br/repositorio/deputadoPortal/fotos/20190315-153714-id=518-PEQ.png',
}

beforeEach(() => Deputados.destroy({
  where: {},
  truncate: true,
  cascade: true
  }))

describe('Deputados Model', () => {

  test('Can deal with inputs placed inside an array', async () => {
    const newDeputadoEntry = await Deputados.create(deputadoArr)
    expect(newDeputadoEntry).toMatchObject(deputado)
  })
  test('and inputs out of a array', async () => {
    const newDeputadoEntry = await Deputados.create(deputado)
    expect(newDeputadoEntry).toMatchObject(deputado)
  })

  describe('has a class Method called Create New or Update', () => {
    test('that creates a new instance or update it if it already exists', async () => {
      //make sure db do not contain Deputado
      const empty = await Deputados.findOne({where: {IdDeputado: deputado.IdDeputado}})
      expect(empty).toBeNull()

      //create a new one, using the method
      const { created, updated } = await Deputados.createNewOrUpdate(deputado)
      expect(created).toBeTruthy()
      expect(updated).toBeFalsy()
      const newCreated = await Deputados.findOne({where: {IdDeputado: deputado.IdDeputado}})
      expect(newCreated).toMatchObject(deputado)
      // update the one that is already in the db
      const updatedDeputado = {...deputado, Biografia: 'a brand new biografia'}
      const {created: createdUp, updated: newUpdated} = await Deputados.createNewOrUpdate(updatedDeputado)
      expect(createdUp).toBeFalsy()
      expect(newUpdated).toBeTruthy()
      const instanceUpdated = await Deputados.findOne({where: {IdDeputado: deputado.IdDeputado}})
      expect(instanceUpdated).toMatchObject(updatedDeputado)
    })
  })
})
