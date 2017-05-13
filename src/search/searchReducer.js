import * as types from './searchActionTypes';

const initialState = {
    query: '',
    page: 1,
    items: [],
    totalCount: 0,
    prev: null,
    next: null,
    loading: false,
    error: null
};

const searchReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SEARCH_REPOS_REQUEST:
            return Object.assign({}, state, action.payload);

        case types.SEARCH_REPOS_SUCCESS:
            return Object.assign({}, state, action.payload);

        case types.SEARCH_REPOS_FAILURE:
            return Object.assign({}, state, action.payload);

        default:
            return state;
            
    }

}

export { searchReducer };