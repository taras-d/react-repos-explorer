import React from 'react';
import { connect } from 'react-redux';

import Loader from 'lib/loader';
import ErrorPanel from 'lib/errorPanel';

import RepoLang from '../../components/repoLang';

import * as actions from '../../languages';

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

        let { dispatch } = this.props;
            
        // Dispatch async action
        this.langSub = dispatch( actions.getRepoLang() ).subscribe();
    }
    
}

const mapStateToProps = (state, ownProps) => {
    return {
        languages: state.repo.languages
    };  
};

export default connect(mapStateToProps)(RepoLangTab);