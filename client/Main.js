import React from 'react';
import Upload from './Upload';

const filesToUpload = [
  {
    id: 1,
    apiLocation: 'comissoes',
    text: 'Comissões Permanentes',
  },
  {
    id: 2,
    apiLocation: 'deputados',
    text: 'Deputados',
  },
  {
    id: 3,
    apiLocation: 'comissoes_membros',
    text: 'Comissões Membros',
  },
  {
    id: 4,
    apiLocation: 'comissoes_permanentes_reunioes',
    text: 'Reuniões das Comissões',
  },
  {
    id: 5,
    apiLocation: 'comissoes_permanentes_presencas',
    text: 'Presenças em comissões',
  },
];

function Main() {
  return (
    <React.Fragment>
      {filesToUpload.map(({apiLocation, text, id}) => (
        <Upload apiLocation={apiLocation} text={text} key={id} />
      ))}
    </React.Fragment>
  );
}

export default Main;
