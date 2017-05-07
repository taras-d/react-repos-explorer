import React from 'react';

import SearchPanel from '../../components/search-panel';
import ReposList from '../../components/repos-list';
import Loader from '../../components/loader';

class Search extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            query: '',
            repos: [{
                id: 1,
                stargazers_count: 123,
                name: 'repo1',
                full_name: 'user1/repo1',
                owner: { login: 'user1' },
                description: 'Repo desc'
            }]
        };

        this.onQueryChange = this.onQueryChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    render() {

        let { query, repos } = this.state;

        return (
            <div>
                <div className="route-header">Repos search</div>
                <SearchPanel query={query} onQueryChange={this.onQueryChange} onSearch={this.onSearch}/>
                <ReposList repos={repos}/>
                <Loader/>
            </div>
        );

    }

    onQueryChange(query) {
        this.setState({ query });
    }

    onSearch() {
        console.log(this.state.query);
    }

}

export default Search;