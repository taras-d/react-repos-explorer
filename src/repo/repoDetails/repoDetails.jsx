import React from 'react';

import './repoDetails.less';

const RepoDetails = ({ details }) => {

    let rows = [
        { title: 'Language', value: details.language },
        { title: 'Watchers', value: details.watchers_count },
        { title: 'Stargazers', value: details.stargazers_count },
        { title: 'Forks', value: details.forks_count }
    ];

    rows = rows.map((r, i) => 
        <div className="row" key={i}>
            <div className="col-sm-3"><label>{r.title}</label></div>
            <div className="col-sm-9">{r.value}</div>
        </div>
    );

    return (
        <div className="repo-details">
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="repo-full-name">
                        <a href={details.html_url} target="_blank">{details.full_name}</a>
                    </div>
                    <div className="repo-description">{details.description}</div>
                    {rows}
                </div>
            </div>
        </div>
    );

}

export default RepoDetails;