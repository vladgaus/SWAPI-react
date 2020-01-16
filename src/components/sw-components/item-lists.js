import React from "react";
import ItemList from "../item-list/item-list";
import withData from "../hoc-helpers/with-data";
import withSwapiService from "../hoc-helpers/with-swapi-service";
import {compose, withChildFunction} from '../hoc-helpers';

const renderName = ({name}) => <span>{name}</span>;
const renderModelAndName = ({model, name}) => <span>{name} ({model})</span>;

const mapPersonMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    };
};
const mapPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    };
};
const mapStarShipsMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarShips
    };
};


const PersonList = compose(
    withSwapiService(mapPersonMethodsToProps),
    withData,
    withChildFunction(renderName)
)(ItemList);

const PlanetList = compose(
    withSwapiService(mapPlanetMethodsToProps),
    withData,
    withChildFunction(renderName)
)(ItemList);

const StarShipList = compose(
    withSwapiService(mapStarShipsMethodsToProps),
    withData,
    withChildFunction(renderModelAndName)
)(ItemList);

export{
    PersonList,
    PlanetList,
    StarShipList
}