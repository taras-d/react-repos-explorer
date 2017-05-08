import React from 'react';

const Pager = ({ prevDisabled, onPrev, nextDisabled, onNext }) => {
    return (
        <ul className="pager">
            <li className={prevDisabled? 'disabled': ''}>
                <a onClick={e => !prevDisabled && onPrev()}>Previous</a>
            </li>&nbsp;
            <li className={nextDisabled? 'disabled': ''}>
                <a onClick={e => !nextDisabled && onNext()}>Next</a>
            </li>
        </ul>
    );
}

export default Pager;