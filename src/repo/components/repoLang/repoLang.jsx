import React from 'react';

import './repoLang.less';

const RepoLang = ({ langs }) => {
    
    let rows = [];
    for (let p in langs) {
        rows.push(
            <div className="row" key={p}>
                <div className="col-xs-3">{p}</div>
                <div className="col-xs-9">{langs[p]}</div>
            </div>
        );
    }

    return (
        <div className="repo-lang">
            {rows}
        </div>
    );

}

export default RepoLang;