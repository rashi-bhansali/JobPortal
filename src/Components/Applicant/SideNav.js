import React from 'react';
import {AiOutlineUser} from 'react-icons/ai';
import {AiOutlineProfile} from 'react-icons/ai';
import {IoPaperPlaneOutline} from 'react-icons/io5';
import {IoKeyOutline} from 'react-icons/io5';
import {IoLogOutOutline} from 'react-icons/io5';
import {IoWalletOutline} from 'react-icons/io5';

import '../Styles/Applicant/SideNav.css';

function SideNav(props)
{
    return(
    <div className="widget">
        <ul>
            <li><a href="/profile"><span className="icons"><AiOutlineUser size={18}/></span>Profile</a></li>
            <li><a href="/buildResume"><span className="icons"><AiOutlineProfile size={18}/></span>Build Resume</a></li>
            <li><a href="/applied#appliedjobs"><span className="icons"><IoPaperPlaneOutline size={18}/></span>Applied Jobs</a></li>
            <li><a href="/resume"><span className="icons"><IoWalletOutline size={18}/></span>Resume</a></li>
            <li><a onClick={props.logout}><span className="icons"><IoLogOutOutline size={18}/></span>Logout</a></li>
        </ul>
    </div>
    );
}

export default SideNav;