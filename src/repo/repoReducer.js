import * as types from './repoActionTypes';

const initialState = {
    owner: null,
    repo: null,
    details: null,
    loading: false,
    error: null
};

const repoReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.GET_REPO:
            return Object.assign({}, state, action.payload);

        case types.GET_REPO_OK:
            return Object.assign({}, state, action.payload);

        case types.GET_REPO_FAIL:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }

}

export { repoReducer };