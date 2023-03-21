import React, {useState} from 'react';
import 
{
  Form, 
  Input,
  Button,
  FormGroup,
  Label
} from 'reactstrap';

function PersonalForm(props)
{
    const personal = props.personal;
    const readonly = props.readonly;
    const [name, setName] = useState(personal.name);
    const [gender, setGender] = useState(personal.gender);
    const [dob, setDob] = useState(personal.dob.split("T")[0]); 
    const [qualification, setQual] = useState(personal.qualification);
    const [job, setJob] = useState(personal.currentJob);
    const [salary, setSalary] = useState(personal.currentSalary);
    const [company, setCompany] = useState(personal.currentCompany);
    const [experience, setExp] = useState(personal.experience );
    const [about, setAbout] = useState(personal.about );

    const changeName = e => {
		const newName = e.target.value;
		setName(newName);
	}
    const changeGender = e => {
		const newGender = e.target.value;
		setGender(newGender);
	}
    const changeDob = e => {
		const newDob = e.target.value;
		setDob(newDob);
	}
    const changeQual = e => {
		const newQual = e.target.value;
		setQual(newQual);
	}
    const changeJob = e => {
		const newJob = e.target.value;
		setJob(newJob);
	}
    const changeCompany = e => {
		const newComp = e.target.value;
		setCompany(newComp);
	}
    const changeSalary = e => {
		const newSal = e.target.value;
		setSalary(newSal);
	}
    const changeExp = e => {
		const newExp = e.target.value;
		setExp(newExp);
	}
    const changeAbout = e => {
		const newAbout = e.target.value;
		setAbout(newAbout);
	}

    const url = "http://localhost:1234/Applicant/"+props.aid+"/update/personal";
    return(
        <div className="py-3">
                <Form className="personalform row" id="per-form" action={url} method="POST">
                    <FormGroup className="col-lg-6 py-2">
                        <Label for="name">Full Name</Label>
                        <Input className={"per-input"+(readonly ? "" : "-edit")} type="text" id="name" name="name" placeholder="Enter full name" value={name} onChange={changeName} readOnly={readonly}></Input>
                    </FormGroup>
                    <FormGroup className="col-lg-6 py-2">
                        <Label for="gender">Gender</Label>
                        <Input className={"per-input"+(readonly ? "" : "-edit")} type="select" id="gender" name="gender" value={gender} disabled={readonly} onChange={changeGender}>
                            <option>Male</option>
                            <option>Female</option>
                        </Input>
                    </FormGroup>
                    <FormGroup className="col-lg-6 py-2">
                        <Label for="dob">DOB</Label>
                        <Input className={"per-input"+(readonly ? "" : "-edit")} type="date" id="dob" name="dob" placeholder="--" value={dob} onChange={changeDob} readOnly={readonly}></Input>
                    </FormGroup>
                    <FormGroup className="col-lg-6 py-2">
                        <Label for="qualification">Qualification</Label>
                        <Input className={"per-input"+(readonly ? "" : "-edit")} type="select" id="qualification" name="qualification" value={qualification} onChange={changeQual} disabled={readonly}>
                            <option>Diploma</option>
                            <option>Graduate</option>
                            <option>Post Graduate</option>
                        </Input>
                    </FormGroup>
                    <FormGroup className="col-lg-6 py-2">
                        <Label for="job">Job Title</Label>
                        <Input className={"per-input"+(readonly ? "" : "-edit")} type="text" id="job" name="currentJob" placeholder="--" value={job} onChange={changeJob} readOnly={readonly}></Input>
                    </FormGroup>
                    <FormGroup className="col-lg-6 py-2">
                        <Label for="company">Current Company </Label>
                        <Input className={"per-input"+(readonly ? "" : "-edit")} type="text" id="company" name="currentCompany" placeholder="--" value={company} onChange={changeCompany} readOnly={readonly}></Input>
                    </FormGroup>
                    <FormGroup className="col-lg-6 py-2">
                        <Label for="exp">Experience</Label>
                        <Input className={"per-input"+(readonly ? "" : "-edit")} type="select" id="exp" name="experience" value={experience} onChange={changeExp} disabled={readonly}>
                            <option>--</option>
                            <option>Less than 1 Year</option>
                            <option>1 to 3 Years</option>
                            <option>More than 3 Years</option>
                        </Input>
                    </FormGroup>
                    <FormGroup className="col-lg-6 py-2">
                        <Label for="salary">Current Salary (₹)</Label>
                        <Input className={"per-input"+(readonly ? "" : "-edit")} type="text" id="salary" name="currentSalary" placeholder="--" value={salary} onChange={changeSalary} readOnly={readonly}></Input>
                    </FormGroup>
                    <FormGroup className="col-lg-12 py-2">
                        <Label for="about">Description</Label>
                        <Input className={"per-input"+(readonly ? "" : "-edit")} type="textarea" id="about" name="about" placeholder="--" value={about} onChange={changeAbout} readOnly={readonly}></Input>
                    </FormGroup>
                    {!readonly && <button type="submit" className="sub-button">Save</button>}
                </Form>
            </div>
    );
}

export default PersonalForm;