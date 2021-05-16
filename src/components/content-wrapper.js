import React, {Component} from 'react';
import About from "./sections/About";
import Projects from "./sections/Projects";

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
                {/*<!-- About -->*/}
                <About/>
                {/*<!-- Projects -->*/}
                <Projects/>
                {/*<!-- Services -->*/}
                {/*<!-- Blog -->*/}
                {/*<!-- Contact -->*/}
                {/*<!-- Promo video - Testiominals -->*/}
                {/*<!-- Clients -->*/}
                {/*<!-- Footer -->*/}
            </div>
        );
    }
}

export default ContentWrapper;