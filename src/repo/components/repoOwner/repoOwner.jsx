import React from 'react';
import PropTypes from 'prop-types';

import './repoOwner.less';

const propTypes = {
    owner: PropTypes.object
};

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

RepoOwner.propTypes = propTypes;

export default RepoOwner;