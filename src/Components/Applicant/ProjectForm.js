import React, { useState }  from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import {GrStackOverflow} from 'react-icons/gr';

function ProjectForm(props){
		const [title, setTitle] = useState(props.update?props.title:"");
		const [projDesc, setProjDesc] = useState(props.update?props.projDesc:"");
		const [projLink, setProjLink] = useState(props.update?props.projLink:"");
		
	const changeTitle = e => {
		const newTitle = e.target.value;
		setTitle(newTitle);
	}

	const changeProjDesc = e => {
		const newProjDesc = e.target.value;
		setProjDesc(newProjDesc);
	}
	
	const changeProjLink = e => {
		const newProjLink = e.target.value;
		setProjLink(newProjLink);
	}

	const url = "http://localhost:1234/Applicant/"+props.aid+"/update/proj";

	return(<div>
		<div className="row pr-5">
			<div className="col md-2 r-icons pl-5 pt-5">
				<GrStackOverflow size={80}/>
			</div>
			<div className="col-md-10">
			<Form action={url} method="POST">
				<FormGroup row>
					<Label for="title" sm={2}>Title</Label>
					<Col sm={10}>
					<Input type="text" name="title" id="title" value={title} onChange={changeTitle} />
					</Col>
					{props.update && <Input type="hidden" name="pid" id="pid" value={props.pid}></Input>}
					{!props.update && <Input type="hidden" name="pid" id="pid" value={-1}></Input>}
				</FormGroup>
				<FormGroup row>
					<Label for="projDesc" sm={2}>Description</Label>
					<Col sm={10}>
					<Input type="textarea" name="projDesc" id="projDesc" value={projDesc} onChange={changeProjDesc}/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="projLink" sm={2}>Link (optional)</Label>
					<Col sm={10}>
					<Input type="url" name="projLink" id="projLink" value={projLink} onChange={changeProjLink}/>
					</Col>
				</FormGroup>
          		<FormGroup row>
					<Col sm={{ size: 2, offset: 5 }}>
					<Input type="submit" value="save" className="Submitbutton"/>
					</Col>
				</FormGroup>
			</Form>
			</div>
		</div>
		</div>
	);
}

export default ProjectForm;