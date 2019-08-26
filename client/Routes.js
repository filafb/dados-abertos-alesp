import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UploadsRoot from './Uploads/UploadsRoot'

export default function Routes () {
  return (
    <Switch>
      <Route path='/upload' component={UploadsRoot} />
    </Switch>
  )
}
