import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import MainLayout from  './layout/MainLayout/MainLayout';

// Pages
import HomePage   from  './pages/HomePage/HomePage';
import SearchPage from  './pages/SearchPage/SearchPage';
import LoginPage  from  './pages/LoginPage/LoginPage';
import SignupPage from  './pages/SignupPage/SignupPage';
import HelpPage   from  './pages/HelpPage/HelpPage';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout} >
        <IndexRoute component={HomePage} />
        <Route path="search" component={SearchPage} />
        <Route path="login" component={LoginPage} />
        <Route path="signup" component={SignupPage} />
        <Route path="help" component={HelpPage} />
      </Route>
    </Router>
  );
} // end class

export default App;
