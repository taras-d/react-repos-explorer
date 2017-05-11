import React from 'react';
import { connect } from 'react-redux';

import ErrorPanel from '../components/errorPanel';
import Loader from '../components/loader';

import { utils } from '../api';
import * as actions from './repoActions';

class Repo extends React.Component {

    constructor(props) {
        super(props);

        utils.bindMethod(this, 'historyChange');

        this.unlistenHistory = this.props.history.listen(this.historyChange);
        this.repoSub = null;
    }

    render() {

        let { details, loading, error } = this.props;

        let result;

        if (error) {
            result = <ErrorPanel title={error.title} desc={error.desc} />
        } else {
            result = (
                <div>
                    {loading? <Loader/>: <pre>{JSON.stringify(details, null, 2)}</pre>}
                </div>
            );
        }

        return (
            <div className="repo">
                {result}
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

        this.repoSub = dispatch( actions.getRepoAsync(owner, repo) ).subscribe();
    }

    cancelRequest() {
        if (this.repoSub) {
            this.repoSub.unsubscribe();
        }
    }

}

const mapStateToProps = state => state.repo;

export default connect(mapStateToProps)(Repo);