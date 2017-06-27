import { combineReducers } from 'redux';

import repoReducer from './repo';
import langReducer from './lang';

export default combineReducers({
    repo: repoReducer,
    lang: langReducer
});