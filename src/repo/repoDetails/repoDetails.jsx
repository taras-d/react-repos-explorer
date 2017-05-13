import React from 'react';
import moment from 'moment';

import './repoDetails.less';

const RepoDetails = ({ details }) => {

    let stats = [
        { title: 'Language', value: details.language },
        { title: 'Created', value: moment(details.created_at).fromNow() },
        { title: 'Updated', value: moment(details.updated_at).fromNow() },
        { title: 'Stargazers', value: details.stargazers_count },
        { title: 'Subscribers', value: details.subscribers_count },
        { title: 'Forks', value: details.forks_count },
        { title: 'Open issues', value: details.open_issues_count }
    ];

    stats = stats.map((r, i) => 
        <div className="row" key={i}>
            <div className="col-sm-3">{r.title}</div>
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
                    <div className="repo-stats">{stats}</div>
                </div>
            </div>
        </div>
    );

}

export default RepoDetails;