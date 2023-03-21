import React , {Component} from 'react';
import Hero from './Hero';
import SideNav from './SideNav';
import DashboardCards from './DashboardCards';
import Footer from '../Home/Footer';
import CircularProgress from './CircularProgress';
import RecentJobs from '../Home/RecentJobs';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";


class Dashboard extends Component
{   
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render()
    {

    const { user } = this.props.auth;
    
    return(
        <div>
            <Hero logout={this.onLogoutClick} user={user}/>
            <div className="row mx-0 mt-5 pb-5">
                <div className="col-lg-3" style={{borderRight: "1px solid #eee"}}>
                    <SideNav logout={this.onLogoutClick} />
                    <CircularProgress/>
                </div>
                <div className="col-lg-9">
                    <DashboardCards/>
                </div>
            </div>
            <div id="viewJobs"><RecentJobs auth={true} aid={user.aid}/></div>
            <Footer/>
        </div>
    );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);