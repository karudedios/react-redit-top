import { Map } from 'immutable';
import { combineReducers } from 'redux-immutable';

export default combineReducers({
  root: () => Map(),
});
