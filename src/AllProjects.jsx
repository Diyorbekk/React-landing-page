import React, {Component} from "react";

class AllProjects extends Component {
    render() {
        const prodId = this.props.match.params.id;
        return (
            <div>
                <h2>Товар № {prodId}</h2>
            </div>
        )
    }
}

export default AllProjects;
