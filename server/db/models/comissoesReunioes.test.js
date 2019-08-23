const { ComissoesReunioes } = require('./')

describe('Comissoes Reunioes model', () => {

  beforeEach(() => ComissoesReunioes.destroy({
    where: {},
    truncate: true,
    cascade: true
  }))

  describe('can deal with different types of inputs', () => {

    const reunioaoArr = {
      IdReuniao: [1213],
      IdPauta: [12131],
      NrLegislatura: [19],
      NrConvocacao: ['A. REUNIÃO'],
      TipoConvocacao: ['O'],
      Data: [new Date()],
      CodSituacao: ['R'],
      Situacao: ['REALIZADA'],
      Presidente: ['Marina Helou']
    }

    const reunioao = {
      IdReuniao: 1213,
      IdPauta: 12131,
      NrLegislatura: 19,
      NrConvocacao: 'A. REUNIÃO',
      TipoConvocacao: 'O',
      Data: new Date(),
      CodSituacao: 'R',
      Situacao: 'REALIZADA',
      Presidente: 'Marina Helou'
    }

    test('Can deal with inputs placed inside an array', async () => {
      const newEntry = await ComissoesReunioes.create(reunioaoArr)
      expect(newEntry).toMatchObject(reunioao)
    })

    test('and inputs out of an array', async () => {
      const newEntry = await ComissoesReunioes.create(reunioao)
      expect(newEntry).toMatchObject(reunioao)
    })
  })



  test('has a class method that returns all "Reunioes" where "situacao" is equal "REALIZADA"', async () => {

    const reunioes = [
      {
        IdReuniao: 123,
        Situacao: "REALIZADA"
      },
      {
        IdReuniao: 456,
        Situacao: "REALIZADA"
      },
      {
        IdReuniao: 321,
        Situacao: "CANCELADA"
      },
      {
        IdReuniao: 8765,
        Situacao: "SEM QUORUM"
      },
      {
        IdReuniao: 34531,
        Situacao: "EM PREPARACAO"
      },
    ]

    await ComissoesReunioes.bulkCreate(reunioes)
    const findWhereRealizada = await ComissoesReunioes.Realizadas()
    expect(findWhereRealizada).toHaveLength(2)
    findWhereRealizada.forEach(reuniao => {
      expect(reuniao.Situacao).toEqual('REALIZADA')
    })
  })
})
