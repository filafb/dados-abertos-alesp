import React, {useState, useEffect } from 'react'
import axios from 'axios'
import ParticipaComissoes from '../Comissoes/ParticipaComissoes'

export default function Deputado ({match : { params: {id}}}) {
  const [ deputado, setDeputado ] = useState({})
  const [ openModal, toggleModal ] = useState(false)
  useEffect(() => {
    async function getADeputado(id) {
      const { data: deputado} = await axios.get(`/api/deputados/${id}`)
      setDeputado(deputado)
    }
    getADeputado(id)
  }, [id])

  const toggleComissoes = (e) => {
    toggleModal(!openModal)
  }
  const {NomeParlamentar, Partido, PathFoto, Email, Biografia, IdSPL } = deputado
  return (
    <div>
      <div>
        <img style={{width:'190px', borderRadius: '30px'}} src={PathFoto} alt={NomeParlamentar} />
        <div>Nome: {NomeParlamentar}</div>
        <div>Partido: {Partido}</div>
        <div>Email: {Email}</div>
      </div>
      <button type='button' onClick={toggleComissoes}>Comissões</button>
      {openModal && <ParticipaComissoes deputadoSPL={IdSPL} />}
    </div>
  )
}
