import { reposService } from '../api';
import * as types from './searchActionTypes';

export const searchReposRequest = (query, page) => {
    return {
        type: types.SEARCH_REQUEST,
        payload: { 
            query, 
            page,
            loading: true,
            error: null
        }
    };
}

export const searchReposSuccess = (res) => {
    return {
        type: types.SEARCH_SUCCESS,
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

export const searchReposFailure = (res) => {
    return {
        type: types.SEARCH_FAILURE,
        payload: {
            items: [],
            totalCount: 0,
            prev: null,
            next: null,
            error: {
                title: res.detailedStatus,
                desc: res.response.message
            }
        }
    };
}

export const searchRepos = (query, page) => {
    return dispatch => {
        dispatch( searchReposRequest(query, page) );
        return reposService.searchRepos(query, page).do(
            res => dispatch( searchReposSuccess(res) ),
            res => dispatch( searchReposFailure(res) )
        );
    }
}