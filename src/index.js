import React                      from 'react'
import PropTypes                  from 'prop-types'
import ReactDOM                   from 'react-dom'
import { browserHistory, Router } from 'react-router'
import { syncHistoryWithStore }   from 'react-router-redux'
import { Provider }               from 'react-redux'
import invariant                  from 'invariant'


import configureStore             from './store'
import configRoutes               from './routes'

require('dotenv').load({silent: true})

// Styles
require('bootstrap/dist/css/bootstrap.css')
require('mapbox-gl/dist/mapbox-gl.css')
require('./styles.css')

const store   = configureStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

const propTypes = {
  routerHistory: PropTypes.object.isRequired,
  store:         PropTypes.object.isRequired,
}

const Root = ({ routerHistory, store }) => {
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

Root.propTypes = propTypes

ReactDOM.render(
  <Root
    routerHistory={history}
    store={store}
  />,
  document.getElementById('root')
)
