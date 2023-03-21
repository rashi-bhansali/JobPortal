import React, { useState } from 'react';
import '../Styles/Home/Jobs.css';
import axios from 'axios';
import Register from './Register';
import ApplyComp from '../Applicant/Apply';

function Jobs(props){

	const jobDesc = props.jobDesc;
	const [signup, showsignup] = useState(false);
	const [Apply, showApply] = useState(false);
	const [isLoaded, setLoaded] = useState(false);
	const [comp, setComp] = useState({});

	const toggleSignup = e => {
		showsignup(!signup);
	}

	const toggleApply = e => {
		showApply(!Apply);
	}

	function getCompany(id)
	{
		axios.get("http://localhost:1234/Company/"+id)
		.then((res) => {
			setComp(res.data);
			setLoaded(true);
			return true;
		})
		.catch((err) => {
			console.log(err);
		})
	}

	return(
		<div className="col-md-12">
			{props.auth && !isLoaded && props.compid && getCompany(props.compid)}
			{!props.auth && <div className="Job">
				<div className="Logo row mx-0">
					{!props.auth && <img src={props.src} alt="job" className="Clogo"></img>}
				</div>
				<div className="row mx-0">
					<div className="Role col-md-12">{props.role}</div>
				</div>
				<div className="row mx-0">
					{!props.auth && <div className="Cname col-md-12">{props.company}</div>}
				</div>
				<hr></hr>
				<div className="row mx-0">
					<div className="col-md-12">
					{!props.auth && <span className="Loc">{props.loc}</span>}

					<a className="Apply" onClick={props.auth ? toggleApply : toggleSignup} style={{'cursor':"pointer"}} >APPLY NOW</a>
					{signup && <Register open={toggleSignup} close={toggleSignup} signup={signup}/>}
					</div>
				</div>	
			</div>}
			{props.auth && isLoaded && <div className="Job">
				<div className="Logo row mx-0">
					<img src={comp.logo} alt="job" className="Clogo"></img>
				</div>
				<div className="row mx-0">
					<div className="Role col-md-12">{props.role}</div>
				</div>
				<div className="row mx-0">
					<div className="Cname col-md-12">{comp.Company_Name}</div>
				</div>
				<hr></hr>
				<div className="row mx-0">
					<div className="col-md-12">
					<span className="Loc">{comp.Location}</span>
					<a className="Apply" onClick={props.auth ? toggleApply : toggleSignup} style={{'cursor':"pointer"}} >APPLY NOW</a>
					{signup && <Register open={toggleSignup} close={toggleSignup} signup={signup}/>}
					{isLoaded && Apply && <ApplyComp src={comp.logo} company={comp.Company_Name} loc={comp.Location} role={props.role}
								skills={jobDesc.skillSet} desc={jobDesc.description} perks={jobDesc.perks}
								salary={props.salary} dur={props.dur} pos={props.pos} deadline={props.deadline} jid={props.jid} aid={props.aid} open={toggleApply} close={toggleApply} apply={Apply} />}
					</div>
				</div>	
			</div>}
		</div>
	);
}

export default Jobs;