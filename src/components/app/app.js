import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import ItemList from "../item-list";
import Row from "../row";
import ItemDetails, {Record} from "../item-details";
import {
    PersonList,
    PlanetList,
    StarShipList,
    PersonDetails,
    PlanetDetails,
    StarShipDetails
} from "../sw-components";


export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    componentDidCatch(error, errorInfo) {
        console.log(error);
        console.log(errorInfo);
        this.setState({
            hasError: true
        });
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>;
        }

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;

        const {getPerson, getStarShip, getPersonImage, getStarshipImage} = this.swapiService;

        const personDetails = (
            <ItemDetails
                itemId = {11}
                getData = {getPerson}
                getImageUrl = {getPersonImage}
            >
                <Record field="gender" label="Gender" />
                <Record field="eyeColor" label="Eye Color" />
            </ItemDetails>
        );

        // const StarShipDetails = (
        //     <ItemDetails
        //         itemId = {5}
        //         getData = {getStarShip}
        //         getImageUrl = {getStarshipImage}
        //     >
        //         <Record field="model" label="Model" />
        //         <Record field="length" label="Length" />
        //         <Record field="costInCredits" label="Cost" />
        //     </ItemDetails>
        // );

        return (
            <ErrorBoundry>
                <div className="stardb-app">
                    <Header />

                    <PersonDetails itemId = {11} />
                    <PlanetDetails itemId = {5} />
                    <StarShipDetails itemId = {9} />

                    <PersonList>
                        {({name}) => <span>{name}</span>}
                    </PersonList>

                    <PlanetList>
                        {({name}) => <span>{name}</span>}
                    </PlanetList>

                    <StarShipList>
                        {({name}) => <span>{name}</span>}
                    </StarShipList>

                    {/*<Row left = {personDetails} right = {StarShipDetails} />*/}
                </div>
            </ErrorBoundry>

        );
    }
}