import React from 'react'
import { Link } from 'react-router-dom'

export default function ListaDeputados ({deputados = []}) {
  return (
    <ul>
      {deputados.map(deputado => (
        <li key={deputado.IdSPL}>
          <span>Deputado:
            <Link to={`/deputados/${deputado.IdDeputado}`} >
            {deputado.NomeParlamentar}
            </Link>
          </span>
          <span> - Partido: {deputado.Partido}</span>
        </li>
      ))}
    </ul>
  )
}
