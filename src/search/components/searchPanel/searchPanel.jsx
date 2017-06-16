import React from 'react';
import PropTypes from 'prop-types';

import './searchPanel.less';

/**
 * Seach panel
 * 
 * Display query input and search button.
 * Note that component has internal state to control query input.
 * 
 * Component provides 'query' and 'onSearch' properties to allow parent component
 * set query value and react on search submit.
 */

const propTypes = {
    query: PropTypes.string,
    onSearch: PropTypes.func
};

class SearchPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = { query: '' };
    }

    render() {

        let { query } = this.state;

        return (
            <div className="search-panel">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <form onSubmit={e => this.submit(e)} className="input-group">
                            <input type="text" className="form-control" placeholder="Query"
                                value={query} onChange={e => this.queryChange(e)}/>
                            <span className="input-group-btn">
                                <button type="submit" className="btn btn-default">Search</button>
                            </span>
                        </form>
                    </div> 
                </div>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.query !== nextProps.query) {
            this.setState({ query: nextProps.query});
        }
    }

    queryChange(event) {
        this.setState({ query: event.target.value });
    }

    submit(event) {
        event.preventDefault();
        this.props.onSearch(this.state.query);
    }

}

SearchPanel.propTypes = propTypes;

export default SearchPanel;