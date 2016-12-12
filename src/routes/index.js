import { IndexRoute, Route }        from 'react-router';
import React                        from 'react';

import MainLayout   from '../layouts/MainLayout/MainLayout';
import SearchView   from '../containers/SearchView/SearchView';
import DetailView   from '../containers/DetailView/DetailView';
import HelpView     from '../containers/HelpView/HelpView';

export default function configRoutes(store) {
  return (
    <Route path="/" component={MainLayout} >
      <IndexRoute                component={SearchView} />
      <Route path="listings/:id" component={DetailView} />
      <Route path="help"         component={HelpView} />
    </Route>
  );
}
