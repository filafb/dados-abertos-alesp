import React from 'react';
import Upload from './Upload';

const filesToUpload = [
  {
    id: 1,
    fileName: 'comissoes',
    text: 'Comissões Permanentes',
    restAPI: 'comissoes'
  },
  {
    id: 2,
    fileName: 'deputados',
    text: 'Deputados',
    restAPI: 'deputados'
  },
  {
    id: 3,
    fileName: 'comissoes_membros',
    text: 'Comissões Membros',
    restAPI: 'comissoes/membros'
  },
  {
    id: 4,
    fileName: 'comissoes_permanentes_reunioes',
    text: 'Reuniões das Comissões',
    restAPI: 'comissoes/reunioes'
  },
  {
    id: 5,
    fileName: 'comissoes_permanentes_presencas',
    text: 'Presenças em comissões',
    restAPI: 'comissoes/reunioes/presencas'
  },
];

function Main() {
  return (
    <React.Fragment>
      {filesToUpload.map(({fileName, text, id, restAPI}) => (
        <Upload fileName={fileName} text={text} restAPI={restAPI} key={id} />
      ))}
    </React.Fragment>
  );
}

export default Main;
