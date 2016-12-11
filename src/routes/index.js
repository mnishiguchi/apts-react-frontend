import { IndexRoute, Route }        from 'react-router';
import React                        from 'react';

import MainLayout   from '../layouts/MainLayout/MainLayout';
import SearchView   from '../layouts/views/SearchView/SearchView';
import ListingView  from '../layouts/views/ListingView/ListingView';
import HelpView     from '../layouts/views/HelpView/HelpView';

export default function configRoutes(store) {
  return (
    <Route path="/" component={MainLayout} >
      <IndexRoute component={SearchView} />
      <Route path="search"              component={SearchView} />
      <Route path="listings/:listingId" component={ListingView} />
      <Route path="help"                component={HelpView} />
    </Route>
  );
}
