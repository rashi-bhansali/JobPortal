import React from 'react';
import Card from './Cards';
import '../Styles/Home/Testimonials.css'
import Slider from "react-slick";
import ReviewsList from "../Data/Reviews";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Testimonial() {
    const config = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false
    };
    return (
        <div className="Testimonial">
            <div className="Heading pt-5">
                <h1>Kind Words From Our Clients</h1>
                <p>What other people thought about the service provided by us...</p>
            </div>
            <div className="container">
            <Slider {...config}>
                {ReviewsList.map((review) => {
                    return <Card name={review.name} skill={review.skill} src={review.imgsrc} msg={review.msg}></Card>
                })}
            </Slider>
            </div>
        </div>
    );
}

export default Testimonial;