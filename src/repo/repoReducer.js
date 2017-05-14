import { combineReducers } from 'redux';

import * as types from './repoActionTypes';

const detailsInitialState = {
    owner: null,
    repo: null,
    details: null,
    loading: false,
    error: null
};

const details = (state = detailsInitialState, action) => {

    switch (action.type) {

        case types.GET_REPO_REQUEST:
        case types.GET_REPO_SUCCESS:
        case types.GET_REPO_FAILURE:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }

}

const languagesInitialState = {
    owner: null,
    repo: null,
    languages: null,
    loading: false,
    error: null
};

const languages = (state = languagesInitialState, action) => {

    switch (action.type) {

        case types.GET_REPO_LANG_REQUEST:
        case types.GET_REPO_LANG_SUCCESS:
        case types.GET_REPO_LANG_FAILURE:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }

}

export const repoReducer = combineReducers({ details, languages });