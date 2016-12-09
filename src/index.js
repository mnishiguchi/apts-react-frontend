import React    from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App      from './containers/App/App';

import configRoutes                 from './routes';


const store = {};

ReactDOM.render(
  <Router history={browserHistory}>
      {configRoutes(store)}
  </Router>,
  document.getElementById('root')
);
