import React from 'react';
import PropTypes from 'prop-types';

import './repoLang.less';

/**
 * Repo languages
 */

const RepoLang = ({ lang }) => {
    
    let rows = [];
    for (let p in lang) {
        rows.push(
            <div className="row" key={p}>
                <div className="col-xs-3">{p}</div>
                <div className="col-xs-9">{lang[p]}</div>
            </div>
        );
    }

    return (
        <div className="repo-lang">{rows}</div>
    );
}

RepoLang.propTypes = {
    lang: PropTypes.object
};

export default RepoLang;