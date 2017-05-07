import $ from 'jquery';

class ReposService {

    searchRepos(page, query) {

        // Query cannot be empty
        if (!query || !query.trim()) {
            query = 'react';
        }

        return $.get(`https://api.github.com/search/repositories?per_page=5&page=${page}&q=${query}`);
    }

}

const reposService = new ReposService();

export { reposService };