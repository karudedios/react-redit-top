import { Map } from 'immutable';
import { combineReducers } from 'redux-immutable';

import reddit from './reddit';

export default combineReducers({
  reddit,
}, Map);
