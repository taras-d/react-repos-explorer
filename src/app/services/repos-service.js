import $ from 'jquery';
import queryString from 'query-string';

class ReposService {

    constructor() {
        this.rootUrl = 'https://api.github.com';
    }

    searchRepos(query, page, perPage = 6) {

        // Query cannot be empty
        if (!query || !query.trim()) {
            query = 'react';
        }

        let params = queryString.stringify({ 
            q: query, 
            page, 
            per_page: perPage 
        });

        return $.get(`${this.rootUrl}/search/repositories?${params}`);
    }

}

const reposService = new ReposService();

export { reposService };