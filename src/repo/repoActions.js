import * as types from './repoActionTypes';
import { reposService } from '../api';

// Get repo actions

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

export const getRepo = (owner, repo) => {
    return dispatch => {
        dispatch( getRepoRequest(owner, repo) );
        return reposService.getRepo(owner, repo).do(
            res => dispatch( getRepoSuccess(res) ),
            err => dispatch( getRepoFailure(err) )
        );
    }
}

// Get repo languages actions

export const getRepoLangRequest = (owner, repo) => {
    return {
        type: types.GET_REPO_LANG_REQUEST,
        payload: {
            owner: owner,
            repo: repo,
            loading: true,
            error: null
        }
    };
}

export const getRepoLangSuccess = (res) => {
    return {
        type: types.GET_REPO_LANG_SUCCESS,
        payload: {
            languages: res,
            loading: false,
            error: null
        }
    };
}

export const getRepoLangFailure = (res) => {
    return {
        type: types.GET_REPO_LANG_FAILURE,
        payload: {
            loading: false,
            error: {
                title: res.detailedStatus,
                desc: res.response.message
            }
        }
    };
}

export const getRepoLang = (owner, repo) => {
    return dispatch => {
        dispatch( getRepoLangRequest(owner, repo) );
        reposService.getRepoLang(owner, repo).do(
            res => dispatch( getRepoLangSuccess(res) ),
            err => dispatch( getRepoLangFailure(err) )
        );
    }
}