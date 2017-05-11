import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../loader';

import './dimmer.less';

/**
 * Dimmer
 * 
 * Displays white transparent overlay.
 * Note that dimmer size depends on size of nearest positioned parent.
 */

const Dimmer = ({ loader }) => {
    return (
        <div className="dimmer">
            <div className="dimmer-overlay"></div>
            {loader? <Loader/>: null}
        </div>
    );
}

Dimmer.propTypes = {
    loader: PropTypes.bool
};

export default Dimmer;