import React, { PropTypes as T }  from 'react'
import ReactDOM                   from 'react-dom'
import { Provider }               from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore }   from 'react-router-redux'

import invariant                  from 'invariant'
import configRoutes               from './routes'
import configureStore             from './store'

// Load secrets.
require('dotenv').load({silent: true})


// ---
// Configure root node
// ---


class Root extends React.Component {
  static propTypes = {
    routerHistory: T.object.isRequired,
    store:         T.object.isRequired,
  }

  render() {
    const { routerHistory, store } = this.props
    invariant(
      routerHistory,
      '<Root /> needs either a routingContext or routerHistory to render.'
    )
    return (
      <Provider store={store}>
        <Router history={routerHistory}>
          {configRoutes(store)}
        </Router>
      </Provider>
    )
  }
}


// ---
// Bootstrap the app
// ---


const store   = configureStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Root routerHistory={history} store={store} />,
  document.getElementById('root')
)
