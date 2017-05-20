import { reposService } from 'api';

// Actions

const SEARCH_REQUEST = '@search/SEARCH_REQUEST';
const SEARCH_SUCCESS = '@search/SEARCH_SUCCESS';
const SEARCH_FAILURE = '@search/SEARCH_FAILURE';


// Reducer

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

export default function reducer(state = initialState, action) {

    switch (action.type) {

        case SEARCH_REQUEST:
            return Object.assign({}, state, action.payload, {
                loading: true,
                error: null
            });

        case SEARCH_SUCCESS:
            return Object.assign({}, state, action.payload, {
                loading: false,
                error: null
            });

        case SEARCH_FAILURE:
            return Object.assign({}, state, action.payload, {
                loading: false
            });

        default:
            return state;
            
    }

}


// Action creators

export const searchReposRequest = (query, page) => {
    return {
        type: SEARCH_REQUEST,
        payload: { query, page }
    };
}

export const searchReposSuccess = (res) => {
    return {
        type: SEARCH_SUCCESS,
        payload: {
            items: res.items,
            totalCount: res.total_count,
            prev: res.prev,
            next: res.next
        }
    };
}

export const searchReposFailure = (res) => {
    return {
        type: SEARCH_FAILURE,
        payload: {
            items: [],
            totalCount: 0,
            prev: null,
            next: null,
            error: {
                title: res.detailedStatus,
                desc: res.response.message
            }
        }
    };
}

export const searchRepos = (query, page) => {
    return dispatch => {
        dispatch( searchReposRequest(query, page) );
        return reposService.searchRepos(query, page).do(
            res => dispatch( searchReposSuccess(res) ),
            res => dispatch( searchReposFailure(res) )
        );
    }
}