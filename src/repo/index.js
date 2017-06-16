import { combineReducers } from 'redux';

import RepoPage from './containers/repoPage';

import detailsReducer from './ducks/details';
import languagesReducer from './ducks/languages';

const repoReducer = combineReducers({
     details: detailsReducer, 
     languages: languagesReducer
});

export {
    RepoPage,
    repoReducer
};