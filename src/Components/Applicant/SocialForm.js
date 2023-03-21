import React, {useState} from 'react';
import 
{
  Form, 
  Input,
  Button,
  FormGroup,
  Label
} from 'reactstrap';

function SocialForm(props)
{
    const social = props.social;
    const readonly = props.readonly;

    const [facebook, setFacebook] = useState(social ? social.facebook : "");
    const [twitter, setTwitter] = useState(social ? social.twitter : "");
    const [github, setGithub] = useState(social ? social.github : ""); 
    const [linkedin, setLinkedin] = useState(social ? social.linkedin : "");

    const changeFacebook = e => {
		const newFacebook = e.target.value;
		setFacebook(newFacebook);
	}
    const changeTwitter = e => {
		const newTwitter = e.target.value;
		setTwitter(newTwitter);
	}
    const changeGithub = e => {
		const newGithub = e.target.value;
		setGithub(newGithub);
	}
    const changeLinkedin = e => {
		const newLinkedin = e.target.value;
		setLinkedin(newLinkedin);
	}

    const url = "http://localhost:1234/Applicant/"+props.aid+"/update/social";
    return(<div className="py-3">
        <Form className="socialform row" id="soc-form" action={url} method="POST">
            <FormGroup className="col-lg-6 py-2">
                <Label for="facebook">Facebook </Label>
                <Input className={"soc-input"+(readonly ? "" : "-edit")} type="text" id="facebook" name="facebook" placeholder="Enter facebook link" value={facebook} onChange={changeFacebook} readOnly={readonly}></Input>
            </FormGroup>
            <FormGroup className="col-lg-6 py-2">
                <Label for="twitter">Twitter</Label>
                <Input className={"soc-input"+(readonly ? "" : "-edit")} type="text" id="twitter" name="twitter" placeholder="Enter twitter link" value={twitter} onChange={changeTwitter} readOnly={readonly}></Input>
            </FormGroup>
            <FormGroup className="col-lg-6 py-2">
                <Label for="github">Github</Label>
                <Input className={"soc-input"+(readonly ? "" : "-edit")} type="text" id="github" name="github" placeholder="Enter GitHub link" value={github} onChange={changeGithub} readOnly={readonly}></Input>
            </FormGroup>
            <FormGroup className="col-lg-6 py-2">
                <Label for="linkedin">LinkedIn</Label>
                <Input className={"soc-input"+(readonly ? "" : "-edit")} type="text" id="linkedin" name="linkedin" placeholder="Enter LinkedIn link" value={linkedin} onChange={changeLinkedin} readOnly={readonly}></Input>
            </FormGroup>
            {!readonly && <button type="submit" className="sub-button">Save</button>}
        </Form>
    </div>);
}

export default SocialForm;