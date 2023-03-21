import React, {useState} from 'react';
import 
{
  Form, 
  Input,
  Button,
  FormGroup,
  Label
} from 'reactstrap';
import axios from 'axios';
import {FaEdit} from 'react-icons/fa';

function ProfileImage(props)
{
    const aid = props.aid;
    const [readonly, setReadonly] = useState(props.readonly);
    const personal = props.personal;

    const [image, setImage] = useState(personal.image ? personal.image : "");

    const onChange = e => {
        const newFile = e.target.files[0];
        setImage(newFile);
    }

    const onEdit = e => {
        setReadonly(false);
    }

    const onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        axios.post("http://localhost:1234/Applicant/"+aid+"/updateimage", formData,{
            headers: {
                'content-type' : 'application/json'
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });

        window.location.reload(true);
    }

    return(<div className="py-3 profileimage">
        
        <Form className="row mx-auto" encType="multipart/form-data">
            <FormGroup className="col-lg-12 py-2">
                    <img className="profilepic my-2" src={personal.image} alt="Profile Image"></img>
                    {!readonly && <Input className="image-input" type="file" accept=".png, .jpg, .jpeg" name="photo" id="photo" onChange={onChange} readOnly={readonly}></Input>}
            </FormGroup>
            {!readonly && <button type="submit" className="sub-button" onClick={onSubmit}>Save</button>}
            {readonly && <button className="pic-button" onClick={onEdit}>Edit Profile Picture <span className="p-icon-edit"><FaEdit size={24} style={{'color':'#e9896a'}}></FaEdit></span></button>}
        </Form>

    </div>);
}

export default ProfileImage;