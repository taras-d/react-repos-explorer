import React from 'react';
import PropTypes from 'prop-types';

import './errorPanel.less';

/**
 * Error panel
 * Displays error title and description.
 */

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

ErrorPanel.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string
};

export default ErrorPanel;