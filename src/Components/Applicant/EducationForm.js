import React, { useState }  from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import {FaGraduationCap} from 'react-icons/fa';

function EducationForm(props){
		const [etype, setEtype] = useState(props.update?props.etype:"");
		const [ins, setIns] = useState(props.update?props.ins:"");
		const [isPerc, setIsPerc] = useState((props.update && props.cgpa>0)?false:true);
		const [percent, setPercent] = useState(props.update?props.percent:"");
		const [cgpa, setCgpa] = useState(props.update?props.cgpa:"");
		const [yop, setYop] = useState(props.update?props.yop.split("T")[0]:"");
		const [isMajor, setIsMajor] = useState((props.update && props.major!="")?true:false);
		const [major, setMajor] = useState(props.update?props.major:"");
	

	const changeEtype = e => {
		const newEtype = e.target.value;
		setEtype(newEtype);
		const newIsMajor = (newEtype === "University" || newEtype === "High School");
		setIsMajor(newIsMajor); 
	
	}
	
	const changeYop = e => {
		const newYop = e.target.value;
		setYop(newYop);
	}

	const changeIsPerc = e => {
		const grades = e.target.id;
		if(grades==="iscgpa"){
			setIsPerc(false);
		}
		else{
			setIsPerc(true);
		}
	}

	const changePerc = e => {
		const newPerc = e.target.value;
		setPercent(newPerc);
	}
	
	const changeCgpa = e => {
		const newCgpa = e.target.value;
		setCgpa(newCgpa);
	}

	const changeIns = e => {
		const newIns = e.target.value;
		setIns(newIns);
	}

	const changeMajor = e => {
		const newMajor = e.target.value;
		setMajor(newMajor);
	}


	const url = "http://localhost:1234/Applicant/"+props.aid+"/update/edu";

	return(<div>
		<div className="row pr-5">
			<div className="col md-2 r-icons pt-5 pl-5">
				<FaGraduationCap size={80}></FaGraduationCap>
			</div>
			<div className="col-md-10">
			<Form action={url} method="POST">
				<FormGroup row>
					<Label for="etype" sm={2}>Type</Label>
					<Col sm={10}>
					<Input type="select" name="etype" id="etype" value={etype} disabled={props.update} onChange={changeEtype}>
						<option>School</option>
						<option>High School</option>
						<option>University</option>
					</Input>
					{props.update && <Input type="hidden" name="etype" id="etype" value={etype}></Input>}
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="yop" sm={2}>Year of Passing</Label>
					<Col sm={10}>
      					<Input type="date" name="yop" id="yop" value={yop} onChange={changeYop}/>
					</Col>
				</FormGroup>
				<FormGroup row className="pl-3">
					<Col sm={2}>
					<Input type="radio" name="ispercent" id="ispercent"  checked={isPerc} onChange={changeIsPerc}/>{' '}
						Percentage
					</Col>
					<Col sm={2}>
						<Input type="radio" name="ispercent" id="iscgpa" checked={!isPerc} onChange={changeIsPerc}/>{' '}
						CGPA
					</Col>
					{isPerc && <Col sm={8}>
						<Input type="number" name="percent" id="percent" step="0.01" value={percent} onChange={changePerc} />
					</Col>}
					{!isPerc && <Col sm={8}>
						<Input type="number" name="cgpa" id="cgpa" step="0.01" value={cgpa} onChange={changeCgpa} />
					</Col>}
				</FormGroup>
				<FormGroup row>
					<Label for="institute" sm={2}>Institute</Label>
					<Col sm={10}>
					<Input type="text" name="ins" id="ins" value={ins} onChange={changeIns} />
					</Col>
				</FormGroup>
				{isMajor && <FormGroup row>
					<Label for="major" sm={2}>Major</Label>
					<Col sm={10}>
					<Input type="text" name="major" id="major" value={major} onChange={changeMajor}/>
					</Col>
				</FormGroup>}
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

export default EducationForm;