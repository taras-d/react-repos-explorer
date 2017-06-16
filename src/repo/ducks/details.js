import { reposService } from 'api';

// Actions

const REQUEST = '@repo/DETAILS_REQUEST';
const REQUEST_OK = '@repo/DETAILS_REQUEST_OK';
const REQUEST_FAIL = '@repo/DETAILS_REQUEST_FAIL';

// Reducer

const initialState = {
    owner: null,
    repo: null,
    data: null,
    loading: false,
    error: null
};

export default function (state = initialState, action) {

    switch (action.type) {

        case REQUEST:
            return Object.assign({}, state, action.payload, {
                data: null,
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
                data: null,
                loading: false
            });

        default:
            return state;
    }

}

// Action creators

export const request = (owner, repo) => ({
    type: REQUEST,
    payload: { owner, repo }
});

export const requestOk = (res) => ({
    type: REQUEST_OK,
    payload: { data: res }
});

export const requestFail = (res) => ({
    type: REQUEST_FAIL,
    payload: {
        error: {
            title: res.detailedStatus,
            desc: res.response.message
        }
    }
});

export const getRepo = (owner, repo) => {
    return dispatch => {
        dispatch( request(owner, repo) );
        return reposService.getRepo(owner, repo).do(
            res => dispatch( requestOk(res) ),
            err => dispatch( requestFail(err) )
        );
    }
}