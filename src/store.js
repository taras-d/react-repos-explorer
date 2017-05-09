import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducer from './reducers';

const DEV_TOOL_COMPOSE = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(
    reducer,
    // If DevTool extensin defined - compose middleware and extension,
    // otherwise use only middleware
    DEV_TOOL_COMPOSE?
        DEV_TOOL_COMPOSE(applyMiddleware(ReduxThunk)):
        applyMiddleware(ReduxThunk)
);

export default store;