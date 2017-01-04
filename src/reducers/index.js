import { combineReducers }  from 'redux'

// Automatically set routing changes into the state
import { routerReducer }    from 'react-router-redux'

// Reducers
import place          from './place'
import map              from './map'

/**
 * Here we specify all the combined state reducers.
 */
export default combineReducers({
  routing: routerReducer,
  place,
  map,
})
