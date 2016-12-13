import { combineReducers }  from 'redux';
import { routerReducer }    from 'react-router-redux';

// Reducers
import listing              from './listing';

/**
 * Here we specify all the combined state reducers.
 */
export default combineReducers({
  // Automatically set routing changes into the state
  routing: routerReducer,
  listing,
});
