import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import ErrorPanel from '../../../components/errorPanel';
import Loader from '../../../components/loader';

import * as actions from '../../repoActions';

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
        this.repoSub = null;
    }

    render() {

        let { match } = this.props,
            { owner, repo, data, loading, error } = this.props.details,
            result = null;

        if (loading) {
            result = <Loader/>;
        } else if (error) {
            result = <ErrorPanel title={error.title} desc={error.desc} />;
        } else if (data) {
            result = (
                <div className="panel panel-default">
                    <div className="panel-body">
                        <RepoMeta details={data}/>
                        <RepoTabs/>
                        <Route path={`${match.url}`} exact component={RepoDetailsTab}/>
                        <Route path={`${match.url}/owner`} component={RepoOwnerTab}/>
                        <Route path={`${match.url}/languages`} component={RepoLangTab}/>
                    </div>
                </div>
            );
        }

        return (
            <div className="repo-page">{result}</div>
        );
    }

    historyChange(location) {

        // Get repo when url params changed

        let { match } = this.props,
            { owner, repo } = this.props.details;

        if (location.pathname.startsWith('/repo') &&
            (owner !== match.params.owner || repo !== match.params.repo) ) {
            this.getRepo();
        }
    }

    componentDidMount() {
        // Get repo when component mounted
        this.getRepo();
    }

    componentWillUnmount() {
        this.unlistenHistory();
        this.cancelRequest();
    }

    getRepo() {

        let { dispatch } = this.props;
        let { owner, repo } = this.props.match.params;
    
        this.cancelRequest();

        // Dispatch async action
        this.repoSub = dispatch( actions.getRepo(owner, repo) ).subscribe();
    }

    cancelRequest() {
        if (this.repoSub) {
            this.repoSub.unsubscribe();
        }
    }

}

const mapStateToProps = state => {
    return { details: state.repo.details };
}

export default connect(mapStateToProps)(RepoPage);