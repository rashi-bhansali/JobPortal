import React, { useState }  from 'react';
import Hero from './Hero';
import SideNav from './SideNav';
import Footer from '../Home/Footer';
import CircularProgress from './CircularProgress';
import Details from './Details';
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import {IoIosArrowBack} from 'react-icons/io';
import '../Styles/Applicant/Profile.css';

function Applied(props)
{
    const onLogoutClick = e => {
        e.preventDefault();
        props.logoutUser();
    };
    const { user } = props.auth;

    return(
    <div className="Applied">
            <Hero logout={onLogoutClick} user={user}/>
        <div className="row mx-0 mt-5 pb-5">
            <div className="col-lg-3" style={{borderRight: "1px solid #eee"}}>
                <button className="goback" onClick={props.history.goBack}><IoIosArrowBack className="backicon" size={24}/><span>Dashboard</span></button>
                <SideNav logout={onLogoutClick} />
                <CircularProgress/>
            </div>
            <div className="col-lg-9">
                <div className="DashboardHeading">
                    <h3>Applied Jobs</h3>
                </div>
                <div id="appliedjobs">
                    <Details aid={user.aid} field={"applied"} edit={true}/> 
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
    );
}

const mapStateToProps = state => ({
	auth: state.auth
});
export default 
connect(
	mapStateToProps,
	{ logoutUser }
)(withRouter(Applied));