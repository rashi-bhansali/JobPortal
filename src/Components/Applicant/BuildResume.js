import React, { useState }  from 'react';
import Hero from './Hero';
import SideNav from './SideNav';
import Footer from '../Home/Footer';
import CircularProgress from './CircularProgress';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import ProjectForm from './ProjectForm';
import AchievementForm from './AchievementForm';
import Skills from './SkillsForm';
import Details from './Details';
import "../Styles/Applicant/BuildResume.css";
import {AiOutlineProfile, AiOutlineTrophy} from 'react-icons/ai';
import {IoIosAddCircle, IoIosArrowBack} from 'react-icons/io';
import {CgWorkAlt} from 'react-icons/cg';
import {BsListCheck, BsGraphUp} from 'react-icons/bs';
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";



function BuildResume(props){
	const onLogoutClick = e => {
        e.preventDefault();
        props.logoutUser();
     };
     const { user } = props.auth;
    
    
    const [addEdu, setAddEdu] = useState(false);
	const [addExp, setAddExp] = useState(false);
	const [addSkill, setAddSkill] = useState(false);
    const [addProject, setAddProject] = useState(false);
    const [addAchievement, setAddAchievement] = useState(false);

    const changeAddEdu = () =>{
		setAddEdu(true);
	}
	const changeAddExp = () =>{
		setAddExp(true);
	}
    const changeAddSkill = () =>{
		setAddSkill(true);
	}
    const changeAddProject = () =>{
		setAddProject(true);
	}
    const changeAddAchievement = () =>{
		setAddAchievement(true);
	}

	return(
	<div>
        <Hero logout={onLogoutClick} user={user}/>
        <div className="row mx-0 mt-5 pb-5">
            <div className="col-lg-3" style={{borderRight: "1px solid #eee"}}>
            <button className="goback" onClick={props.history.goBack}><IoIosArrowBack className="backicon" size={24}/><span>Dashboard</span></button>
                <SideNav logout={onLogoutClick} />
                <CircularProgress/>
            </div>
            <div className="col-lg-9">
                <div className="resume-container" id="res">
        
                    <div className="resume-head row">
                        <div className="col md-4 field">
                        <h4>Background <span className="r-icons"><AiOutlineProfile size={30}/></span></h4> 
                        </div>
                        <div className="col md-5"></div>
                        <div className="col-md-3 addEdu">
                            <button onClick={changeAddEdu}><span className="r-icons"><IoIosAddCircle size={30}/></span> Add Education</button>
                        </div>
                        <hr className="resume"></hr>
                    </div>
            
                    <div id="education">
                        <Details aid={user.aid} field={"edu"} edit={true}/>
                        {addEdu && <EducationForm aid={user.aid} update={false}/>}
                    </div>
		    
                    <div className="experience-head row mt-5">
                        <div className="col md-4 field">
                            <h4>Work experience <span className="r-icons"><CgWorkAlt size={30}/></span></h4>
                        </div>
                        <div className="col md-5"></div>
                        <div className="col-md-3 addExp">
                            <button onClick={changeAddExp}><span className="r-icons"><IoIosAddCircle size={30}/></span> Add Experience</button>
                        </div>
                        <hr className="resume"></hr>
                    </div>

                    <div id="experience">
                        <Details aid={user.aid} field={"exp"} edit={true}/>
                        {addExp && <ExperienceForm aid={user.aid} update={false}/>}
                    </div>

                    <div className="skill-head row mt-5">
                        <div className="col md-4 field">
                            <h4>Skills <span className="r-icons"><BsListCheck size={30}/></span></h4>
                        </div>
                        <div className="col md-5"></div>
                        <div className="col-md-3 addSkill">
                            <button onClick={changeAddSkill}><span className="r-icons"><IoIosAddCircle size={30}/></span> Add Skill</button>
                        </div>
                        <hr className="resume"></hr>
                    </div>

                    <div id="skills">
                        <Details aid={user.aid} field={"skill"} edit={true}/>
                        {addSkill && <Skills aid={user.aid}/>}
                    </div>

                    <div className="project-head row mt-5">
                        <div className="col md-4 field">
                            <h4>Portfolio <span className="r-icons"><BsGraphUp size={30}/></span></h4>
                        </div>
                        <div className="col md-5"></div>
                        <div className="col-md-3 addProject">
                            <button onClick={changeAddProject}><span className="r-icons"><IoIosAddCircle size={30}/></span> Add Project</button>
                        </div>
                        <hr className="resume"></hr>
                    </div>

                    <div id="projects">
                        <Details aid={user.aid} field={"proj"} edit={true}/>
                        {addProject && <ProjectForm aid={user.aid} update={false}/>}
                    </div>

                    <div className="achievement-head row mt-5">
                        <div className="col md-4 field">
                            <h4>Achievements<span className="r-icons"><AiOutlineTrophy size={30}/></span></h4>
                        </div>
                        <div className="col md-5"></div>
                        <div className="col-md-3 addAchievement">
                            <button onClick={changeAddAchievement}><span className="r-icons"><IoIosAddCircle size={30}/></span> Add Achievement</button>
                        </div>
                        <hr className="resume"></hr>
                    </div>

                    <div id="achievements">
                        <Details aid={user.aid} field={"ach"} edit={true}/>
                        {addAchievement && <AchievementForm aid={user.aid} update={false}/>}
                    </div>

                </div>
            </div>
        </div>
        <Footer/>
    </div>
	);
}

const mapStateToProps = state => ({
	auth: state.auth
});
export default 
connect(
	mapStateToProps,
	{ logoutUser }
)(BuildResume);