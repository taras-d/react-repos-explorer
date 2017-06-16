import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import { searchReducer } from './search';
import { repoReducer } from './repo';

// Create root reducer by combining domain reducers 
const rootReducer = combineReducers({
    search: searchReducer,
    repo: repoReducer
});

// Create middleware
let middleware;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    middleware = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        applyMiddleware(ReduxThunk)
    );
} else {
    middleware = applyMiddleware(ReduxThunk);
}

// Create store
const store = createStore(rootReducer, middleware);

export default store;