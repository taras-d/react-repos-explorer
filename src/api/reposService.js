import queryString from 'query-string';

import { ajaxService } from './ajaxService';

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

        return ajaxService.get(`${this.rootUrl}/search/repositories?${params}`).map(res => {
            let data = res.response;
            data.prev = (page > 1);
            data.next = (page < data.total_count / perPage);
            return data;
        });
    }

}

const reposService = new ReposService();

export { 
    ReposService,
    reposService
};