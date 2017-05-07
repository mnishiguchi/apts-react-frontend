import React                 from 'react'
import { IndexRoute, Route, Redirect } from 'react-router'

import MainLayout            from '../layouts/MainLayout'
import AppContainer          from '../containers/AppContainer'
import AboutScreen           from '../containers/AboutScreen'
import ListingScreen         from '../containers/ListingScreen'
import PlaceScreen           from '../containers/PlaceScreen'
import My404Screen           from '../containers/My404Screen'

export default function configRoutes(store) {
  return (
    <Route path="/" component={MainLayout}>
      <Route component={AppContainer}>
        <IndexRoute              component={ListingScreen} />
        <Route path="places/:id" component={PlaceScreen}   />
        <Route path="about"      component={AboutScreen}   />
      </Route>

      <Route path='/404' component={My404Screen} />
      <Redirect from='*' to='/404' />
    </Route>
  )
}
