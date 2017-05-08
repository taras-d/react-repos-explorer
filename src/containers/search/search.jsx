import React from 'react';
import queryString from 'query-string';

import SearchPanel from '../../components/search-panel';
import ReposList from '../../components/repos-list';
import Loader from '../../components/loader';
import Pager from '../../components/pager';
import Dimmer from '../../components/dimmer';

import { reposService } from '../../services';

class Search extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            query: '',
            page: 1,
            repos: [],
            totalCount: 0,
            message: '',
            loading: false,
            prevLink: null,
            nextLink: null
        };

        this.xhr = '';

        this.onQueryChange = this.onQueryChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    render() {

        let { query, repos, totalCount, loading, prevLink, nextLink, message } = this.state;

        return (
            <div className="search">
                <SearchPanel query={query} onQueryChange={this.onQueryChange} onSearch={this.onSearch}/>
                {totalCount > 0 && <div className="total-count">{totalCount} repo(s)</div>}
                <div className="dimmer-limiter">
                    {repos.length > 0 && <ReposList repos={repos}/>}
                    {message && <div className="message" dangerouslySetInnerHTML={{ __html: message }}></div>}
                    {loading && <Dimmer loader/>}
                </div>
                {repos.length > 0 && <Pager prevLink={prevLink} nextLink={nextLink}/>}
            </div>
        );

    }

    componentDidMount() {
        this.searchRepos( this.getSearchParams(this.props) );
    }

    componentWillReceiveProps(nextProps) {
        this.cancelSearch();
        this.searchRepos( this.getSearchParams(nextProps) );
    }

    componentWillUnmount() {
        this.cancelSearch();
    }

    onQueryChange(query) {
        this.setState({ query });
    }

    onSearch() {
        this.props.history.push({ 
            path: '/', 
            search: queryString.stringify({ query: this.state.query }) 
        });
    }

    searchRepos(queryParams) {

        let { page, query } = queryParams;

        page = +page || 1;
        query = (query || '').trim();

        if (!query) {
            this.setState({ loading: false, repos: [], query: '', totalCount: 0,
                message: 'Please set search query to explore public repos<br>For example "react"' });
            return;
        }

        this.setState({ page, query, loading: true });

        this.xhr = reposService.searchRepos(query, page).done(res => {
            this.setState({ 
                repos: res.items,
                totalCount: res.total_count,
                loading: false,
                prevLink: res.prev_page_params? `/?${res.prev_page_params}`: null,
                nextLink: res.next_page_params? `/?${res.next_page_params}`: null,
                message: res.items.length === 0? 'Nothing found': ''
            });
        });
    }

    cancelSearch() {
        if (this.xhr) {
            this.xhr.abort();
            this.xhr = null;
        }
    }

    getSearchParams(props) {
        return queryString.parse(props.location.search);
    }

}

export default Search;