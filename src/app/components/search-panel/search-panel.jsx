import React from 'react';

const SearchPanel = ({ query, placeholder, onQueryChange, onSearch }) => {

    return (
        <div className="panel panel-default search-panel">
            <div className="panel-body">
                <form onSubmit={e => { e.preventDefault(); onSearch(); }}>
                    <input type="text" className="form-control" placeholder={placeholder}
                        value={query} onChange={e => onQueryChange(e.target.value)}/>
                    <button type="submit" className="btn btn-default">Search</button>
                </form>
            </div> 
        </div>
    );

}

export default SearchPanel;