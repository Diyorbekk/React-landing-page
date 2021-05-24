import React, {Component} from "react";
class ContentWrapper extends Component {
    render() {
        return (
            <div className="content-wrapper">
                {/*<!-- Lines -->*/}
                <section className="content-lines-wrapper">
                    <div className="content-lines-inner">
                        <div className="content-lines"/>
                    </div>
                </section>

                {this.props.children}
            </div>
        )
    }
}

export default ContentWrapper;
