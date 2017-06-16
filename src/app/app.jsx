import React from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { SearchPage } from '../search';
import { RepoPage } from '../repo';

import './app.less';

const App = () => {
    return (
        <div className="app">
            <Router>
                <div>
                    <div className="app-header">
                        <Link to="/">GitHub Repos Explorer</Link>
                    </div>
                    <Switch>
                        <Route path="/" exact component={SearchPage}/>
                        <Route path="/repo/:owner/:repo" component={RepoPage}/>
                        <Route render={e => <div className="app-404">Page Not Found</div>}/>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;