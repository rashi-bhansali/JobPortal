import React, { useState }  from 'react';
import axios from 'axios';
import EducationForm from './EducationForm';
import "../Styles/Applicant/RenderEdu.css";
import {FaEdit} from 'react-icons/fa';
import {RiDeleteBin5Fill} from 'react-icons/ri';
import {FaGraduationCap} from 'react-icons/fa';

function RenderEdu(props){
	const [isEdit, setIsEdit] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const edu = props.edu;
    const aid = props.aid;

	
	function deleteEdu(){
		axios({
			method: 'delete',
			url: "http://localhost:1234/Applicant/"+aid+"/delete/edu",
			headers: {}, 
			data: {
			  etype: edu.etype, // This is the body part
			}
		  });
		  setIsDelete(true); 
	}

	function editEdu(){
		setIsEdit(true);
	}


	return(<div>
		{!isEdit && !isDelete && <div className="row pr-5">
			<div className="col-md-2 r-icons pt-3 pl-5">
 				<FaGraduationCap size={70}></FaGraduationCap>
 			</div>
 			<div className="col-md-10 details">
				 <div className="row">
					<div className="col-md-9 etype">
						<h5>{edu.etype}</h5>
					</div>
					{props.edit && <div className="col-md-3 r-icons mr-0">
						<button onClick={editEdu}><FaEdit size={24}></FaEdit></button><span><button onClick={deleteEdu}><RiDeleteBin5Fill size={24}></RiDeleteBin5Fill></button></span>
					</div>}	 	 
				 </div>
				<ul>
					<li>Year of Passing: {edu.yop.split("-")[0]}</li>
					{edu.percent>0 && <li>{edu.percent}%</li>}
					{edu.cgpa>0 && <li>CGPA: {edu.cgpa}</li>}
					<div className="ins">{edu.ins} <span className="major"><i>{edu.major}</i></span></div>
				</ul>
			<hr></hr>
		</div>
		</div>}
		{isEdit && !isDelete && <EducationForm aid={aid} etype={edu.etype} yop={edu.yop} percent={edu.percent} cgpa={edu.cgpa} ins={edu.ins} major={edu.major} update={true} />}
		</div>);
};

export default RenderEdu;