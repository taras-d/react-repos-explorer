import React from 'react';

import './repoOwner.less';

const RepoOwner = ({ owner }) => {
    return (
        <div className="repo-owner">
            <div className="media">
                <div className="media-left media-middle">
                    <a href={owner.html_url} target="_blank">
                        <img className="media-object" src={owner.avatar_url} alt={owner.login}/>
                    </a>
                </div>
                <div className="media-body media-middle">
                    <h4 className="media-heading">
                        <a href={owner.html_url} target="_blank">{owner.login}</a>
                    </h4>
                </div>
            </div>
        </div>
    );
}

export default RepoOwner;