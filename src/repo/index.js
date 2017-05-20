import { combineReducers } from 'redux';

import RepoPage from './containers/repoPage';

import detailsReducer from './details';
import languagesReducer from './languages';

const repoReducer = combineReducers({
     details: detailsReducer, 
     languages: languagesReducer
});

export {
    RepoPage,
    repoReducer
};