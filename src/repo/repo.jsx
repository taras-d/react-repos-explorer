import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import ErrorPanel from '../components/errorPanel';
import Loader from '../components/loader';

import { utils } from '../api';
import * as actions from './repoActions';

import RepoDetails from './repoDetails';
import RepoLang from './repoLang';
import RepoMeta from './repoMeta';
import RepoOwner from './repoOwner';
import RepoTabs from './repoTabs';

import './repo.less';

class Repo extends React.Component {

    constructor(props) {
        super(props);

        utils.bindMethod(this, 'historyChange');

        this.unlistenHistory = this.props.history.listen(this.historyChange);
        this.repoSub = null;
    }

    render() {

        let { details, loading, error, match } = this.props;

        if (loading) {
            return <Loader/>;
        } else if (error) {
            return <ErrorPanel title={error.title} desc={error.desc} />;
        }

        if (!details) {
            return null;
        }

        return (
            <div className="repo">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <RepoMeta details={details}/>
                        <RepoTabs/>
                        <Route path={`${match.url}`} exact 
                            render={() => <RepoDetails details={details}/>}/>
                        <Route path={`${match.url}/owner`} 
                            render={() => <RepoOwner owner={details.owner}/>}/>
                        <Route path={`${match.url}/languages`} 
                            render={() => <RepoLang/> }/>
                    </div>
                </div>
            </div>
        );
    }

    historyChange(location) {
        // Get repo when url params changed
        let { owner, repo, match } = this.props;
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

        this.repoSub = dispatch( actions.getRepo(owner, repo) ).subscribe();
    }

    cancelRequest() {
        if (this.repoSub) {
            this.repoSub.unsubscribe();
        }
    }

}

const mapStateToProps = state => state.repo.details;

export default connect(mapStateToProps)(Repo);