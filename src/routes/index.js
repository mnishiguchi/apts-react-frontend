import { IndexRoute, Route } from 'react-router'
import React                 from 'react'

import MainLayout            from '../layouts/MainLayout'
import ListingApp            from '../containers/ListingApp'

export default function configRoutes(store) {
  return (
    <Route path="/" component={MainLayout} >
      <IndexRoute component={ListingApp} />
    </Route>
  )
}
