import React from 'react';
import PropTypes from 'prop-types';

import './repoMeta.less';

/**
 * Repo meta
 * Displays repo full name and description.
 */

const propTypes = {
    details: PropTypes.object
};

const RepoMeta = ({ details }) => {
    return (
        <div className="repo-meta">
            <div className="repo-full-name">
                <a href={details.html_url} target="_blank">{details.full_name}</a>    
            </div>
            <div className="repo-description">{details.description}</div>
        </div>
    );
}

RepoMeta.propTypes = propTypes;

export default RepoMeta;