import React from 'react';
import { connect } from 'react-redux';

import Loader from '../../../components/loader';
import ErrorPanel from '../../../components/errorPanel';

import RepoLang from '../../components/repoLang';

import * as actions from '../../repoActions';

import './repoLangTab.less';

/**
 * Repo languages tab container
 */

class RepoLangTab extends React.Component {

    constructor(props) {
        super(props);

        this.langSub = null;
    }

    render() {
    
        let { data, loading, error } = this.props.languages,
            result;

        if (loading) {
            result = <Loader/>;
        } else if (error) {
            result = <ErrorPanel title={error.title} desc={error.desc}/>;
        } else {
            result = <RepoLang lang={data}/>;
        }

        return (
            <div className="repo-lang-tab">{result}</div>
        );
    }

    componentDidMount() {
        this.getLang();
    }
        

    componentWillUnmount() {
        if (this.langSub) {
            this.langSub.unsubscribe();
        }
    }

    getLang() {

        let { dispatch } = this.props,
            { owner, repo } = this.props.details;
            
        // Dispatch async action
        this.langSub = dispatch( actions.getRepoLang(owner, repo) ).subscribe();
    }
    
}

const mapStateToProps = (state, ownProps) => {
    return {
        details: state.repo.details,
        languages: state.repo.languages
    };  
};

export default connect(mapStateToProps)(RepoLangTab);