import React from 'react';
import { connect } from 'react-redux';

import RepoDetails from '../../components/repoDetails';

import './repoDetailsTab.less';

/**
 * Repo details tab container
 */

class RepoDetailsTab extends React.Component {

    render() {
        return (
            <div className="repo-details-tab">
                <RepoDetails details={this.props.repo.data}/>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({ repo: state.repo.repo });

export default connect(mapStateToProps)(RepoDetailsTab);