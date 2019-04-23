import {createStore, applyMiddleware, combineReducers} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import dispatcherReducer from './ducks/dispatcherReducer'


const rootReducer = combineReducers({dispatcher: dispatcherReducer})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))