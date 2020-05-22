import userReducer from './userReducer'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleWare from 'redux-promise-middleware'

const rootReducer = combineReducers({ userReducer: userReducer })
export default createStore(rootReducer, applyMiddleware(promiseMiddleWare))