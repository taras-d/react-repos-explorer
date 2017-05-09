import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

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

        return Observable.ajax(`${this.rootUrl}/search/repositories?${params}`).map(res => {
            let data = res.response;
            data.prev = (page > 1);
            data.next = (page < data.total_count / perPage);
            return data;
        });
    }

}

const reposService = new ReposService();

export { reposService };