import React, { useState }  from 'react';
import axios from 'axios';
import ProjectForm from './ProjectForm';
import "../Styles/Applicant/RenderProject.css";
import {FaEdit} from 'react-icons/fa';
import {RiDeleteBin5Fill} from 'react-icons/ri';
import {GrStackOverflow} from 'react-icons/gr';
import {BsLink45Deg} from 'react-icons/bs';

function RenderProject(props){
	const [isEdit, setIsEdit] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const proj = props.proj;
    const aid = props.aid;

	
	function deleteEdu(){
		axios({
			method: 'delete',
			url: "http://localhost:1234/Applicant/"+aid+"/delete/proj",
			headers: {}, 
			data: {
			  pid: props.pid, // This is the body part
			}
		  });
		  setIsDelete(true); 
	}

	function editEdu(){
		setIsEdit(true);
	}


	return(<div>
				{!isEdit && !isDelete && 
				<div className="row pr-5">
					<div className="col-md-2 r-icons pt-3 pl-5">
 						<GrStackOverflow size={60} />
 					</div>
 					<div className="col-md-10 projdetails">
				 		<div className="row">
							<div className="col-md-8 title">
								<h5>{proj.title}<span className="link">{proj.projLink!="" && <a href={proj.projLink}><BsLink45Deg size={24}/></a>}</span></h5>
							</div>
							<div className="col-md-1"></div>
							{props.edit && <div className="col-md-3 r-icons mr-0">
								<button onClick={editEdu}><FaEdit size={24}></FaEdit></button><span><button onClick={deleteEdu}><RiDeleteBin5Fill size={24}></RiDeleteBin5Fill></button></span>
							</div>}	 	 
				 		</div>
						<div className="row">
				 			<div className="col-md-8 desc">
								<p>{proj.projDesc}</p>
							</div>
						</div>
						<hr></hr>
					</div>
			</div>}
		{isEdit && !isDelete && <ProjectForm aid={aid} pid={props.pid} title={proj.title} projDesc={proj.projDesc} projLink={proj.projLink} update={true} />}
		</div>);
};

export default RenderProject;