import * as types from './searchActionTypes';

const initialState = {
    query: '',
    page: 1,
    items: [],
    totalCount: 0,
    loading: false
};

const searchReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SEARCH_REPOS:
            return Object.assign({}, state, action.payload);

        case types.SEARCH_REPOS_OK:
            return Object.assign({}, state, action.payload);

        case types.SEARCH_REPOS_FAIL:
            return Object.assign({}, state, action.payload);

        default:
            return state;
            
    }

}

export { searchReducer };