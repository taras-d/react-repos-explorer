import React from 'react';
import { connect } from 'react-redux';

import { utils } from '../api';
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

        utils.bindMethod(this, 'historyChange');

        this.unlistenHistory = this.props.history.listen(this.historyChange);
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
                        <div className="message">Enter search query to search for public repos<br/>(For example: "react")</div>}
                    {loading && 
                        <Dimmer loader/>}
                    {(prev || next) &&
                        <Pager prev={prev?`/?${prev}`: ''} next={next? `/?${next}`: ''}/>}
                </div>
            );
        }

        return (
            <div className="search">
                <SearchPanel onSearch={q => 
                    history.push(`/?${utils.stringifyQuery({ query: q })}`) }/>
                {result}
            </div>
        );
    }

    historyChange() {
        this.searchRepos();
    }

    componentDidMount() {
        this.searchRepos();
    }

    componentWillUnmount() {
        this.unlistenHistory();
        if (this.searchSub) {
            this.searchSub.unsubscribe();
        }
    }

    searchRepos() {

        if (this.searchSub) {
            this.searchSub.unsubscribe();
        }

        let { query, page } = utils.parseQuery(this.props.history.location.search);
        page = +page || 1;

        let { dispatch } = this.props;

        if (!query || !query.trim()) {
            dispatch( actions.searchRepos('', 1) );
            dispatch( actions.searchReposOk({ items: [], total_count: 0 }) );
        } else {
            this.searchSub = dispatch( 
                actions.searchReposAsync(query, page) ).subscribe();
        }
    }

}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Search);