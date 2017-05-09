import React from 'react';

const ErrorPanel = ({ title, desc }) => {
    return (
        <div className="error-panel">
            <div className="panel panel-default">
                <div className="panel-body">
                    <h4>{title}</h4>
                    <p>{desc}</p>
                </div>
            </div>
        </div>
    );
}

export default ErrorPanel;