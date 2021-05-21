import React, {Component} from 'react';
import Header from "./header";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Blog from "./sections/Blog";
import Contact from "./sections/Contact";
import PromoVideos from "./sections/Promo-Videos";
import Clients from "./sections/Clients";



class ContentWrapper extends Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
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
                    <Services/>
                    {/*<!-- Blog -->*/}
                    <Blog/>
                    {/*<!-- Contact -->*/}
                    <Contact/>
                    {/*<!-- Promo video - Testiominals -->*/}
                    <PromoVideos/>
                    {/*<!-- Clients -->*/}
                    <Clients/>
                    {/*<!-- Footer -->*/}
                </div>
            </React.Fragment>
        );
    }
}

export default ContentWrapper;