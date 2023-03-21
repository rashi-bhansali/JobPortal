import React, { useState }  from 'react';
import axios from 'axios';
import AchievementForm from './AchievementForm';
import "../Styles/Applicant/RenderAch.css";
import {FaEdit} from 'react-icons/fa';
import {RiDeleteBin5Fill} from 'react-icons/ri';
import {BsLink45Deg} from 'react-icons/bs';

function RenderAch(props){
	const [isEdit, setIsEdit] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const ach = props.ach;
    const aid = props.aid;
    const achid = props.achid;
	
	function deleteEdu(){
		axios({
			method: 'delete',
			url: "http://localhost:1234/Applicant/"+aid+"/delete/ach",
			headers: {}, 
			data: {
			  achid: achid // This is the body part
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
 			<div className="col-md-11 pl-5 achdetails">
			 	<i></i>
				<div className="row pl-5"> 
					<div className="col-md-9 atitle">
						<h5>{ach.aTitle}<span className="link">{ach.aLink!="" && <a href={ach.aLink}><BsLink45Deg size={24}/></a>}</span></h5>
					</div>
					{props.edit && <div className="col-md-3 r-icons mr-0">
						<button onClick={editEdu}><FaEdit size={24}></FaEdit></button><span><button onClick={deleteEdu}><RiDeleteBin5Fill size={24}></RiDeleteBin5Fill></button></span>
					</div>}	 	 
				 </div>
				<ul className="pl-5">
					<li>by<span className="org">{ach.by}</span><span className="year">({ach.year.split("-")[0]})</span></li>
					<li><p>{ach.aDesc}</p></li>
				</ul>
		</div>
		</div>}
		{isEdit && !isDelete && <AchievementForm aid={aid} achid={achid} aTitle={ach.aTitle} year={ach.year} aDesc={ach.aDesc} by={ach.by} aLink={ach.aLink} update={true} />}
		</div>);
};

export default RenderAch;