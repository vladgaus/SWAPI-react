import React, {Component} from "react";
import {StarShipDetails, StarShipList} from "../sw-components";
import Row from "../row";

export default class StarShipsPage extends Component {
    state = {
        selectedItem: 9
    };

    onItemSelected = (selectedItem) => {
        this.setState({
            selectedItem
        });
    };

    render() {

        const {selectedItem} = this.state;

        return (
            <Row
                left={<StarShipList onItemSelected = {this.onItemSelected} />}
                right={<StarShipDetails itemId = {selectedItem} />}
            />
        );
    }
}