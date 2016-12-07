import React    from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App      from './App/App';

// // Layouts
// import MainLayout from './layout/MainLayout/MainLayout';

// Pages
import HomePage   from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import LoginPage  from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import HelpPage   from './pages/HelpPage/HelpPage';

ReactDOM.render(
  <Router history={browserHistory}>
      <Route path="/" component={App} >
          <IndexRoute component={HomePage} />
          <Route path="search" component={SearchPage} />
          <Route path="login"  component={LoginPage} />
          <Route path="signup" component={SignupPage} />
          <Route path="help"   component={HelpPage} />
      </Route>
  </Router>,
  document.getElementById('root')
);
