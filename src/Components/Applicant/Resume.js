import React, {useEffect, useState} from 'react';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import {SiMinutemailer} from 'react-icons/si';
import { connect } from "react-redux";
import Details from './Details';
import Footer from '../Home/Footer';
import { Navbar, NavItem, Nav,NavLink } from 'reactstrap';
import '../Styles/Applicant/Resume.css'


function Resume(props){
    const { user } = props.auth;
    // const url = "http://localhost:1234/Mail/"+user.email;
	const [sticky, setIsSticky] = useState(false);

	
	const handleSticky = () => {
		if(window.scrollY >= 500)
		{
		   setIsSticky(true);
		}
		else
		{
		   setIsSticky(false);
		}
	}

	useEffect(()=>{
		window.addEventListener('scroll', handleSticky);
		return () => { window.removeEventListener('scroll', () => handleSticky); }
	});

	const url = "http://localhost:1234/sms/"+user.phoneno;

	

	return ( <div className="viewResume">
		<div className="header row mx-0"></div>
		<div className="row mx-0 mt-5 candDetails">
			<div className="col-md-4 socialMediaLinks"><Details aid={user.aid} field={"socialIcons"} edit={false}/></div>
			<div className="col-md-4 personalDetails"><Details aid={user.aid} field={"personalDetails"} edit={false}/></div>
			<div className="col-md-4 contact"><a href="#contact"><span className="r-icons"><SiMinutemailer size={40}/></span> Contact {user.name.split(" ")[0]}</a></div>
		</div>
		<div> 
			<div className={sticky ? "resnav active" : "resnav"}>
                <ul className="mr-auto ml-auto pt-2 pb-2 pl-0 pr-0 resume_nav">
					<li><a className="reslink" href="#about">About</a></li>
					<li><a className="reslink" href="#edu">Education</a></li>
					<li><a className="reslink" href="#exp">Work Experience</a></li>
					<li><a className="reslink" href="#skill">Skills</a></li>
					<li><a className="reslink" href="#proj">Portfolio</a></li>
					<li><a className="reslink" href="#ach">Achievements</a></li>
            	</ul>
            </div>
		</div>
	 	<Row className="mx-0 rescontent">
	 		<Col sm={8} className="pl-3 pr-2 leftside">
				<div id="about"><Details aid={user.aid} field={"about"} edit={false}/></div>
				<div id="edu"><Details aid={user.aid} field={"edu"} edit={false}/></div>
				<div id="exp"><Details aid={user.aid} field={"exp"} edit={false}/></div>
				<div id="proj"><Details aid={user.aid} field={"proj"} edit={false}/></div>
				<div id="ach"><Details aid={user.aid} field={"ach"} edit={false}/></div>
			</Col>
	 		<Col sm={4} className="pl-0 rightside">
			 	<div id="skill"><Details aid={user.aid} field={"skill"} edit={false}/></div>
				<div id="overview"><Details aid={user.aid} field={"overview"} edit={false}/></div>
				<div id="contact">
					<div className="row mt-5 pt-2 mr-0 field">
						<h4>Contact</h4>
					</div>
					<div className="row showMail">
						<div className="col-md-12">
						<Form className="pt-3" action={url} method="POST">
							<FormGroup row className="px-3">
								<Input type="text" name="name" placeholder="Name" required={true}></Input>
							</FormGroup>
							<FormGroup row className="px-3">
								<Input type="tel" name="contact" placeholder="Contact No." required={true}></Input>
							</FormGroup>
							<FormGroup row className="px-3">
								<Input type="email" name="email" placeholder="Email (optional)"></Input>
							</FormGroup>
							<FormGroup row className="px-3">
								<Input type="text" name="subject" placeholder="Subject (optional)" required={true}></Input>
							</FormGroup>
							<FormGroup row className="px-3">
								<Input type="textarea" name="msg" maxlength="100" placeholder="Message (not more than 100 characters)" required={true}></Input>
							</FormGroup>
							<FormGroup row className="px-5">
								<Input type="submit" value="Send Message" className="Submitbutton"></Input>
							</FormGroup>
						</Form>
						</div>
					</div>
				 </div>
			</Col>
		</Row>
		<div>
				 
	 			
		</div>
		<div className="row mb-5"></div>
		<Footer/>
	</div>);
}

const mapStateToProps = state => ({
	auth: state.auth
});
export default 
connect(
	mapStateToProps
)(Resume);