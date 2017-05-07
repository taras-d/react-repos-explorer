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
            page: null,
            repos: [],
            initialLoading: true,
            loading: false
        };

        this.onQueryChange = this.onQueryChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    render() {

        let { repos, query, page, initialLoading, loading } = this.state;

        return (
            <div className="search">
                {initialLoading?
                    <Loader/>:
                    <div>
                        <SearchPanel query={query} onQueryChange={this.onQueryChange} onSearch={this.onSearch}/>
                        <div className="dimmer-limiter">
                            {repos.length > 0? 
                                <ReposList repos={repos}/>:
                                <div className="no-repos">No repos found</div>
                            }
                            {loading? <Dimmer loader/>: null}
                        </div>
                        {repos.length > 0? <Pager/>: null}
                    </div>
                }
            </div>
        );

    }

    componentDidMount() {
        this.searchRepos( this.getSearchParams(this.props) );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loading: true });
        this.searchRepos( this.getSearchParams(nextProps) );
    }

    onQueryChange(query) {
        this.setState({ query });
    }

    onSearch() {
        let query = (this.state.query || '');
        this.props.history.push({ path: '/', search: `query=${query}` });
    }

    searchRepos(queryParams) {

        let { page, query } = queryParams;

        page = +page || 1;
        query = query || '';

        this.setState({ page, query });

        reposService.searchRepos(page, query).done(res => {
            this.setState({ 
                repos: res.items, 
                initialLoading: false,
                loading: false
            });
        });
    }

    getSearchParams(props) {
        return queryString.parse(props.location.search);
    }

}

export default Search;