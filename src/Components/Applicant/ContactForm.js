import React, {useState} from 'react';
import 
{
  Form, 
  Input,
  Button,
  FormGroup,
  Label
} from 'reactstrap';


function ContactForm(props)
{
    const readonly = props.readonly;

    const Applicant = props.contact;
    const contact = Applicant.address;

    const [city, setCity] = useState(contact ? contact.city : "");
    const [country, setCountry] = useState(contact ? contact.country : "");
    const [state, setState] = useState(contact ? contact.state : ""); 
    const [pincode, setPin] = useState(contact ? contact.pincode : "");
    const [phoneno, setPhone] = useState(Applicant.phoneno);
    const [email, setEmail] = useState(Applicant.email);

    const changeCity = e => {
		const newCity = e.target.value;
		setCity(newCity);
	}
    const changeCountry = e => {
		const newCountry = e.target.value;
		setCountry(newCountry);
	}
    const changeState = e => {
		const newState = e.target.value;
		setState(newState);
	}
    const changePin = e => {
		const newPin = e.target.value;
		setPin(newPin);
	}
    const changePhone = e => {
		const newPhone = e.target.value;
		setPhone(newPhone);
	}
    const changeEmail = e => {
		const newEmail = e.target.value;
		setEmail(newEmail);
	}

    const url1 = "http://localhost:1234/Applicant/"+props.aid+"/update/contact1";
    const url2 = "http://localhost:1234/Applicant/"+props.aid+"/update/contact2";

    return (<div className="py-3">
            {!props.phone && <Form className="contactform row" id="con-form" action={url1} method="POST">
                    <FormGroup className="col-lg-6 py-2">
                        <Label for="city">City</Label>
                        <Input className={"con-input"+(readonly ? "" : "-edit")} type="text" id="city" name="city" placeholder="Enter City Name" value={city} onChange={changeCity} readOnly={readonly}></Input>
                    </FormGroup>
                    <FormGroup className="col-lg-6 py-2">
                        <Label for="state">State</Label>
                        <Input className={"con-input"+(readonly ? "" : "-edit")} type="text" id="state" name="state" placeholder="Enter State Name" value={state} disabled={readonly} onChange={changeState}>
                        </Input>
                    </FormGroup>
                    <FormGroup className="col-lg-6 py-2">
                        <Label for="country">Country</Label>
                        <Input className={"con-input"+(readonly ? "" : "-edit")} type="text" id="country" name="country" placeholder="Enter Country Name" value={country} onChange={changeCountry} readOnly={readonly}></Input>
                    </FormGroup>
                    <FormGroup className="col-lg-6 py-2">
                        <Label for="pin">Pin Code</Label>
                        <Input className={"con-input"+(readonly ? "" : "-edit")} type="text" id="pin" name="pincode" placeholder="Enter Pin Code" value={pincode} onChange={changePin} readOnly={readonly}></Input>
                    </FormGroup>
                    {!readonly && <button type="submit" className="sub-button">Save</button>}
            </Form>}
            {!props.address && <Form className="contactform row" id="con-form2" action={url2} method="POST">
                    <FormGroup className="col-lg-6 py-2">
                        <Label for="phoneno">Phone no</Label>
                        <Input className={"con-input"+(readonly ? "" : "-edit")} type="text" id="phoneno" name="phoneno" placeholder="Enter Phone no" value={phoneno} onChange={changePhone} readOnly={readonly}></Input>
                    </FormGroup>
                    <FormGroup className="col-lg-6 py-2">
                        <Label for="email">Email</Label>
                        <Input className={"con-input"+(readonly ? "" : "-edit")} type="text" id="email" name="email" placeholder="Enter Email ID" value={email} onChange={changeEmail} readOnly={readonly}></Input>
                    </FormGroup>
                    {!readonly && <button type="submit" className="sub-button">Save</button>}
            </Form>}
    </div>);
}

export default ContactForm;