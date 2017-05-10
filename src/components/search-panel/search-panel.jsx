import React from 'react';
import ProptTypes from 'prop-types';

const SearchPanel = ({ onSearch }) => {

    let input;

    return (
        <div className="search-panel">
            <div className="panel panel-default">
                <div className="panel-body">
                    <form onSubmit={e => { e.preventDefault(); onSearch(input.value); }}>
                        <input type="text" className="form-control" placeholder="Query"
                            ref={i => input = i}/>
                        <button type="submit" className="btn btn-default">Search</button>
                    </form>
                </div> 
            </div>
        </div>
    );

}

SearchPanel.propTypes = {
    onSearch: ProptTypes.func
};

export default SearchPanel;