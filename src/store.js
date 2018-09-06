import rootSaga from 'sagas';
import rootReducer from 'reducers';
import createSagaMiddleware from 'redux-saga';
import { compose, createStore, applyMiddleware } from 'redux';

/* eslint-disable no-underscore-dangle */
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__;
/* eslint-enable */

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  rootReducer,
  compose(
    devTools && devTools(),
    applyMiddleware(sagaMiddleware),
  ),
);

sagaMiddleware.run(rootSaga);
