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

            // Prev page parameters
            data.prev = page > 1? 
                utils.stringifyQuery({ page: page - 1, query }): null;

            // Next page parameters
            data.next = page < data.total_count / perPage?
                utils.stringifyQuery({ page: page + 1, query }): null;

            return data;
        });
    }

    getRepo(owner, repo) {
        return ajaxService.get(`${this.rootUrl}/repos/${owner}/${repo}`).map(res => res.response);
    }

    getRepoLang(owner, repo) {
        return ajaxService.get(`${this.rootUrl}/repos/${owner}/${repo}/languages`).map(res => {

            let data = res.response;

            // Get total bytes
            let total = 0;
            for (let p in data) {
                total += data[p];
            }

            // Transform bytes to percents
            let size;
            for (let p in data) {
                size = data[p];
                data[p] = (size * 100 / total).toFixed(1) + '%';
            }

            return data;
        });
    }

}

const reposService = new ReposService();

export { 
    ReposService,
    reposService
};