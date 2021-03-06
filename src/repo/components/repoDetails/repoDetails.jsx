import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { utils } from 'api';
import './repoDetails.less';

/**
 * Repo details
 */

const propTypes = {
    details: PropTypes.object
};

const RepoDetails = ({ details }) => {

    let stats = [
        { title: 'Language', value: details.language },
        { title: 'Created', value: moment(details.created_at).fromNow() },
        { title: 'Updated', value: moment(details.updated_at).fromNow() },
        { title: 'Pushed', value: moment(details.pushed_at).fromNow() },
        { title: 'Stargazers', value: details.stargazers_count },
        { title: 'Subscribers', value: details.subscribers_count },
        { title: 'Forks', value: details.forks_count },
        { title: 'Open issues', value: details.open_issues_count },
        { title: 'Size', value: utils.getRepoSize(details.size) }
    ];

    stats = stats.map((r, i) => 
        <div className="row" key={i}>
            <div className="col-xs-3">{r.title}</div>
            <div className="col-xs-9">{r.value}</div>
        </div>
    );

    return (
        <div className="repo-details">{stats}</div>
    );

}

RepoDetails.propTypes = propTypes;

export default RepoDetails;