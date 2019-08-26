import React from 'react'

export default function ListaDeputados ({deputados = []}) {
  return (
    <ul>
      {deputados.map(deputado => (
        <li key={deputado.IdSPL}>
          <span>Deputado: {deputado.NomeParlamentar} - </span>
          <span>Partido: {deputado.Partido}</span>
        </li>
      ))}
    </ul>
  )
}
