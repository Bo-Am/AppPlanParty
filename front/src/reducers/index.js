import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import {chatReducer} from './chat_reducer';


export default combineReducers({
  alert,
  auth,
  chatReducer
});
