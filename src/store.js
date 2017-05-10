import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import { searchReducer } from './search';

// Create root reducer by combining domain reducers 
const rootReducer = combineReducers({
    search: searchReducer
});

// Create store enhancer (middleware)
// If DevTool extension available - compose extension with middleware,
// otherwise use only middleware
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(ReduxThunk)):
    applyMiddleware(ReduxThunk);

// Create store
const store = createStore(rootReducer, enhancer);

export default store;