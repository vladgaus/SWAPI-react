import React from "react";
import ItemList from "../item-list/item-list";
import withData from "../hoc-helpers/with-data";
import SwapiService from "../../services/swapi-service";

const swapiService = new SwapiService();
const {
    getAllPeople,
    getAllStarShips,
    getAllPlanets
} = swapiService;

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

const PersonList = withData(
    withChildFunction(ItemList, renderName),
    getAllPeople
);
const PlanetList = withData(
    withChildFunction(ItemList, renderName),
    getAllPlanets
);
const StarShipList = withData(
    withChildFunction(ItemList, renderModelAndName),
    getAllStarShips
);

export{
    PersonList,
    PlanetList,
    StarShipList
}