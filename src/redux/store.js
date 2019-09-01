import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import { persistStore } from 'redux-persist'

import rootReducer from './root-reducer'

// list of middlewares
const middlewares = []

if(process.env.NODE_ENV === 'develpment') {
	middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

export const persistor = persistStore(store)

export default {store, persistor}