import React    from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import configRoutes from './routes';

const store = {};

ReactDOM.render(
  <Router history={browserHistory}>
    {configRoutes(store)}
  </Router>,
  document.getElementById('root')
);
