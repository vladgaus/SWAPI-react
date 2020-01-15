import React, {Component} from "react";
import Spinner from "../spinner";

const withData = (View, getData) => {
    return class extends Component {

        state = {
            data: null
        };

        componentDidMount() {

            getData()
                .then((data) => {
                    this.setState({
                        data
                    });
                });
        };

        renderItems(arr) {
            return arr.map((item) => {
                const {id} = item;
                const label = this.props.children(item);

                return(
                    <li className="list-group-item"
                        key = {id}
                        onClick={() => this.props.onItemSelected(id)}
                    >
                        {label}
                    </li>
                );
            });
        }


        render() {

            const {data} = this.state;
            if (!data) {
                return <Spinner/>;
            }

            return <View {...this.props} data = {data} />;
        }
    }
};

export default withData;