import React from 'react';
import { connect } from 'react-redux';

import SearchPanel from '../components/search-panel';
import ErrorPanel from '../components/error-panel';
import ReposList from '../components/repos-list';
import Loader from '../components/loader';
import Pager from '../components/pager';
import Dimmer from '../components/dimmer';

import * as actions from './searchActions';

import './search.less';

class Search extends React.Component {

    constructor(props) {

        super(props);

        this.onSearch = this.onSearch.bind(this);
        this.onPrev = this.onPrev.bind(this);
        this.onNext = this.onNext.bind(this);

        this.sub = null;
    }

    render() {

        let { query, page, items, totalCount, prev, next, loading, error } = this.props;

        return (
            <div className="search">
                <SearchPanel onSearch={this.onSearch} />
                {error?
                    <ErrorPanel title={error.title} desc={error.desc}/>:
                    <div>
                        {totalCount > 0 && <div className="total-count">{totalCount} repo(s)</div>}
                        <div className="dimmer-limiter">
                            {items.length > 0 && <ReposList repos={items}/>}
                            {(items.length === 0 && query && !loading) && <div className="message">Nothing found</div>}
                            {!query && 
                                <div className="message">Enter search query to search for public repos<br/>(For example: "react")</div>
                            }
                            {loading && <Dimmer loader/>}
                        </div>
                        {(prev || next) &&
                            <Pager prevDisabled={!prev} nextDisabled={!next} onPrev={this.onPrev} onNext={this.onNext} />
                        }
                    </div>
                }
            </div>
        );
    }

    componentWillUnmount() {
        // Cancel search request on component umount
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    searchRepos(query, page) {

        let { dispatch } = this.props;

        // Cancel previous search request
        if (this.sub) {
            this.sub.unsubscribe();
        }

        this.sub = dispatch( actions.searchReposAsync(query, page) ).subscribe();
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