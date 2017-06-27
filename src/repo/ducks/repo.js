import { reposService } from 'api';

// Actions

const GET_REPO      = 'repo/GET_REPO';
const GET_REPO_OK   = 'repo/GET_REPO_OK';
const GET_REPO_FAIL = 'repo/GET_REPO_FAIL';

// Reducer

const initialState = {
    ownerName: null,
    repoName: null,
    data: null,
    loading: false,
    error: null
};

export default function (state = initialState, action) {

    switch (action.type) {

        case GET_REPO:
            return Object.assign({}, state, action.payload, {
                data: null,
                loading: true,
                error: null
            });

        case GET_REPO_OK:
            return Object.assign({}, state, action.payload, {
                loading: false,
                error: null
            });

        case GET_REPO_FAIL:
            return Object.assign({}, state, action.payload, {
                data: null,
                loading: false
            });

        default:
            return state;
    }

}

// Action creators

export const getRepo = (ownerName, repoName) => ({
    type: GET_REPO,
    payload: { ownerName, repoName }
});

export const getRepoOk = (res) => ({
    type: GET_REPO_OK,
    payload: { data: res }
});

export const getRepoFail = (res) => ({
    type: GET_REPO_FAIL,
    payload: {
        error: {
            title: res.detailedStatus,
            desc: res.response.message
        }
    }
});

export const getRepoAsync = (owner, repo) => {
    return dispatch => {
        dispatch( getRepo(owner, repo) );
        return reposService.getRepo(owner, repo).do(
            res => dispatch( getRepoOk(res) ),
            err => dispatch( getRepoFail(err) )
        );
    }
}