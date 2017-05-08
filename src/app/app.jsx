import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Search from '../containers/search';
import Detail from '../containers/detail';

const App = () => {
    return (
        <div className="app">
            <Router>
                <div>
                    <div className="app-header">
                        <Link to="/">GitHub Repos Explorer</Link>
                    </div>
                    <Route path="/" exact component={Search}/>
                    <Route path="/detail/:owner/:repo" component={Detail}/>
                </div>
            </Router>
        </div>
    );
}

export default App;