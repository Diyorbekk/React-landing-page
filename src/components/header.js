import React, {Component} from 'react';
import $ from 'jquery'
import OwlCarousel from 'react-owl-carousel2';
import slider_1 from '../assets/img/slider/1.jpg';
import slider_2 from '../assets/img/slider/2.jpg';

class Header extends Component {
    render() {
        const options = {
            items: 1,
            loop: true,
            dots: false,
            margin: 0,
            autoplay: true,
            smartSpeed: 500,
            nav: true,
            animateOut: 'fadeOut',
            navText: ['<i class="ti-angle-left" aria-hidden="true"></i>', '<i class="ti-angle-right" aria-hidden="true"></i>']
        };

        const events = {
            onChanged: function (event) {
                var item = event.item.index - 2;     // Position of the current item
                $('h4').removeClass('animated fadeInUp');
                $('h1').removeClass('animated fadeInUp');
                $('p').removeClass('animated fadeInUp');
                $('.butn-light').removeClass('animated fadeInUp');
                $('.owl-item').not('.cloned').eq(item).find('h4').addClass('animated fadeInUp');
                $('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated fadeInUp');
                $('.owl-item').not('.cloned').eq(item).find('p').addClass('animated fadeInUp');
                $('.owl-item').not('.cloned').eq(item).find('.butn-light').addClass('animated fadeInUp');
            }
        };
        return (
            <header id="home" className="header slider-fade" data-scroll-index="0">
                <OwlCarousel clasname="owl-carousel owl-theme" options={options} events={events}>
                    <div className="text-left item bg-img" data-overlay-dark="3"
                         style={{backgroundImage: `url(${slider_1})`}}>
                        <div className="v-bottom caption">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="o-hidden">
                                            <h1>Innovate Desing in Toronto</h1>
                                            <hr/>
                                            <p>Architecture viverra tellus nec massa dictum the euismoe.
                                                <br/>Curabitur viverra the posuere aukue velit.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-left item bg-img" data-overlay-dark="4"
                         style={{backgroundImage: `url(${slider_2})`}}>
                            <div className="v-bottom caption">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <div className="o-hidden">
                                                <h1>Innovate Desing in Canada</h1>
                                                <hr/>
                                                <p>Architecture viverra tellus nec massa dictum the euismoe.
                                                    <br/>Curabitur viverra the posuere aukue velit.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </OwlCarousel>
            </header>
        );
    }


}

export default Header;