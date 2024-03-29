import React, {Component} from 'react';
import Header from "./header";
import About from "./sections/About";
import SingleProject from "./sections/SingleProject";
import Services from "./sections/Services";
import Blog from "./sections/Blog";
import Contact from "./sections/Contact";
import PromoVideos from "./sections/Promo-Videos";
import Clients from "./sections/Clients";
import ContentWrapper from "./content-wrapper";
import Footer from "./Footer";


class Contents extends Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                <ContentWrapper>
                    {/*<!-- About -->*/}
                    <About/>
                    {/*<!-- Projects -->*/}
                    <SingleProject/>
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
                    <Footer/>
                </ContentWrapper>
            </React.Fragment>
        );
    }
}

export default Contents;