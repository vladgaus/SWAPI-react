import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from "../../services/swapi-service";
import DummySwapiService from '../../services/dummy-swapi-service';
import ErrorBoundry from "../error-boundry";
import {SwapiServiceProvider} from "../swapi-service-context";
import {PeoplePage, PlanetsPage, StarShipsPage} from '../pages';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './app.css';
import StarShipDetails from "../sw-components/starhip-detail";

export default class App extends Component {

    state = {
        swapiService: new SwapiService()
    };

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ?
                DummySwapiService:
                SwapiService;
            return {
                swapiService: new Service()
            }
        });
    };

    render() {

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header onServiceChange = {this.onServiceChange} />
                            <RandomPlanet />

                            <Route
                                path = "/"
                                render = {() => <h2>Welcome to StarDB</h2>}
                                exact
                            />
                            <Route path = "/people/:id?" component = {PeoplePage} id = {1} />
                            <Route path = "/planets" component = {PlanetsPage} />
                            <Route path = "/star-ships" component = {StarShipsPage} exact />
                            <Route
                                path = "/star-ships/:id"
                                render = {({match}) => {
                                    const {id} = match.params;
                                    return <StarShipDetails itemId = {id} />;
                                }}
                            />

                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>

        );
    }
}