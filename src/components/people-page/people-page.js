import React, {Component} from "react";

import './people-page.css';
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import Row from "../row";

export default class PeoplePage extends Component
{

    swapiService = new SwapiService();

    state = {
        selectedPerson: 11
    };

    onPeronSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    };


    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>;
        }

        const itemList = (
            <ItemList
                onItemSelected = {this.onPeronSelected}
                getData = {this.swapiService.getAllPeople}
                >
                {(i) => (
                    `${i.name} (${i.birthYear})`
                )}
            </ItemList>
        );

        const personDetails = (
            <ErrorBoundry>
                <ItemDetails personId = {this.state.selectedPerson} />
            </ErrorBoundry>
        );

        return(
            <Row left = {itemList} right = {personDetails} />
        );
    }
}

