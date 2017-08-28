import {applyMiddleware, compose, createStore} from 'redux';
import persistState from 'redux-localstorage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './reducers'

const middleware = applyMiddleware(promise(), thunk, logger())

const enhancer = compose(
  middleware,
  persistState(),
)

const store = createStore(reducer, enhancer);

export default store;