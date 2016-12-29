import React                    from 'react';
import ReactDOM                 from 'react-dom';
import { browserHistory }       from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore           from './store';
import Root                     from './containers/Root';

require('dotenv').load({silent: true})

const store   = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Root
    routerHistory={history}
    store={store}
  />,
  document.getElementById('root')
);
