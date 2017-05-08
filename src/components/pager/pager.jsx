import React from 'react';
import { Link } from 'react-router-dom';

const Pager = ({ prevLink, nextLink }) => {
    return (
        <ul className="pager">
            <li className={!prevLink? 'disabled': ''}>
                <Link to={prevLink || ''} onClick={e => !prevLink && e.preventDefault()}>
                    Previous
                </Link>
            </li>&nbsp;
            <li className={!nextLink? 'disabled': ''}>
                <Link to={nextLink || ''} onClick={e => !nextLink && e.preventDefault()}>
                    Next
                </Link>
            </li>
        </ul>
    );
}

export default Pager;