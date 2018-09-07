import rootSaga from 'sagas';
import rootReducer from 'reducers';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,

  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;
