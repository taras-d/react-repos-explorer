import * as types from './repoActionTypes';
import { reposService } from '../api';

export const getRepo = (owner, repo) => {
    return {
        type: types.GET_REPO,
        payload: {
            owner,
            repo,
            loading: true,
            error: null
        }
    };
}

export const getRepoOk = (res) => {
    return {
        type: types.GET_REPO_OK,
        payload: {
            details: res,
            loading: false,
            error: null
        }
    };
}

export const getRepoFail = (res) => {
    return {
        type: types.GET_REPO_FAIL,
        payload: {
            loading: false,
            error: {
                title: res.detailedStatus,
                desc: res.response.message
            }
        }
    };
}

export const getRepoAsync = (owner, repo) => {
    return dispatch => {
        dispatch(getRepo(owner, repo));
        return reposService.getRepo(owner, repo).do(
            res => dispatch(getRepoOk(res)),
            err => dispatch(getRepoFail(err))
        );
    }
}