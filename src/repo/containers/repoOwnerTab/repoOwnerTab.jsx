import React from 'react';
import { connect } from 'react-redux';

import RepoOwner from '../../components/repoOwner';

import './repoOwnerTab.less';

/**
 * Repo owner tab container
 */

class RepoOwnerTab extends React.Component {

    render() {

        let { details } = this.props;

        return (
            <div className="repo-owner-tab">
                <RepoOwner owner={details.data.owner}/>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return { details: state.repo.details };
}

export default connect(mapStateToProps)(RepoOwnerTab);