import React, { Component } from 'react';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

import './random-planet.css';
import ItemList from "../item-list";


export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    static defaultProps = {
        updateInterval: 100000
    };

    static propTypes = {
        updateInterval: (props, propName, componentName) => {
            const value = props[propName];
            if (typeof value === 'number' && !isNaN(value)) {
                return null;
            }

            return new TypeError(`${componentName}: ${propName} must be a number`);
        }
    };

    state = {
        planet: {},
        loading: true,
        error: false
    };

    onPlanetLoaded = (planet) => {
        this.setState({planet, loading: false});
    };

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        });
    };

    updatePlanet = () => {
        const id = Math.floor(Math.random() * 25) + 3;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    };

    componentDidMount() {
        const {updateInterval} = this.props;
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, updateInterval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        const { planet, loading, error } = this.state;

        const hasData = !(loading || error);
        const spinner = loading? <Spinner/> : null;
        const content = hasData? <PlanetView planet = {planet} /> : null;
        const errorMessage = error? <ErrorIndicator/> : null;

        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const PlanetView = ({planet}) => {

    const { id, name, population, rotationPeriod, diameter} = planet;

    return(
        <React.Fragment>
            <img className="planet-image" src= {`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt = "Random planet" />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
};