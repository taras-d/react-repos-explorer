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

    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.onPrev = this.onPrev.bind(this);
        this.onNext = this.onNext.bind(this);
    }

    render() {

        let { query, page, items, totalCount, prev, next, loading } = this.props;

        return (
            <div className="search">
                <SearchPanel onSearch={this.onSearch} />
                {totalCount > 0 && <div className="total-count">{totalCount} repo(s)</div>}
                <div className="dimmer-limiter">
                    {items.length > 0 && <ReposList repos={items}/>}
                    {(items.length === 0 && query && !loading) && <div className="message">Nothing found</div>}
                    {!query && 
                        <div className="message">
                            Enter search query to search for public repos<br/>(For example: "react")
                        </div>
                    }
                    {loading && <Dimmer loader/>}
                </div>
                {items.length > 0 &&
                    <Pager prevDisabled={!prev} nextDisabled={!next}
                        onPrev={this.onPrev} onNext={this.onNext} />
                }
            </div>
        );
    }

    searchRepos(query, page) {
        let { dispatch } = this.props;
        dispatch( actions.searchReposAsync(query, page) );
    }

    onSearch(query) {
        let { dispatch } = this.props;
        if (!query || !query.trim()) {
            // Query empty - dispatch empty result
            dispatch( actions.searchRepos('', 1) );
            dispatch( actions.searchReposOk({ items: [], total_count: 0 }) );
        } else {
            this.searchRepos(query, 1);
        }
    }

    onPrev() {
        let { query, page } = this.props;
        this.searchRepos(query, page - 1);
    }

    onNext() {
        let { query, page } = this.props;
        this.searchRepos(query, page + 1);
    }

}

const mapStateToProps = (state) => state.search;

export default connect(mapStateToProps)(Search);