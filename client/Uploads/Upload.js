import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Upload = ({fileName, text, restAPI}) => {
  const [ file, selectFile ] = useState('')
  const [error, setError ] = useState(false)
  const [ entriesCreated, setEntriesCreated ] = useState({created: null, updated: null})
  const [loading, setLoading ] = useState(false)
  const [entries, setEntries] = useState(0)

  useEffect(() => {
    const getData = async () => {
      const {data: getNumber} = await axios.get(`/api/${restAPI}`)
      const countEntries = getNumber.length
      setEntries(countEntries)
    }
    getData()
  })

  const getFile = (e) => {
    const fileUp = e.target.files[0]
    selectFile(fileUp)
    setEntriesCreated({created: null, updated: null})
  }

  const upload = async (e) => {
    setError(false)
    setLoading(true)
    e.preventDefault()
    try {
      const data = new FormData()
      data.append('file', file)
      let { data: response } = await axios.post(`/api/upload/${fileName}`, data)
      setEntriesCreated(response)
      selectFile('')
    } catch (err) {
      setError(true)
      console.log('error', err)
    }
    setLoading(false)
  }
  return (
    <React.Fragment>
      <div>
        <h3>{`Upload arquivo para ${text} - Total no banco de dados: ${entries}`}</h3>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <form onSubmit={upload}>
            <input type='file' name='file' onChange={getFile} />
            <button disabled={loading} type="submit">Upload xml</button>
          </form>
          {loading && <h4 style={{marginLeft: '20px'}}>Loading File</h4>}
          {error && <h4 style={{marginLeft: '20px', color: 'red'}}>Houve um erro no upload</h4>}
          {(entriesCreated.created !== null || entriesCreated.updated !== null )&& <h4 style={{marginLeft: '20px'}}>{`Sucesso! ${entriesCreated.created} ${text} criados(as) e ${entriesCreated.updated} atualizados(as)`}</h4>}
        </div>
        <hr />
      </div>
    </React.Fragment>
  )

}

export default Upload
