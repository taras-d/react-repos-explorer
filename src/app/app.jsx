import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import { Search } from '../search';
import { Repo } from '../repo';

import './app.less';

const App = () => {
    return (
        <div className="app">
            <Router>
                <div>
                    <div className="app-header">
                        <Link to="/">GitHub Repos Explorer</Link>
                    </div>
                    <Route path="/" exact component={Search}/>
                    <Route path="/repo/:owner/:repo" component={Repo}/>
                </div>
            </Router>
        </div>
    );
}

export default App;