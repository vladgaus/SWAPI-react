import React from "react";
import ItemList from "../item-list/item-list";
import withData from "../hoc-helpers/with-data";
import withSwapiService from "../hoc-helpers/with-swapi-service";

const withChildFunction = (fn) => (Wrapped) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        )
    }
};

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


const PersonList = withSwapiService(mapPersonMethodsToProps)(
    withData(
        withChildFunction(renderName)(
            ItemList)));

const PlanetList = withSwapiService(mapPlanetMethodsToProps)(
    withData(
        withChildFunction(renderName)(
            ItemList)));

const StarShipList = withSwapiService(mapStarShipsMethodsToProps)(
    withData(
        withChildFunction(renderModelAndName)(
            ItemList)));

export{
    PersonList,
    PlanetList,
    StarShipList
}