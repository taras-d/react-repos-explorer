import { reposService } from 'api';

// Actions

const GET_LANG_REQUEST = '@repo/GET_LANG_REQUEST';
const GET_LANG_SUCCESS = '@repo/GET_LANG_SUCCESS';
const GET_LANG_FAILURE = '@repo/GET_LANG_FAILURE';

// Reducer

const initialState = {
    data: null,
    loading: false,
    error: null
};

export default function reducer(state = initialState, action) {

    switch (action.type) {

        case GET_LANG_REQUEST:
            return Object.assign({}, state, {
                data: null,
                loading: true,
                error: null
            });

        case GET_LANG_SUCCESS:
            return Object.assign({}, state, action.payload, {
                loading: false,
                error: null
            });

        case GET_LANG_FAILURE:
            return Object.assign({}, state, action.payload, {
                loading: false
            });

        default:
            return state;
    }

}

// Action creators

export const getRepoLangRequest = () => {
    return {
        type: GET_LANG_REQUEST
    };
}

export const getRepoLangSuccess = (res) => {
    return {
        type: GET_LANG_SUCCESS,
        payload: { data: res }
    };
}

export const getRepoLangFailure = (res) => {
    return {
        type: GET_LANG_FAILURE,
        payload: {
            error: {
                title: res.detailedStatus,
                desc: res.response.message
            }
        }
    };
}

export const getRepoLang = (owner, repo) => {
    return (dispatch, getState) => {

        // Get owner name and repo name from state
        let { owner, repo } = getState().repo.details;
        
        dispatch( getRepoLangRequest() );
        return reposService.getRepoLang(owner, repo).do(
            res => dispatch( getRepoLangSuccess(res) ),
            err => dispatch( getRepoLangFailure(err) )
        );
    }
}