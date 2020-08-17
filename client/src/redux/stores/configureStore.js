import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import * as immutableStateChecker from 'redux-immutable-state-invariant'
import reducers from 'redux/reducers/rootReducer'

const middleware = process.env.NODE_ENV !== 'production' ? [immutableStateChecker.default(), thunk] : [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // for browser redux plugin

export default createStore(reducers, composeEnhancers(applyMiddleware(...middleware)))

