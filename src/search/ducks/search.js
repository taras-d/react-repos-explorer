import { reposService } from 'api';

// Actions

const SEARCH      = 'search/SEARCH';
const SEARCH_OK   = 'search/SEARCH_OK';
const SEARCH_FAIL = 'search/SEARCH_FAIL';

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

        case SEARCH:
            return Object.assign({}, state, action.payload, {
                loading: true,
                error: null
            });

        case SEARCH_OK:
            return Object.assign({}, state, action.payload, {
                loading: false,
                error: null
            });

        case SEARCH_FAIL:
            return Object.assign({}, state, action.payload, {
                loading: false
            });

        default:
            return state;
            
    }

}

// Action creators

export const search = (query, page) => ({
    type: SEARCH,
    payload: { query, page }
})

export const searchOk = (res) => ({
    type: SEARCH_OK,
    payload: {
        items: res.items,
        totalCount: res.total_count,
        prev: res.prev,
        next: res.next
    }
})

export const searchFail = (res) => ({
    type: SEARCH_FAIL,
    payload: {
        error: {
            title: res.detailedStatus,
            desc: res.response.message
        }
    }
})

export const searchAsync = (query, page) => {
    return dispatch => {
        dispatch( search(query, page) );
        return reposService.searchRepos(query, page).do(
            res => dispatch( searchOk(res) ),
            res => dispatch( searchFail(res) )
        );
    }
}