import React, { useState } from 'react'
import axios from 'axios'

const Upload = ({apiLocation, text}) => {
  const [ file, selectFile ] = useState('')
  const [error, setError ] = useState(false)
  const [ entriesCreated, setEntriesCreated ] = useState(null)
  const [loading, setLoading ] = useState(false)

  const getFile = (e) => {
    const fileUp = e.target.files[0]
    selectFile(fileUp)
    setEntriesCreated(null)
  }

  const upload = async (e) => {
    setError(false)
    setLoading(true)
    e.preventDefault()
    try {
      const data = new FormData()
      data.append('file', file)
      let { data: response } = await axios.post(`/api/upload/${apiLocation}`, data)
      setEntriesCreated(response.created)
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
        <h3>{`Upload arquivo para ${text}`}</h3>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <form onSubmit={upload}>
            <input type='file' name='file' onChange={getFile} />
            <button type="submit">Upload xml</button>
          </form>
          {loading && <h4 style={{marginLeft: '20px'}}>Loading File</h4>}
          {error && <h4 style={{marginLeft: '20px', color: 'red'}}>Houve um erro no upload</h4>}
          {entriesCreated && <h4 style={{marginLeft: '20px'}}>{`Sucesso! ${entriesCreated} ${text} no banco de dados`}</h4>}
        </div>
        <hr />
      </div>
    </React.Fragment>
  )

}

export default Upload
