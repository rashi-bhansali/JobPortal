import React, {useState} from 'react';
import {FaEdit} from 'react-icons/fa';
import {FaAddressCard} from 'react-icons/fa';
import ContactForm from './ContactForm';
import {MdContactPhone} from 'react-icons/md';

function RenderContact(props)
{
    const aid = props.aid;
    const contact = props.contact;
    const [empty, setEmpty] = useState(props.empty);

    const [isEdit1, setEdit1] = useState(false);
    function editAddress()
    {
        setEdit1(true);
    }

    const [isEdit2, setEdit2] = useState(false);
    function editContact()
    {
        setEdit2(true);
    }

    return(<div>
        <div className="row profile-head mt-4">
            <div className="col-md-9"><h4>Address Details <span className="p-icons"><FaAddressCard size={30}/></span></h4></div>
            <div className="col-md-3 p-icon">
                <h6><button onClick={editAddress}>Edit Address <span><FaEdit size={24} style={{'color':'#e9896a'}}></FaEdit></span></button></h6>
            </div> 
        </div>

        {!isEdit1 && !empty && <ContactForm contact={contact} aid={aid} readonly={true} address={true} phone={false}></ContactForm>}
        {(isEdit1 || empty) && <ContactForm contact={contact} aid={aid} readonly={false} address={true} phone={false}></ContactForm>}

        <div className="row profile-head mt-4">
            <div className="col-md-9"><h4>Contact Details <span className="p-icons"><MdContactPhone size={30}/></span></h4></div>
            <div className="col-md-3 p-icon">
                <h6><button onClick={editContact}>Edit Contact <span><FaEdit size={24} style={{'color':'#e9896a'}}></FaEdit></span></button></h6>
            </div> 
        </div>

        {!isEdit2 && <ContactForm contact={contact} aid={aid} readonly={true} phone={true} address={false}></ContactForm>}
        {isEdit2 && <ContactForm contact={contact} aid={aid} readonly={false} phone={true} address={false}></ContactForm>}

    </div>);
}

export default RenderContact;