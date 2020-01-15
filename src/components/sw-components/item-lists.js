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

const PersonList = withData(ItemList, getAllPeople);
const PlanetList = withData(ItemList, getAllPlanets);
const StarShipList = withData(ItemList, getAllStarShips);

export{
    PersonList,
    PlanetList,
    StarShipList
}