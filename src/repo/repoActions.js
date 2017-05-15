import * as types from './repoActionTypes';
import { reposService } from '../api';

// Repo actions

export const getRepoRequest = (owner, repo) => {
    return {
        type: types.GET_REPO_REQUEST,
        payload: {
            owner,
            repo,
            data: null,
            loading: true,
            error: null
        }
    };
}

export const getRepoSuccess = (res) => {
    return {
        type: types.GET_REPO_SUCCESS,
        payload: {
            data: res,
            loading: false,
            error: null
        }
    };
}

export const getRepoFailure = (res) => {
    return {
        type: types.GET_REPO_FAILURE,
        payload: {
            data: null,
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

// Repo languages actions

export const getRepoLangRequest = () => {
    return {
        type: types.GET_REPO_LANG_REQUEST,
        payload: {
            loading: true,
            error: null
        }
    };
}

export const getRepoLangSuccess = (res) => {
    return {
        type: types.GET_REPO_LANG_SUCCESS,
        payload: {
            data: res,
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
        dispatch( getRepoLangRequest() );
        return reposService.getRepoLang(owner, repo).do(
            res => dispatch( getRepoLangSuccess(res) ),
            err => dispatch( getRepoLangFailure(err) )
        );
    }
}