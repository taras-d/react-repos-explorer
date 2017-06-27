import React from 'react';
import { connect } from 'react-redux';

import RepoOwner from '../../components/repoOwner';

import './repoOwnerTab.less';

/**
 * Repo owner tab container
 */

class RepoOwnerTab extends React.Component {

    render() {
        return (
            <div className="repo-owner-tab">
                <RepoOwner owner={this.props.repo.data.owner}/>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({ repo: state.repo.repo });

export default connect(mapStateToProps)(RepoOwnerTab);