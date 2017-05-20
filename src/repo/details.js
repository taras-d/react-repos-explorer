import { reposService } from 'api';

// Actions

const GET_REPO_REQUEST = '@repo/GET_REPO_REQUEST';
const GET_REPO_SUCCESS = '@repo/GET_REPO_SUCCESS';
const GET_REPO_FAILURE = '@repo/GET_REPO_FAILURE';

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

        case GET_REPO_REQUEST:
            return Object.assign({}, state, action.payload, {
                data: null,
                loading: true,
                error: null
            });

        case GET_REPO_SUCCESS:
            return Object.assign({}, state, action.payload, {
                loading: false,
                error: null
            });

        case GET_REPO_FAILURE:
            return Object.assign({}, state, action.payload, {
                data: null,
                loading: false
            });

        default:
            return state;
    }

}

// Action creators

export const getRepoRequest = (owner, repo) => {
    return {
        type: GET_REPO_REQUEST,
        payload: { owner, repo }
    };
}

export const getRepoSuccess = (res) => {
    return {
        type: GET_REPO_SUCCESS,
        payload: { data: res }
    };
}

export const getRepoFailure = (res) => {
    return {
        type: GET_REPO_FAILURE,
        payload: {
            error: {
                title: res.detailedStatus,
                desc: res.response.message
            }
        }
    };
}

export const getRepo = (owner, repo) => {
    return dispatch => {
        dispatch( getRepoRequest(owner, repo) );
        return reposService.getRepo(owner, repo).do(
            res => dispatch( getRepoSuccess(res) ),
            err => dispatch( getRepoFailure(err) )
        );
    }
}