import React from 'react';

import './row.css';
import PropTypes from "prop-types";
import ItemList from "../item-list";

const Row = ({ left, right }) => {
    return (
        <div className="row mb2">
            <div className="col-md-6">
                {left}
            </div>
            <div className="col-md-6">
                {right}
            </div>
        </div>
    );
};

ItemList.propTypes = {
    left: PropTypes.node,
    right: PropTypes.node
}

export default Row;