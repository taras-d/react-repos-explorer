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

        this.unlisten = this.props.history.listen(this.historyChange);
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

    componentDidMount() {
        this.getRepo();
    }

    componentWillUnmount() {
        this.unlisten();
        if (this.repoSub) {
            this.repoSub.unsubscribe();
        }
    }

    historyChange(location) {
        if (location.pathname.startsWith('/repo')) {
            this.getRepo();
        }
    }

    getRepo() {

        let { dispatch } = this.props;
        let { owner, repo } = this.props.match.params;
    
        if (this.repoSub) {
            this.repoSub.unsubscribe();
        }

        this.repoSub = dispatch( actions.getRepoAsync(owner, repo) ).subscribe();
    }

}

const mapStateToProps = state => state.repo;

export default connect(mapStateToProps)(Repo);