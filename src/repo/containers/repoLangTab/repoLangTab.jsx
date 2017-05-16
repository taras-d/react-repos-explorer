import React from 'react';
import { connect } from 'react-redux';

import Loader from '../../../components/loader';
import ErrorPanel from '../../../components/errorPanel';

import RepoLang from '../../components/repoLang';

import * as actions from '../../repoActions';

import './repoLangTab.less';

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
            result = <RepoLang langs={data}/>;
        }

        return (
            <div className="repo-lang-tab">
                {result}
            </div>
        );
    }

    componentDidMount() {

        let { dispatch } = this.props,
            { owner, repo } = this.props.details;
            
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
        details: state.repo.details,
        languages: state.repo.languages
    };  
};

export default connect(mapStateToProps)(RepoLangTab);