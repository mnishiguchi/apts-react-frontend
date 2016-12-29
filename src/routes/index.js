import { IndexRoute, Route }        from 'react-router';
import React                        from 'react';

import MainLayout   from '../layouts/MainLayout/MainLayout';
import ListingView  from '../containers/ListingView/ListingView';
import DetailView   from '../containers/DetailView/DetailView';
import HelpView     from '../containers/HelpView/HelpView';

export default function configRoutes(store) {
  return (
    <Route path="/" component={MainLayout} >
      <IndexRoute              component={ListingView} />
      <Route path="detail/:id" component={DetailView} />
      <Route path="help"       component={HelpView} />
    </Route>
  );
}
