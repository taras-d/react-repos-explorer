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

        case types.SEARCH_REQUEST:
        case types.SEARCH_SUCCESS:
        case types.SEARCH_FAILURE:
            return Object.assign({}, state, action.payload);

        default:
            return state;
            
    }

}

export { searchReducer };