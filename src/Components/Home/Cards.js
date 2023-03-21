import React from "react";
import '../Styles/Home/Cards.css';

function card(props)
{
    return (
        <div className="col-md-12">
        <div className="MyCard">
            <div className="col-md-4">
            <img src={props.src} alt="Hello" className="profile"></img>
            </div>
            <div className="row mx-0">
                <div className="Name col-md-10">
                  <h3>{props.name}<span>{props.skill}</span></h3>
                </div>
            </div>
            <div className="row pt-2 pb-4 mx-0">
                <div className="col-md-12">
                    <p className="testimonial">{props.msg}</p>
                </div>
            </div>
        </div>
        </div>
    );
}

export default card;
