import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxPromise from 'redux-promise'
import {HomeReducer} from './Home'
const reducers = combineReducers({
	home: HomeReducer
})

export default createStore(reducers, applyMiddleware(reduxPromise))
