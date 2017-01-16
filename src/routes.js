import { IndexRoute, Route } from 'react-router'
import React                 from 'react'

import MainLayout   from './layouts/MainLayout/MainLayout'
import ListingView  from './containers/ListingView/ListingView'
import DetailView   from './containers/DetailView/DetailView'
import HelpView     from './containers/HelpView/HelpView'

import MapContainer     from './containers/MapContainer/MapContainer'

export default function configRoutes(store) {
  return (
    <Route component={MainLayout} >
      <Route path="/" component={MapContainer}>
        <IndexRoute              component={ListingView} />
        <Route path="detail/:id" component={DetailView} />
      </Route>

      <Route path="help" component={HelpView} />
    </Route>
  )
}
