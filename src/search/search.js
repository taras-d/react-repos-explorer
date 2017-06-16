import { reposService } from 'api';

// Actions

const REQUEST = '@search/REQUEST';
const REQUEST_OK = '@search/REQUEST_OK';
const REQUEST_FAIL = '@search/REQUEST_FAIL';

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

        case REQUEST:
            return Object.assign({}, state, action.payload, {
                loading: true,
                error: null
            });

        case REQUEST_OK:
            return Object.assign({}, state, action.payload, {
                loading: false,
                error: null
            });

        case REQUEST_FAIL:
            return Object.assign({}, state, action.payload, {
                loading: false
            });

        default:
            return state;
            
    }

}

// Action creators

export const request = (query, page) => ({
    type: REQUEST,
    payload: { query, page }
})

export const requestOk = (res) => ({
    type: REQUEST_OK,
    payload: {
        items: res.items,
        totalCount: res.total_count,
        prev: res.prev,
        next: res.next
    }
})

export const requestFail = (res) => ({
    type: REQUEST_FAIL,
    payload: {
        error: {
            title: res.detailedStatus,
            desc: res.response.message
        }
    }
})

export const searchRepos = (query, page) => {
    return dispatch => {
        dispatch( request(query, page) );
        return reposService.searchRepos(query, page).do(
            res => dispatch( requestOk(res) ),
            res => dispatch( requestFail(res) )
        );
    }
}