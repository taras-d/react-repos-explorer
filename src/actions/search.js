import * as types from '../constants/search-actions';
import { reposService } from '../api';

export const searchRepos = (query, page) => {
    return {
        type: types.SEARCH_REPOS,
        payload: { 
            query, 
            page,
            loading: true 
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
            loading: false
        }
    };
}

export const searchReposFail = (res) => {
    return {
        type: types.SEARCH_REPOS_FAIL,
        payload: {
            loading: false,
            error: res.message
        }
    };
}

export const searchReposAsync = (query, page) => {
    return dispatch => {
        dispatch( searchRepos(query, page) );
        return reposService.searchRepos(query, page).then(
            res => dispatch( searchReposOk(res) ),
            res => dispatch( searchReposFail(res) )
        );
    }
}