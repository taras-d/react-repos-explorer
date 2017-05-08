import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import SearchPanel from '../../components/search-panel';
import ReposList from '../../components/repos-list';
import Loader from '../../components/loader';
import Pager from '../../components/pager';
import Dimmer from '../../components/dimmer';

import * as actions from '../../actions/search';

class Search extends React.Component {

    render() {

        let { query, items, totalCount, onSearch, loading } = this.props;

        return (
            <div className="search">
                <SearchPanel onSearch={onSearch} />
                {totalCount > 0 && <div className="total-count">{totalCount} repo(s)</div>}
                <div className="dimmer-limiter">
                    {items.length > 0 && <ReposList repos={items}/>}
                    {!query && 
                        <div className="message">
                            Please set search query to explore public repos<br/>For example "react"
                        </div>
                    }
                    {loading && <Dimmer loader/>}
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return state.search;
}

const mapDispatchToProps = (dispatch, state) => {
    return {
        onSearch: query => {
            if (!query || !query.trim()) {
                dispatch( actions.searchRepos('', 1) );
                dispatch( actions.searchReposOk({ items: [] }) );
            } else {
                dispatch( actions.searchReposAsync(query, 1) );
            }
        },
        onPrev: () => {

        },
        onNext: () => {

        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);