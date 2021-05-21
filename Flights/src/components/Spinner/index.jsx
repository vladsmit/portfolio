import React from 'react';
import { Spin } from 'antd';
import './Spinner.scss';

const Spinner = (props) => {
    return (
        <div className="spinner">
            <Spin />
        </div>
    )
}

export default Spinner;