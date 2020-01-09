import React, { Component } from 'react';
import SwapiService from "../../services/swapi-service";

import './person-details.css';

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null
    }

    updatePerson(){
        const {personId} = this.props;
        if (!personId) {
            return null;
        }

        this.swapiService
            .getPerson(personId)
            .then((person) => {
                this.setState({
                    person
                });
            });
    }

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.personId !== this.props.personId) {
            this.updatePerson();
        }
    }

    render() {
        if (!this.state.person) {
            return (
                <span>Select a person from a list</span>
            );
        }

        const {person : {id, name, gender, birthYear, eyeColor}} = this.state;

        return (
            <div className="person-details card">
                <img className="person-image" src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt = "Personal" />

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{birthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{eyeColor}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}