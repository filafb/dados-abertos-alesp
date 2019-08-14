# Stack
## Front-End
  - React

## Back-end
  - Node (>10)
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
This files must be uploaded after comissoes.xml and deputados.xml, since it contains foreign keys linking it to those.


# APIs

* _/api/comissoes_ => Lista todas as comissões
* _/api/deputados_ => Lista todos os deputados
