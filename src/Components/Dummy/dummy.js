import React from 'react';
import {  
	Form, 
	FormGroup, 
	Label, 
	Input 
} from 'reactstrap';

function Dummy(){
	return(
		<div className="row pt-5">
			<div className="col-md-2">
			</div>
			<div className="col-md-8">
				<Form action="http://localhost:1234/Applicant/create" method="POST">
					<FormGroup>
						<Label for="exampleName">Name</Label>
						<Input type="text" name="name" id="exampleName" placeholder="Enter Applicant Name" />
					</FormGroup>
					<FormGroup>
						<Label for="exampleAge">Age</Label>
						<Input type="number" name="age" id="exampleAge" placeholder="Enter Applicant Age" />
					</FormGroup>
					<Input type="submit" value="Submit" />
				</Form>
			</div>
			<div className="col-md-2">
			</div>
		</div>
	);
}

export default Dummy;
