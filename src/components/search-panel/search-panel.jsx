import React from 'react';

const SearchPanel = ({ query, placeholder, onQueryChange, onSearch }) => {

    return (
        <div className="search-panel">
            <div className="panel panel-default">
                <div className="panel-body">
                    <form onSubmit={e => { e.preventDefault(); onSearch(); }}>
                        <input type="text" className="form-control" placeholder={placeholder || 'Query'}
                            value={query} onChange={e => onQueryChange(e.target.value)}/>
                        <button type="submit" className="btn btn-default">Search</button>
                    </form>
                </div> 
            </div>
        </div>
    );

}

export default SearchPanel;