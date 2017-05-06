import { IndexRoute, Route } from 'react-router'
import React                 from 'react'

import MainLayout            from '../layouts/MainLayout'
import ListingScreen         from '../containers/ListingScreen'
import AboutScreen           from '../containers/AboutScreen'

export default function configRoutes(store) {
  return (
    <Route path="/" component={MainLayout} >
      <IndexRoute component={ListingScreen} />
      <Route path="about" component={AboutScreen} />
    </Route>
  )
}
