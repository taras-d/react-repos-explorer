import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import { searchReducer } from './search';
import { repoReducer } from './repo';

// Create root reducer by combining sub-reducers
const rootReducer = combineReducers({
    search: searchReducer,
    repo: repoReducer
});

// Create middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(
    applyMiddleware( ReduxThunk )
);

// Create store
const store = createStore(rootReducer, middleware);

export default store;