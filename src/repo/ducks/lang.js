import { reposService } from 'api';

// Actions

const GET_LANG      = 'repo/GET_LANG';
const GET_LANG_OK   = 'repo/GET_LANG_OK';
const GET_LANG_FAIL = 'repo/GET_LANG_FAIL';

// Reducer

const initialState = {
    data: null,
    loading: false,
    error: null
};

export default function reducer(state = initialState, action) {

    switch (action.type) {

        case GET_LANG:
            return Object.assign({}, state, {
                data: null,
                loading: true,
                error: null
            });

        case GET_LANG_OK:
            return Object.assign({}, state, action.payload, {
                loading: false,
                error: null
            });

        case GET_LANG_FAIL:
            return Object.assign({}, state, action.payload, {
                loading: false
            });

        default:
            return state;
    }

}

// Action creators

export const getLang = () => ({ type: GET_LANG });

export const getLangOk = (res) => ({
    type: GET_LANG_OK,
    payload: { data: res }
});

export const getLangFail = (res) => ({
    type: GET_LANG_FAIL,
    payload: {
        error: {
            title: res.detailedStatus,
            desc: res.response.message
        }
    }
});

export const getLangAsync = (owner, repo) => {
    return (dispatch, getState) => {

        // Get owner and repo names from state
        let { ownerName, repoName } = getState().repo.repo;
        
        dispatch( getLang() );
        return reposService.getRepoLang(ownerName, repoName).do(
            res => dispatch( getLangOk(res) ),
            err => dispatch( getLangFail(err) )
        );
    }
}