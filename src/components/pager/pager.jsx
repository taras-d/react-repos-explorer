import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './pager.less';

/**
 * Pager
 * 
 * Displays links to the previous and next pages
 */

const Pager = ({ prev, next }) => {
    return (
        <ul className="pager">
            <li className={!prev? 'disabled': ''}>
                <Link to={prev} onClick={e => !prev && e.preventDefault()}>Previous</Link>
            </li>&nbsp;
            <li className={!next? 'disabled': ''}>
                <Link to={next} onClick={e => !next && e.preventDefault()}>Next</Link>
            </li>
        </ul>
    );
}

Pager.propTypes = {
    prev: PropTypes.string,
    next: PropTypes.string
};

export default Pager;