import * as types from '../constants/search-actions';

const initialState = {
    query: '',
    page: 1,
    items: [],
    totalCount: 0,
    loading: false
};

export const search = (state = initialState, action) => {

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