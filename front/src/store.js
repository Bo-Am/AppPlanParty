import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

const initialState = {};
const middleware = [thunk];
// const preloadedState = window.localStorage.getItem('state') || '{"isAuth" : true}'

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

// store.subscribe(()=>{
//     const state = store.getState()
//     window.localStorage.setItem('state', JSON.stringify(state))
// })

export default store;
