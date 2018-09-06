import rootReducer from 'reducers';
import { compose, createStore } from 'redux';

/* eslint-disable no-underscore-dangle */
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__;
/* eslint-enable */

export default createStore(
  rootReducer,
  compose(
    devTools && devTools(),
  ),
);
