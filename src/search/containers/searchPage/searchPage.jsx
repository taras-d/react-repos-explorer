import React from 'react';
import { connect } from 'react-redux';

import { utils } from 'api';
import ErrorPanel from 'lib/errorPanel';
import Loader from 'lib/loader';
import Pager from 'lib/pager';
import Dimmer from 'lib/dimmer';

import SearchPanel from '../../components/searchPanel';
import ReposList from '../../components/reposList';

import * as actions from '../../search';

import './searchPage.less';

/**
 * Search page container
 */

class SearchPage extends React.Component {

    constructor(props) {
        super(props);

        this.unlistenHistory = this.props.history.listen(this.historyChange.bind(this));
        this.searchSub = null;
    }

    render() {

        let { history } = this.props;
        let { query, page, items, totalCount, prev, next, loading, error } = this.props.search;

        let result;

        if (error) {
            result = <ErrorPanel title={error.title} desc={error.desc}/>
        } else {
            result = (
                <div style={{position:'relative'}}>
                    {totalCount > 0 && 
                        <div className="total-count">{totalCount} repo(s)</div>}
                    {items.length > 0 && 
                        <ReposList repos={items}/>}
                    {(items.length === 0 && query && !loading) && 
                        <div className="message">Nothing found</div>}
                    {!query && 
                        <div className="message">
                            Enter search query to search for public repos<br/>(For example: "react")
                        </div>}
                    {loading && 
                        <Dimmer loader/>}
                    {(prev || next) &&
                        <Pager prev={prev?`/?${prev}`: ''} next={next? `/?${next}`: ''}/>}
                </div>
            );
        }

        return (
            <div className="search-page">
                <SearchPanel query={query} onSearch={q => 
                    history.push(`/?${utils.stringifyQuery({ query: q })}`) }/>
                {result}
            </div>
        );
    }

    historyChange(location) {
        // Search repos when query params changed
        if (location.pathname === '/') {
            this.searchRepos();
        }
    }

    componentDidMount() {
        // Search repos when component mounted
        this.searchRepos();
    }

    componentWillUnmount() {
        this.unlistenHistory();
        this.cancelRequest();
    }

    searchRepos() {

        this.cancelRequest();

        let { query, page } = utils.parseQuery(this.props.history.location.search);
        query = query || '';
        page = +page || 1;

        // Dispatch async action
        let { dispatch } = this.props;
        this.searchSub = dispatch( actions.searchRepos(query, page) ).subscribe();
    }

    cancelRequest() {
        if (this.searchSub) {
            this.searchSub.unsubscribe();
        }
    }

}

const mapStateToProps = (state) => {
    return { search: state.search };
}

export default connect(mapStateToProps)(SearchPage);