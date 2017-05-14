import React from 'react';

import './repoMeta.less';

const RepoMeta = ({ details }) => {
    return (
        <div className="repo-meta">
            <div className="repo-full-name">
                <a href={details.html_url} >{details.full_name}</a>    
            </div>
            <div className="repo-description">{details.description}</div>
        </div>
    );
}

export default RepoMeta;