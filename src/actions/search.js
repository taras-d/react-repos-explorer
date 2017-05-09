import * as types from '../constants/search-actions';
import { reposService } from '../api';

export const searchRepos = (query, page) => {
    return {
        type: types.SEARCH_REPOS,
        payload: { 
            query, 
            page,
            loading: true,
            error: null
        }
    };
}

export const searchReposOk = (res) => {
    return {
        type: types.SEARCH_REPOS_OK,
        payload: {
            items: res.items,
            totalCount: res.total_count,
            prev: res.prev,
            next: res.next,
            loading: false,
            error: null
        }
    };
}

export const searchReposFail = (res) => {
    let xhr = res.xhr;
    return {
        type: types.SEARCH_REPOS_FAIL,
        payload: {
            items: [],
            totalCount: 0,
            prev: false,
            next: false,
            loading: false,
            error: {
                title: `${xhr.status} ${xhr.statusText}`,
                desc: xhr.response.message
            }
        }
    };
}

export const searchReposAsync = (query, page) => {
    return dispatch => {
        dispatch( searchRepos(query, page) );
        return reposService.searchRepos(query, page).do(
            res => dispatch( searchReposOk(res) ),
            res => dispatch( searchReposFail(res) )
        );
    }
}