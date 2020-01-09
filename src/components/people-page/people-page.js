import React, {Component} from "react";

import './people-page.css';
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";
import ErrorButton from "../error-button";

export default class PeoplePage extends Component
{

    state = {
        selectedPerson: 3,
        hasError: false
    };

    componentDidCatch(error, errorInfo) {
        // debugger;
        this.setState({
            hasError: true
        });
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

        return(
            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList onItemSelected = {this.onPeronSelected} />
                </div>
                <div className="col-md-6">
                    <PersonDetails personId = {this.state.selectedPerson} />
                    <ErrorButton />
                </div>
            </div>
        );
    }
}

