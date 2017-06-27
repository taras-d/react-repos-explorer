import React from 'react';
import { connect } from 'react-redux';

import { unsub } from 'api/utils';

import Loader from 'lib/loader';
import ErrorPanel from 'lib/errorPanel';

import RepoLang from '../../components/repoLang';

import * as actions from '../../ducks/lang';

import './repoLangTab.less';

/**
 * Repo languages tab container
 */

class RepoLangTab extends React.Component {

    constructor(props) {
        super(props);
        this.getSub = null;
    }

    render() {
    
        let { data, loading, error } = this.props.lang,
            result;

        if (loading) {
            result = <Loader/>;
        } else if (error) {
            result = <ErrorPanel title={error.title} desc={error.desc}/>;
        } else if (data) {
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
        unsub(this.getSub);
    }

    getLang() {
        // Dispatch async action
        unsub(this.getSub);
        this.getSub = this.props.dispatch( actions.getLangAsync() ).subscribe();
    }
    
}

const mapStateToProps = (state, ownProps) => ({ lang: state.repo.lang });  

export default connect(mapStateToProps)(RepoLangTab);