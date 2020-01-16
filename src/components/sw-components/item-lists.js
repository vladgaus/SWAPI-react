import React from "react";
import ItemList from "../item-list/item-list";
import withData from "../hoc-helpers/with-data";
import withSwapiService from "../hoc-helpers/with-swapi-service";

const withChildFunction = (Wrapped, fn) => {
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


const PersonList = withSwapiService(
    withData(
        withChildFunction(ItemList, renderName)
    ),
    mapPersonMethodsToProps
);
const PlanetList = withSwapiService(
    withData(
        withChildFunction(ItemList, renderName)
    ),
    mapPlanetMethodsToProps
);
const StarShipList = withSwapiService(
    withData(
        withChildFunction(ItemList, renderModelAndName)
    ),
    mapStarShipsMethodsToProps
);

export{
    PersonList,
    PlanetList,
    StarShipList
}