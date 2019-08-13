import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Upload = () => {
  const [ file, selectFile ] = useState('')

  const getFile = (e) => {
    const fileUp = e.target.files[0]
    selectFile(fileUp)
  }

  const upload = async (e) => {
    e.preventDefault()
    try {
      const data = new FormData()
      data.append('file', file)
      console.log(data)
      await axios.post('/api/upload/comissoes', data)
      selectFile('')
    } catch (err) {
      console.log('error', err)
    }
  }
  return (
    <React.Fragment>
      <form onSubmit={upload}>
        <input type='file' name='file' onChange={getFile} />
        <button type="submit">Upload xml</button>
      </form>
    </React.Fragment>
  )

}

ReactDOM.render(
  <Upload />,
  document.getElementById('app')
)
