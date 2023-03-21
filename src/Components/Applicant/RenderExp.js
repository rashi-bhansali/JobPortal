import React, { useState }  from 'react';
import axios from 'axios';
import ExperienceForm from './ExperienceForm';
import "../Styles/Applicant/RenderExp.css";
import {FaEdit} from 'react-icons/fa';
import {RiDeleteBin5Fill} from 'react-icons/ri';

function RenderExp(props){
	const [isEdit, setIsEdit] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const exp = props.exp;
    const aid = props.aid;
    const expid = props.expid;
	
	function deleteEdu(){
		axios({
			method: 'delete',
			url: "http://localhost:1234/Applicant/"+aid+"/delete/exp",
			headers: {}, 
			data: {
			  expid: expid // This is the body part
			}
		});
		setIsDelete(true); 
	}

	function editEdu(){
		setIsEdit(true);
	}


	return(<div>
		{!isEdit && !isDelete && <div className="row pr-5">
			<div className="col-md-1"></div>
 			<div className="col-md-11 pl-5 expdetails">
			 	<i></i>
				<div className="row pl-5"> 
					<div className="col-md-9 role">
						<h5>{exp.role}<span className="company">{exp.company}</span></h5>
					</div>
					{props.edit && <div className="col-md-3 r-icons mr-0">
						<button onClick={editEdu}><FaEdit size={24}></FaEdit></button><span><button onClick={deleteEdu}><RiDeleteBin5Fill size={24}></RiDeleteBin5Fill></button></span>
					</div>}	 	 
				 </div>
				<ul className="col-md-10 pl-5">
					<li>{exp.from.split("-")[1]+"/"+exp.from.split("-")[0]} - {exp.to.split("-")[1]+"/"+exp.to.split("-")[0]}</li>
					<li><p>{exp.workDesc}</p></li>
				</ul>
		</div>
		</div>}
		{isEdit && !isDelete && <ExperienceForm aid={aid} expid={expid} from={exp.from} to={exp.to} role={exp.role} company={exp.company} workDesc={exp.workDesc} update={true} />}
		</div>);
};

export default RenderExp;