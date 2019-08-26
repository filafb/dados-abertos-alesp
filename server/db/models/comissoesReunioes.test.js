const { ComissoesReunioes, Comissoes } = require('./')

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



  test('has a class method that returns all "Reunioes" where "situacao" is equal "REALIZADA" for a specific "Comissao"', async () => {

    const comissao1 = {
      IdComissao: 10001
    }

    const comissao2 = {
      IdComissao: 10002
    }

    const reunioes = [
      {
        IdComissao: comissao1.IdComissao,
        IdReuniao: 123,
        Situacao: "REALIZADA"
      },
      {
        IdComissao: comissao2.IdComissao,
        IdReuniao: 456,
        Situacao: "REALIZADA"
      },
      {
        IdComissao: comissao1.IdComissao,
        IdReuniao: 998,
        Situacao: "REALIZADA"
      },
      {
        IdComissao: comissao1.IdComissao,
        IdReuniao: 321,
        Situacao: "CANCELADA"
      },
      {
        IdComissao: comissao1.IdComissao,
        IdReuniao: 8765,
        Situacao: "SEM QUORUM"
      },
      {
        IdComissao: comissao1.IdComissao,
        IdReuniao: 34531,
        Situacao: "EM PREPARACAO"
      },
    ]
    const comissao1Instance = await Comissoes.create(comissao1)
    const comissao2Instance = await Comissoes.create(comissao2)
    await ComissoesReunioes.bulkCreate(reunioes)
    const findWhereRealizada = await ComissoesReunioes.realizadas(comissao1Instance.IdComissao)
    expect(findWhereRealizada).toHaveLength(2)
    findWhereRealizada.forEach(reuniao => {
      expect(reuniao.Situacao).toEqual('REALIZADA')
    })
    await comissao1Instance.destroy()
    await comissao2Instance.destroy()
  })
})
