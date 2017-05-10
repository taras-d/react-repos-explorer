import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../loader';

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