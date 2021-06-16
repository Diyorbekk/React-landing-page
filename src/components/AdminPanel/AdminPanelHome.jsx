import React, {Component} from 'react';
import AdminNav from "./AdminNav";
import Auxiliary from "../../Auxiliary/Auxiliary";



class SliderPanel extends Component {
    handleLogOut = this.props.handleLogOut

    render() {
        return (
            <React.Fragment>
                <Auxiliary>
                    <div className="container">
                        <AdminNav handleLogOut={this.handleLogOut}/>

                        {this.props.children}
                    </div>
                </Auxiliary>
            </React.Fragment>
        );
    }
}


export default SliderPanel;