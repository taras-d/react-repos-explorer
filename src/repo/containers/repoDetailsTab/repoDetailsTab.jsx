import React from 'react';
import { connect } from 'react-redux';

import RepoDetails from '../../components/repoDetails';

import './repoDetailsTab.less';

/**
 * Repo details tab container
 */

class RepoDetailsTab extends React.Component {

    render() {

        let { details } = this.props;

        return (
            <div className="repo-details-tab">
                <RepoDetails details={details.data}/>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return { details: state.repo.details };
}

export default connect(mapStateToProps)(RepoDetailsTab);