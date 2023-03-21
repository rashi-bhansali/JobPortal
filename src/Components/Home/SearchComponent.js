import React, { Component} from 'react';
import {   
    Form,
    Button,
    Input,
    FormGroup
} from 'reactstrap';

class SearchComponent extends Component
{
    render()
    {
        return(
            <div className="searchbar col-lg-8">
                <div className="HeroText pt-5">
                    <h1>The Easiest Way To Get Your New Job!</h1>
                    <p>Find Jobs, Employment and Career Opportunities</p>
                </div>
                {/* <Form className="searchform">
                    <div id="searchbox">
                            <Input type="text" placeholder="Search" className="Search"/>
                            <i className="fa fa-search"></i>             
                    </div>
                    <Button>Search</Button>
                </Form> */}
            </div>
        )
    }
}

export default SearchComponent;