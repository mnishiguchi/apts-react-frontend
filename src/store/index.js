import { createStore, applyMiddleware } from 'redux';
import thunk                            from 'redux-thunk';
import createLogger                     from 'redux-logger';

import reducers from '../reducers';

const logger = createLogger();

export default function configureStore(initialState) {
  return createStore(
    reducers,
    // initialState, // TODO
    applyMiddleware( thunk, logger )
  );
}
