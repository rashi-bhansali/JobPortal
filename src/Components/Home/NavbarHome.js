import React, {useState, Component} from 'react';
import { Navbar, NavbarBrand,Nav,NavLink } from 'reactstrap';

import Register from './Register';
import Login from './Login';

class NavBar extends Component
{
    constructor(props) 
    {
        super(props);
        this.state = {
         //NavBar methods
          ColorNavbar: false,
          signup: false,
          login: false
        };

        this.ColorNav = this.ColorNav.bind(this);
        this.loginclose = this.loginclose.bind(this);
        this.loginopen = this.loginopen.bind(this);
        this.signupclose = this.signupclose.bind(this);
        this.signupopen = this.signupopen.bind(this);
        
    }
    componentDidMount() 
    {
        window.addEventListener('scroll', this.ColorNav);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.ColorNav);
    }

    loginclose(){
    this.setState({ login: false });
    }
    loginopen() {
    this.setState({ login: true });
    }

    signupclose(){
    this.setState({ signup: false });
    }
    signupopen() {
    this.setState({ signup: true });
    }

    

    ColorNav() {
        if(window.scrollY >= 70)
        {
            this.setState({
                ColorNavbar: true
            });
        }
        else
        {
            this.setState({
                ColorNavbar: false
            });
        }
    }

    render()
    {
        const { errors } = this.state;
        return(
            <>
            <Navbar className={this.state.ColorNavbar ? "navbar active" : "navbar"} dark sticky="top" expand="md">
            <NavbarBrand href="#" className="Brand mt-3"><h3>DreamJobs</h3></NavbarBrand>
            <Nav className="ml-auto">
                <NavLink className="navlink" href="#stats" style={{cursor: "pointer"}}>About us</NavLink>
                <NavLink className="navlink" onClick={this.loginopen} style={{cursor: "pointer"}}>Sign In</NavLink>
                <NavLink className="navlink" onClick={this.signupopen} style={{cursor: "pointer"}}>Sign up</NavLink>
            </Nav>
            </Navbar>

            {/* SignUp Form */}
            <Register open={this.signupopen} close={this.signupclose} signup={this.state.signup}/>

            {/* Login Form */}
            <Login open={this.loginopen} close={this.loginclose} login={this.state.login}/>
            
            </>
        )
    }
}

export default NavBar;

//urls for form actions
//action={"http://localhost:1234/" + (this.state.candidate ? "Applicant" : "Company") + "/create"}
//action={"http://localhost:1234/" + (this.state.candidate ? "Applicant" : "Company") + "/login"}