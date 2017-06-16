import { reposService } from 'api';

// Actions

const REQUEST = '@repo/LANG_REQUEST';
const REQUEST_OK = '@repo/LANG_REQUEST_OK';
const REQUEST_FAIL = '@repo/LANG_REQUEST_FAIL';

// Reducer

const initialState = {
    data: null,
    loading: false,
    error: null
};

export default function reducer(state = initialState, action) {

    switch (action.type) {

        case REQUEST:
            return Object.assign({}, state, {
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
                loading: false
            });

        default:
            return state;
    }

}

// Action creators

export const request = () => ({ type: REQUEST });

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

export const getRepoLang = (owner, repo) => {
    return (dispatch, getState) => {

        // Get owner name and repo name from state
        let { owner, repo } = getState().repo.details;
        
        dispatch( request() );
        return reposService.getRepoLang(owner, repo).do(
            res => dispatch( requestOk(res) ),
            err => dispatch( requestFail(err) )
        );
    }
}