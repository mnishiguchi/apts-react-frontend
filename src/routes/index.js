import { IndexRoute, Route } from 'react-router'
import React                 from 'react'

import MainLayout   from '../layouts/MainLayout'
import ListingView  from '../containers/ListingView'

export default function configRoutes(store) {
  return (
    <Route path="/" component={MainLayout} >
      <IndexRoute component={ListingView} />
    </Route>
  )
}
