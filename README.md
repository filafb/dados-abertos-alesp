# Stack
## Front-End
  - React

## Back-end
  - Node (10.2.1)
  - Postgres
  - Express
  - Sequelize

# To run locally:
`git clone git@github.com:filafb/dados-abertos-alesp.git`

`npm run install`

Create a DB named `dados-abertos`
  - using createdb utility:
    `createdb dados-abertos`
  - using `psql`
    `create database dados-abertos`

Then:
- `npm run start-dev`
- Voilà => http://localhost:3000/

# Upload files:

_Comissoes Permanentes_ => [_comissoes.xml_](http://www.al.sp.gov.br/repositorioDados/processo_legislativo/comissoes.xml)

_Deputados_ => [_deputados.xml_](http://www.al.sp.gov.br/repositorioDados/deputados/deputados.xml)

*Comissões Membros* => [_comissoes_membros.xml_](http://www.al.sp.gov.br/repositorioDados/processo_legislativo/comissoes_membros.xml) <br>
_Este arquivo deve ser uploaded depois de comissoes permanentes e deputados_

*Comissões Reuniões* => [_comissoes_permanentes_reunioes.xml_](http://www.al.sp.gov.br/repositorioDados/processo_legislativo/comissoes_permanentes_reunioes.xml) <br>
_Este arquivo deve ser uploaded depois de comissoes permanentes_

*Comissões Presenças* => [_comissoes_permanentes_presencas.xml_](http://www.al.sp.gov.br/repositorioDados/processo_legislativo/comissoes_permanentes_presencas.xml)
_Este arquivo deve ser uploaded depois de Deputados e Comissoes Reunioes_


# APIs

* _/api/comissoes_ => Lista todas as comissões
* _/api/deputados_ => Lista todos os deputados
* _/api/comissoes/membros_ => Lista de todos os membros por comissão
* _/api/comissoes/reunioes_ => Lista de todas as reuniões das comissões na legislatura #19
* _/api/comissoes/reunioes/presencas_ => Lista de presenças em toda as reuniões na legislatura #19
