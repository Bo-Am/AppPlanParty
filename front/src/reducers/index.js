import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import userPhotoReducer from './userPhotoReducer'

export default combineReducers({
  alert,
  auth,
  userPhotoReducer
});
