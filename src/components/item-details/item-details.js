import React, { Component } from 'react';
import './item-details.css';
import Spinner from "../spinner";
import ErrorBoundry from "../error-boundry";
import ErrorButton from "../error-button";

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{ item[field] }</span>
        </li>
    );
};

export {
    Record
};

export default class ItemDetails extends Component {

    state = {
        item: null,
        loaded: true,
        image: null
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;
        if (!itemId) {
            return;
        }

        this.setState({
            loaded: false,
        });

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    loaded: true,
                    image: getImageUrl(item)
                });
            });
    }


    render() {
        if (!this.state.item) {
            return <Spinner/>;
        }

        const {item, loaded, image} = this.state;
        const spinner = !(loaded && image)? <Spinner/> : null;
        const content = (loaded && image)? <PersonView item = {item} image = {image} props = {this.props} /> : null;

        return (
            <ErrorBoundry>
                <div className="person-details card">
                    {spinner}
                    {content}
                </div>
            </ErrorBoundry>
        )
    }

}

const PersonView = ({item, image, props}) => {
    const {name} = item;

    return(
        <React.Fragment>
            <img className="person-image" src={image} alt = "Personal" />

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(props.children, (child, idx) => {
                            return React.cloneElement(child, {item});
                        })
                    }
                </ul>
                <ErrorButton/>
            </div>
        </React.Fragment>
    );
};
