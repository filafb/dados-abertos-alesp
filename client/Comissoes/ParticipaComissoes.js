import React, { useState, useEffect } from 'react'
import Axios from 'axios';

export default function ParticipaComissoes ({deputadoSPL}) {
  const [comissoes, setComissoes] = useState([])

  useEffect(() => {
    async function getComissoes(idSpl) {
      const { data: comissoes } = await Axios.get(`/api/comissoes/membros/${idSpl}`)
      setComissoes(comissoes)
    }
    getComissoes(deputadoSPL)
  }, [deputadoSPL])

  const { member, wasMember } = comissoes.reduce((finalObj, currentComissao) => {
    if(currentComissao.DataFim) {
      finalObj.wasMember.push(currentComissao)
    } else {
      finalObj.member.push(currentComissao)
    }
    return finalObj
  }, {member: [], wasMember: []})

  console.log('member', member)
  console.log('wasMember', wasMember)
  console.log('t')
  return (
    <React.Fragment>
      <div>
      <h3>Membro de</h3>
        {member.length && member.map(comissao => {
          const {IdComissao, DataInicio, Papel, comissao: {NomeComissao}, reunioes } = comissao
          return (
            <div key={IdComissao}>
              <div>{NomeComissao}</div>
              <div>Desde de: {DataInicio}</div>
              <div>Papel: {Papel}</div>
              <ul>
                {reunioes.map(reuniao => {
                  return (
                    <li key={reuniao.IdReuniao}>
                      <span >Data: {reuniao.Data} - Presença: {reuniao.presenças.length ? 'Sim' : 'Não'}</span>
                    </li>
                  )
                })}

              </ul>
              <hr />
            </div>
          )
        })}
      </div>
      <div>
        <h3>Também já participou:</h3>
        {wasMember.length && wasMember.map(comissao => {
          const {IdComissao, DataInicio, DataFim, Papel, comissao: {NomeComissao}, reunioes } = comissao
          return (
            <div key={IdComissao}>
              <div>{NomeComissao}</div>
              <div>Desde de: {DataInicio}</div>
              <div>Até: {DataFim}</div>
              <div>Papel: {Papel}</div>
              <ul>
                {reunioes.map(reuniao => {
                  return (
                    <li key={reuniao.IdReuniao}>
                      <span >Data: {reuniao.Data} - Presença: {reuniao.presenças.length ? 'Sim' : 'Não'}</span>
                    </li>
                  )
                })}

              </ul>
              <hr />
            </div>
          )
        })}
      </div>
    </React.Fragment>
  )
}
