import { Observable } from 'rxjs/Observable';

import { ajaxService } from './ajaxService';
import { utils } from '/';

class ReposService {

    constructor() {
        this.rootUrl = 'https://api.github.com';
    }

    searchRepos(query, page, perPage = 6) {

        if (!query.trim()) {
            // Return empty result for empty query
            return Observable.of({ items: [], total_count: 0 });
        }

        let params = utils.stringifyQuery({
            q: query, 
            page: page, 
            per_page: perPage 
        });

        return ajaxService.get(`${this.rootUrl}/search/repositories?${params}`).map(res => {

            let data = res.response;

            // Prepare prev page parameters
            data.prev = page > 1? 
                utils.stringifyQuery({ page: page - 1, query }): null;

            // Prepate next page parameters
            data.next = page < data.total_count / perPage?
                utils.stringifyQuery({ page: page + 1, query }): null;

            return data;
        });
    }

    getRepo(owner, repo) {
        return ajaxService.get(`${this.rootUrl}/repos/${owner}/${repo}`).map(res => res.response);
    }

}

const reposService = new ReposService();

export { 
    ReposService,
    reposService
};