import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UploadsRoot from './Uploads/UploadsRoot'
import Deputados from './Deputados/Main'

export default function Routes () {
  return (
    <Switch>
      <Route path='/upload' component={UploadsRoot} />
      <Route path='/' component={Deputados} />
    </Switch>
  )
}
