import { IndexRoute, Route }        from 'react-router';
import React                        from 'react';

// The root node of this app.
// TODO: App will be a simple container and all the logic will be moved to redux.
import App        from '../containers/App/App';
import MainLayout from '../layouts/MainLayout/MainLayout';

// Pages
import SearchPage          from '../containers/pages/SearchPage/SearchPage';
import ListingPage  from '../containers/pages/ListingPage/ListingPage';
import HelpPage   from '../containers/pages/HelpPage/HelpPage';

export default function configRoutes(store) {
  return (
    <Route path="/" component={App} >
      <IndexRoute component={SearchPage} />
      <Route path="search"       component={SearchPage} />
      <Route path="listings/:listingId" component={ListingPage} />
      <Route path="help"         component={HelpPage} />
    </Route>
  );
}
