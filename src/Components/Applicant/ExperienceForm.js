import React, { useState }  from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import {IoBriefcase} from 'react-icons/io5'
function ExperienceForm(props){
		const [from, setFrom] = useState(props.update?props.from.split("T")[0]:"");
		const [to, setTo] = useState(props.update?props.to.split("T")[0]:"");
		const [company, setCompany] = useState(props.update?props.company:"");
		const [role, setRole] = useState(props.update?props.role:"");
		const [workDesc, setWorkDesc] = useState(props.update?props.workDesc:"");

	const changeFrom = e => {
		const newFrom = e.target.value;
		setFrom(newFrom);
	}

	const changeTo = e => {
		const newTo = e.target.value;
		setTo(newTo);
	}
	
	const changeCompany = e => {
		const newCompany = e.target.value;
		setCompany(newCompany);
	}

	const changeRole = e => {
		const newRole = e.target.value;
		setRole(newRole);
	}

	const changeWorkDesc = e => {
		const newWorkDesc= e.target.value;
		setWorkDesc(newWorkDesc);
	}


	const url = "http://localhost:1234/Applicant/"+props.aid+"/update/exp";

	return(<div>
		<div className="row pr-5">
			<div className="col md-2 r-icons pl-5 pt-5">
				<IoBriefcase size={80}></IoBriefcase>
			</div>
			<div className="col-md-10">
			<Form action={url} method="POST">
				<FormGroup row>
					<Label for="company" sm={2}>Company</Label>
					<Col sm={10}>
					<Input type="text" name="company" id="company" value={company} onChange={changeCompany} />
					</Col>
					{props.update && <Input type="hidden" name="expid" id="expid" value={props.expid}></Input>}
					{!props.update && <Input type="hidden" name="expid" id="expid" value={-1}></Input>}
				</FormGroup>
				<FormGroup row>
					<Label for="role" sm={2}>Role</Label>
					<Col sm={10}>
					<Input type="text" name="role" id="role" value={role} onChange={changeRole}/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="from" sm={2}>From</Label>
					<Col sm={4}>	
						<Input type="date" name="from" id="from" value={from} onChange={changeFrom}/>
					</Col>
					<Col sm={1}></Col>
					<Label for="to" sm={1}>To</Label>
					<Col sm={4}>
						<Input type="date" name="to" id="to" value={to} onChange={changeTo}/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="workDesc" sm={2}>Description</Label>
					<Col sm={10}>
					<Input type="textarea" name="workDesc" id="workDesc" value={workDesc} onChange={changeWorkDesc}/>
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

export default ExperienceForm;