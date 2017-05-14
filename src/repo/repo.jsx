import React from 'react';
import { connect } from 'react-redux';

import ErrorPanel from '../components/errorPanel';
import Loader from '../components/loader';

import { utils } from '../api';
import * as actions from './repoActions';

import RepoMeta from './repoMeta';
import RepoDetails from './repoDetails';

import './repo.less';

class Repo extends React.Component {

    constructor(props) {
        super(props);

        utils.bindMethod(this, 'historyChange');

        this.unlistenHistory = this.props.history.listen(this.historyChange);
        this.repoSub = null;
    }

    render() {

        let { details, loading, error } = this.props;

        if (loading) {
            return <Loader/>;
        } else if (error) {
            return <ErrorPanel title={error.title} desc={error.desc} />;
        }

        if (!details) {
            details = {};
        }

        return (
            <div className="repo">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <RepoMeta details={details}/>
                        <RepoDetails details={details}/>
                    </div>
                </div>
            </div>
        );
    }

    historyChange(location) {
        // Get repo when url params changed
        if (location.pathname.startsWith('/repo')) {
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

const mapStateToProps = state => state.repo;

export default connect(mapStateToProps)(Repo);