import React from 'react';
import { connect } from 'react-redux';

import { utils } from 'api';
import ErrorPanel from 'lib/errorPanel';
import Loader from 'lib/loader';
import Pager from 'lib/pager';
import Dimmer from 'lib/dimmer';

import SearchPanel from '../../components/searchPanel';
import ReposList from '../../components/reposList';

import * as actions from '../../ducks/search';

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
        let error = this.props.search.error;
        return (
            <div className="search-page">
                {this.renderSearchPanel()}
                {error?
                    this.renderError(error):
                    this.renderResult()
                }
            </div>
        );
    }

    renderSearchPanel() {
        let props = this.props,
            history = props.history,
            query = props.search.query;
        return (
            <SearchPanel 
                query={query} 
                onSearch={ q => history.push( `/?${utils.stringifyQuery({ query: q })}` ) }
            />
        );
    }

    renderError(error) {
        return <ErrorPanel title={error.title} desc={error.desc}/>
    }

    renderResult() {

        let { query, items, totalCount, prev, next, loading } = this.props.search;

        if (!query) {
            return (
                <div className="message">
                    Enter search query to search for public repos<br/>(For example: "react")
                </div>
            );
        }

        if (items.length === 0 && query && !loading) {
            return <div className="message">Nothing found</div>;
        }


        return (
            <div style={{position:'relative'}}>                
                {items.length > 0 &&
                    <div>
                        <div className="total-count">{totalCount} repo(s)</div>
                        <ReposList repos={items}/>
                        {(prev || next) && 
                            <Pager prev={prev?`/?${prev}`: ''} next={next? `/?${next}`: ''}/>}
                    </div>
                }
                {loading && <Dimmer loader/>}
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
        utils.unsub(this.searchSub);
    }

    searchRepos() {

        utils.unsub(this.searchSub);

        let { query, page } = utils.parseQuery(this.props.history.location.search);
        query = query || '';
        page = +page || 1;

        // Dispatch async action
        let { dispatch } = this.props;
        this.searchSub = dispatch( actions.searchAsync(query, page) ).subscribe();
    }

}

const mapStateToProps = (state) => ({ search: state.search });

export default connect(mapStateToProps)(SearchPage);