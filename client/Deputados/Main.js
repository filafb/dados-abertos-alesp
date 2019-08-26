import React, {useState, useEffect } from 'react'
import axios from 'axios'
import ListaDeputados from './ListaDeputados'

export default function Main () {
  const [ deputados, setDeputados ] = useState([])

  useEffect(() => {
    async function getDeputados () {
      try {
        const { data: deputados } = await axios.get('/api/deputados')
        setDeputados(deputados)
      } catch (err) {
        console.log(err)
      }
    }
    getDeputados()
  }, [])

  return (
    deputados.length &&
    <ListaDeputados deputados={deputados} />
  )
}
