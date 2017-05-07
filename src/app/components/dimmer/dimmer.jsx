import React from 'react';

import Loader from '../loader';

const Dimmer = ({ loader }) => {
    return (
        <div className="dimmer">
            <div className="dimmer-overlay"></div>
            {loader? <Loader/>: null}
        </div>
    );
}

export default Dimmer;