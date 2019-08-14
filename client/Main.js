import React from 'react'
import Upload from './Upload'

function Main () {
  return (
    <React.Fragment>
      <Upload apiLocation='comissoes' text='Comissões Permanentes' />
      <Upload apiLocation='deputados' text='Deputados' />
      <Upload apiLocation='comissoes_membros' text='Comissões Membros' />
    </React.Fragment>
  )
}

export default Main
