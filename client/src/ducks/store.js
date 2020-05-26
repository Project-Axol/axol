import userReducer from './userReducer'
import serverReducer from './serverReducer'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleWare from 'redux-promise-middleware'

const rootReducer = combineReducers({ userReducer: userReducer, serverReducer: serverReducer })
export default createStore(rootReducer, applyMiddleware(promiseMiddleWare))