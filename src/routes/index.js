import { IndexRoute, Route }        from 'react-router';
import React                        from 'react';

// The root node of this app.
// TODO: MainLayout will be a simple container and all the logic will be moved to redux.
import MainLayout   from '../containers/MainLayout/MainLayout';

// Views
import SearchView   from '../containers/views/SearchView/SearchView';
import ListingView  from '../containers/views/ListingView/ListingView';
import HelpView     from '../containers/views/HelpView/HelpView';

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
