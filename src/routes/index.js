import { IndexRoute, Route }        from 'react-router';
import React                        from 'react';

// The root node of this app.
// TODO: App will be a simple container and all the logic will be moved to redux.
import App from '../containers/App/App';

// Pages
import HomePage   from '../containers/pages/HomePage/HomePage';
import SearchPage from '../containers/pages/SearchPage/SearchPage';
import LoginPage  from '../containers/pages/LoginPage/LoginPage';
import SignupPage from '../containers/pages/SignupPage/SignupPage';
import HelpPage   from '../containers/pages/HelpPage/HelpPage';

export default function configRoutes(store) {
  return (
    <Route path="/" component={App} >
      <IndexRoute component={HomePage} />
      <Route path="search" component={SearchPage} />
      <Route path="login"  component={LoginPage} />
      <Route path="signup" component={SignupPage} />
      <Route path="help"   component={HelpPage} />
    </Route>
  );
}
