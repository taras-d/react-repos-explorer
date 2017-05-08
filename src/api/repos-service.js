import $ from 'jquery';
import queryString from 'query-string';

class ReposService {

    constructor() {
        this.rootUrl = 'https://api.github.com';
    }

    searchRepos(query, page, perPage = 6) {

        let params = queryString.stringify({ 
            q: query, 
            page: page, 
            per_page: perPage 
        });

        return $.get(`${this.rootUrl}/search/repositories?${params}`);
    }

}

const reposService = new ReposService();

export { reposService };