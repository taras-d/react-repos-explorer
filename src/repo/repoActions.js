import * as types from './repoActionTypes';
import { reposService } from '../api';

export const getRepoRequest = (owner, repo) => {
    return {
        type: types.GET_REPO_REQUEST,
        payload: {
            owner,
            repo,
            details: null,
            loading: true,
            error: null
        }
    };
}

export const getRepoSuccess = (res) => {
    return {
        type: types.GET_REPO_SUCCESS,
        payload: {
            details: res,
            loading: false,
            error: null
        }
    };
}

export const getRepoFailure = (res) => {
    return {
        type: types.GET_REPO_FAILURE,
        payload: {
            details: null,
            loading: false,
            error: {
                title: res.detailedStatus,
                desc: res.response.message
            }
        }
    };
}

// Get repo async action
export const getRepo = (owner, repo) => {
    return dispatch => {
        dispatch( getRepoRequest(owner, repo) );
        return reposService.getRepo(owner, repo).do(
            res => dispatch( getRepoSuccess(res) ),
            err => dispatch( getRepoFailure(err) )
        );
    }
}