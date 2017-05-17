import React from 'react';

import './loader.less';

/**
 * Loader
 * Displays infinite loading indicator.
 */

const Loader = () => {
    return (
        <div className="loader">
            <div className="loader-indicator"></div>
        </div>
    );
}

export default Loader;