import React from 'react';
import { NavLink, withRouter } from 'react-router-dom'

import './repoTabs.less'

const RepoTabs = ({ match }) => {
    return (
        <div className="repo-tabs">
            <ul className="nav nav-tabs">
                <li>
                    <NavLink to={`${match.url}`} exact>Details</NavLink>
                </li>
                <li>
                    <NavLink to={`${match.url}/owner`}>Owner</NavLink>
                </li>
                <li>
                    <NavLink to={`${match.url}/languages`}>Languages</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default withRouter(RepoTabs);