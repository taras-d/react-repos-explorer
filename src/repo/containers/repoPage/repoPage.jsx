import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { unsub } from 'api/utils';

import ErrorPanel from 'lib/errorPanel';
import Loader from 'lib/loader';

import * as actions from '../../ducks/repo';

import RepoMeta from '../../components/repoMeta';
import RepoTabs from '../../components/repoTabs';

import RepoDetailsTab from '../../containers/repoDetailsTab';
import RepoLangTab from '../../containers/repoLangTab';
import RepoOwnerTab from '../../containers/repoOwnerTab';

import './repoPage.less';

/**
 * Repo page container
 */

class RepoPage extends React.Component {

    constructor(props) {
        super(props);

        this.unlistenHistory = this.props.history.listen(this.historyChange.bind(this));
        this.getSub = null;
    }

    render() {
        return (
            <div className="repo-page">
                <div className="panel panel-default">
                    <div className="panel-body">
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }

    renderContent() {

        let { match } = this.props,
            { data, loading, error } = this.props.repo,
            result = null;

        if (loading) {
            return <Loader/>;
        } else if (error) {
            return <ErrorPanel title={error.title} desc={error.desc} />;
        } else if (data) {
            return (
                <div>
                    <RepoMeta details={data}/>
                    <RepoTabs/>
                    <Route path={`${match.url}`} exact component={RepoDetailsTab}/>
                    <Route path={`${match.url}/owner`} component={RepoOwnerTab}/>
                    <Route path={`${match.url}/languages`} component={RepoLangTab}/>
                </div>
            );
        }

        return null;
    }

    historyChange(location) {
        // Get repo when url params changed
        let { match, repo } = this.props;
        if (
            location.pathname.startsWith('/repo') &&
            (repo.ownerName !== match.params.owner || repo.repoName !== match.params.repo) 
        ) {
            this.getRepo();
        }
    }

    componentDidMount() {
        // Get repo when component mounted
        this.getRepo();
    }

    componentWillUnmount() {
        this.unlistenHistory();
        unsub(this.getSub);
    }

    getRepo() {

        unsub(this.getSub);

        // Dispatch async action
        let { dispatch, match } = this.props;
        this.getSub = dispatch( 
            actions.getRepoAsync(match.params.owner, match.params.repo) 
        ).subscribe();
    }

}

const mapStateToProps = state => ({ repo: state.repo.repo });

export default connect(mapStateToProps)(RepoPage);