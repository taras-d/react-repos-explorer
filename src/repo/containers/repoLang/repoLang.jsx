import React from 'react';
import { connect } from 'react-redux';

import Loader from '../../../components/loader';
import ErrorPanel from '../../../components/errorPanel';

import * as actions from '../../repoActions';

import './repoLang.less';

class RepoLang extends React.Component {

    constructor(props) {
        super(props);

        this.langSub = null;
    }

    render() {
    
        let { data, loading, error } = this.props.languages;

        if (loading) {
            return <Loader/>;
        } else if (error) {
            return <ErrorPanel title={error.title} desc={error.desc}/>;
        }

        let langs = [];
        for (let p in data) {
            langs.push(
                <div className="row" key={p}>
                    <div className="col-xs-3">{p}</div>
                    <div className="col-xs-9">{data[p]}</div>
                </div>
            );
        }

        return (
            <div className="repo-lang">{langs}</div>
        );
    }

    componentDidMount() {
        let { dispatch, owner, repo } = this.props;
        this.langSub = dispatch( actions.getRepoLang(owner, repo) ).subscribe();
    }

    componentWillUnmount() {
        if (this.langSub) {
            this.langSub.unsubscribe();
        }
    }
    
}

const mapStateToProps = (state, ownProps) => {
    return {
        owner: ownProps.owner,
        repo: ownProps.repo,
        languages: state.repo.languages
    };  
};

export default connect(mapStateToProps)(RepoLang);