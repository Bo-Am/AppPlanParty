import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import {chatReducer} from './chat_reducer';
import userPhotoReducer from './userPhotoReducer'


export default combineReducers({
  alert,
  auth,
  chat: chatReducer,
  userPhotoReducer
});
