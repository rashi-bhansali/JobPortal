import React, { useState }  from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import {RiAwardFill} from 'react-icons/ri';

function ProjectForm(props){
		const [aTitle, setATitle] = useState(props.update?props.aTitle:"");
		const [aDesc, setADesc] = useState(props.update?props.aDesc:"");
		const [aLink, setALink] = useState(props.update?props.aLink:"");
		const [year, setYear] = useState(props.update?props.year.split("T")[0]:"");
		const [by, setBy] = useState(props.update?props.by:"");

	const changeATitle = e => {
		const newATitle = e.target.value;
		setATitle(newATitle);
	}

	const changeADesc = e => {
		const newADesc = e.target.value;
		setADesc(newADesc);
	}
	
	const changeALink = e => {
		const newALink = e.target.value;
		setALink(newALink);
	}

	const changeYear = e => {
		const newYear = e.target.value;
		setYear(newYear);
	}

	const changeBy = e => {
		const newBy = e.target.value;
		setBy(newBy);
	}

	const url = "http://localhost:1234/Applicant/"+props.aid+"/update/ach";

	return(<div>
		<div className="row pr-5">
			<div className="col md-2 r-icons pl-5 pt-5">
				<RiAwardFill size={80}/>
			</div>
			<div className="col-md-10">
			<Form action={url} method="POST">
				<FormGroup row>
					<Label for="aTitle" sm={2}>Title</Label>
					<Col sm={10}>
					<Input type="text" name="aTitle" id="aTitle" value={aTitle} onChange={changeATitle} />
					</Col>
					{props.update && <Input type="hidden" name="achid" id="achid" value={props.achid}></Input>}
					{!props.update && <Input type="hidden" name="achid" id="achid" value={-1}></Input>}
				</FormGroup>
			    <FormGroup row>
					<Label for="by" sm={2}>Organization</Label>
					<Col sm={10}>
					<Input type="text" name="by" id="by" value={by} onChange={changeBy} />
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="year" sm={2}>Year</Label>
					<Col sm={10}>
      					<Input type="date" name="year" id="year" value={year} onChange={changeYear}/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="aDesc" sm={2}>Description</Label>
						<Col sm={10}>
						<Input type="textarea" name="aDesc" id="aDesc" value={aDesc} onChange={changeADesc}/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="aLink" sm={2}>Link (optional)</Label>
						<Col sm={10}>
						<Input type="url" name="aLink" id="aLink" value={aLink} onChange={changeALink}/>
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