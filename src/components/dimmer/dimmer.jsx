import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../loader';

import './dimmer.less';

/**
 * Dimmer
 * 
 * Displays white transparent overlay.
 * Dimmer size depends on nearest positioned parent.
 */

const propTypes = {
    loader: PropTypes.bool
};

const Dimmer = ({ loader }) => {
    return (
        <div className="dimmer">
            <div className="dimmer-overlay"></div>
            {loader? <Loader/>: null}
        </div>
    );
}

Dimmer.propTypes = propTypes;

export default Dimmer;