import React, {useState, useEffect } from 'react'
import axios from 'axios'

export default function Deputado ({match : { params: {id}}}) {
  const [ deputado, setDeputado ] = useState({})
  useEffect(() => {
    async function getADeputado(id) {
      const { data: deputado} = await axios.get(`/api/deputados/${id}`)
      setDeputado(deputado)
    }
    getADeputado(id)
  }, [id])
  console.log('props', deputado)
  const {NomeParlamentar, Partido, PathFoto, Email, Biografia } = deputado
  return (
    <div>
      <img style={{width:'190px', borderRadius: '30px'}} src={PathFoto} alt={NomeParlamentar} />
      <div>Nome: {NomeParlamentar}</div>
      <div>Partido: {Partido}</div>
      <div>Email: {Email}</div>
    </div>
  )
}
