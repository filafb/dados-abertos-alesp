import React, { useState } from 'react'
import axios from 'axios'

const Upload = ({apiLocation, text}) => {
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
      await axios.post(`/api/upload/${apiLocation}`, data)
      selectFile('')
    } catch (err) {
      console.log('error', err)
    }
  }
  return (
    <React.Fragment>
      <div>
        <h3>{`Upload arquivo para ${text}`}</h3>
        <form onSubmit={upload}>
          <input type='file' name='file' onChange={getFile} />
          <button type="submit">Upload xml</button>
        </form>
        <hr />
      </div>
    </React.Fragment>
  )

}

export default Upload
