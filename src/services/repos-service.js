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

        return $.get(`${this.rootUrl}/search/repositories?${params}`).done(res => {
            if (page > 1) {
                res.prev_page_params = queryString.stringify({ query, page: page - 1 });
            }
            if (page < res.total_count / perPage) {
                res.next_page_params = queryString.stringify({ query, page: page + 1 });
            }
        });
    }

}

const reposService = new ReposService();

export { reposService };