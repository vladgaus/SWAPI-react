import React from "react";
import {StarShipList} from "../sw-components";
import {withRouter} from 'react-router-dom';

const StarShipsPage = ({history}) => {
    return (
        <StarShipList
            onItemSelected = {(itemId) => history.push(itemId)}
        />
    );
}

export default withRouter(StarShipsPage);