import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import './app.less';

import Search from './routes/search';
import Detail from './routes/detail';

const App = () => {
    return (
        <div className="app">
            <Router>
                <div>
                    <div className="app-header">GitHub Repos Explorer</div>
                    <Route path="/" exact component={Search}/>
                    <Route path="/detail/:owner/:repo" component={Detail}/>
                </div>
            </Router>
        </div>
    );
}

export default App;