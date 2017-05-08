import React from 'react';
import { Link } from 'react-router-dom';

const ReposList = ({ repos }) => {

    let result = repos.map(repo => 
        <div className="list-group-item" key={repo.id}>
            <div className="repo-stars">
                <span className="repo-stars-number">{repo.stargazers_count}</span>
                <span className="glyphicon glyphicon-star"></span>
            </div>
            <h4 className="list-group-item-heading">
                <Link to={`/detail/${repo.owner.login}/${repo.name}`}>{repo.full_name}</Link>
            </h4>
            <p className="list-group-item-text">{repo.description}</p>
        </div>
    );
    
    return (
        <div className="repos-list">
            <div className="list-group">{result}</div>
        </div>
    );

}

export default ReposList;