import React, {useState} from 'react';
import axios from 'axios';
import '../Styles/Applicant/RenderPersonal.css';
import {FaEdit} from 'react-icons/fa';
import {AiOutlineProfile} from 'react-icons/ai';
import PersonalForm from './PersonalForm';
import ProfileImage from './ProfileImage';
import Profile from './Profile';

function RenderPersonal(props)
{
    const [isEdit, setIsEdit] = useState(false);
    const personal = props.personal;
    const aid = props.aid;

    // profile image
    const [isEdit2, setEdit2] = useState(personal.image ? false : true);

    function editPersonal(){
		setIsEdit(true);
	}

    return(
        <div>
            {!isEdit2 && <ProfileImage personal={personal} aid={aid} readonly={true}></ProfileImage>}
            {isEdit2 && <ProfileImage personal={personal} aid={aid} readonly={false} ></ProfileImage>}

            <div className="row profile-head mt-4">
                <div className="col-md-9"><h4>Personal Details <span className="p-icons"><AiOutlineProfile size={30}/></span></h4></div>
                <div className="col-md-3 p-icon">
                    <h6><button onClick={editPersonal}>Edit Profile <span><FaEdit size={24} style={{'color':'#e9896a'}}></FaEdit></span></button></h6>
                </div> 
            </div>
            
            {!isEdit && < PersonalForm personal={personal} aid={aid} readonly={true} />}
            {isEdit && <PersonalForm personal={personal} aid={aid} readonly={false}/>}
        </div>
    );
}

export default RenderPersonal;