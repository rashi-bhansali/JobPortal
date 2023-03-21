import React, {useState} from 'react';
import {FaEdit} from 'react-icons/fa';
import {FaAddressCard} from 'react-icons/fa';
import SocialForm from './SocialForm';
import {IoIosContacts} from 'react-icons/io';

function RenderSocial(props)
{
    const social = props.social;
    const [empty, setEmpty] = useState(props.empty);
    const aid = props.aid;

    const [isEdit, setEdit] = useState(false);
    function editSocial()
    {
        setEdit(true);
    }

    return(<div>
        <div className="row profile-head mt-4">
            <div className="col-md-9"><h4>Social Links <span className="p-icons"><IoIosContacts size={30}/></span></h4></div>
            <div className="col-md-3 p-icon">
                <h6><button onClick={editSocial}>Edit Social Info <span><FaEdit size={24} style={{'color':'#e9896a'}}></FaEdit></span></button></h6>
            </div> 
        </div>

        {!isEdit && !empty && <SocialForm social={social} aid={aid} readonly={true} ></SocialForm>}
        {(isEdit || empty) && <SocialForm social={social} aid={aid} readonly={false}></SocialForm>}

    </div>);
}

export default RenderSocial;