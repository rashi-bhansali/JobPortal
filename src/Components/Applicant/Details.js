import React, { Component}  from 'react';
import axios from 'axios';
import {Table} from 'reactstrap';
import EducationForm from './EducationForm';
import ProjectForm from './ProjectForm';
import RenderEdu from './RenderEdu';
import RenderExp from './RenderExp';
import RenderProj from './RenderProj';
import RenderAch from './RenderAch';
import RenderSkills from './RenderSkills';
import SkillsForm from './SkillsForm';
import RenderPersonal from './RenderPersonal';
import RenderCategories from './RenderCategories';
import RenderContact from './RenderContact';
import RenderSocial from './RenderSocial';
import {FaBirthdayCake, FaBusinessTime, FaFacebook, FaLinkedinIn, FaTwitter, FaUserGraduate, FaGithub} from 'react-icons/fa';
import {IoLocationOutline} from 'react-icons/io5';
import {GiMale, GiFemale, GiMoneyStack} from 'react-icons/gi';
import RenderApplied from './RenderApplied';

class Details extends Component {
	
	state = {
		items: {},
		isLoaded: false,
		isEmpty: true,
		field: this.props.field,
		isEdit: this.props.edit
	};

	componentDidMount() {
		axios.get("http://localhost:1234/Applicant/"+this.props.aid)
		.then((response) => {
		  const data = response.data;
		  console.log(data);
		  this.setState({ items: data, isLoaded: true});
		  console.log("fine1");
		  if(this.state.field=="personal" && Object.keys(data).length){
			this.setState({isEmpty: false});
		  }
		  if(this.state.field=="categories" && data.categories.length)
		  {
			  this.setState({isEmpty: false});
		  }
		  if(this.state.field=="contact")
		  {
			  if(Object.keys(data.address).length)
			  {
				if(data.address.city && data.address.country && data.address.state && data.address.pincode)
				{
					this.setState({isEmpty: false});
				}
			  }
		  }
		  if(this.state.field=="social" && data.socialMedia)
		  {
			this.setState({isEmpty: false});
		  }
		  if(this.state.field=="edu" && data.resume.education.length){
			this.setState({isEmpty: false});
		  }
		  if(this.state.field=="exp" && data.resume.experience.length)
		  {
			this.setState({isEmpty: false});
		  }
		  if(this.state.field=="proj" && data.resume.projects.length){
			this.setState({isEmpty: false});
		  } 
		  if(this.state.field=="ach" && data.resume.achievements.length){
			this.setState({isEmpty: false});
		  }
		  if(this.state.field=="social" && data.socialMedia){
			this.setState({isEmpty: false});
		  }
		  if(this.state.field=="socialIcons" && data.socialMedia){
			this.setState({isEmpty: false});
		  }
		  if(this.state.field=="skill" && data.resume.skills.length){
			this.setState({isEmpty: false});
		  } 
		  if(this.state.field=="applied" && data.applied.length)
		  {
			this.setState({isEmpty: false});
		  }
		  //console.log('Data has been received!!');
		})
		.catch(() => {
		  //alert("error retrieving data");
		});
	}


	render() {
	  const items = this.state.items;
		return (<div>
					{this.state.isLoaded && !this.state.isEmpty && this.state.field=="personal" &&
						<div>
						<RenderPersonal personal={items} aid={this.props.aid}></RenderPersonal>
					</div>}
					{this.state.isLoaded && !this.state.isEmpty && this.state.field=="categories" &&
						<div>
						<RenderCategories empty={false} categories={items.categories} aid={this.props.aid}></RenderCategories>
					</div>}
					{this.state.isEmpty && this.state.field=="categories" && <div>
						<RenderCategories empty={true} categories={items.categories} aid={this.props.aid}></RenderCategories>
					</div>}
					{this.state.isLoaded && !this.state.isEmpty && this.state.field=="contact" &&
						<div>
						<RenderContact empty={false} contact={items} aid={this.props.aid}></RenderContact>
					</div>}
					{this.state.isEmpty && this.state.field=="contact" && <div>
						<RenderContact empty={true} contact={items} aid={this.props.aid}></RenderContact>
					</div>}
					{this.state.isLoaded && !this.state.isEmpty && this.state.field=="social" &&
						<div>
						<RenderSocial empty={false} social={items.socialMedia} aid={this.props.aid}></RenderSocial>
					</div>}
					{this.state.isEmpty && this.state.field=="social" &&<div>
						<RenderSocial empty={true} social={items} aid={this.props.aid}></RenderSocial>
					</div>}
					{this.state.isLoaded && !this.state.isEmpty && this.state.field=="applied" && <div>
						<Table>
							<thead>
							  <tr>
								<th>Applied Job</th>
								<th>Position</th>
								<th>Date</th>
								<th>Status</th> 
								<th></th>
							  </tr>
							</thead>
							
							{items.applied.map((job) => {
								return <RenderApplied empty={false} aid={this.props.aid} applied={job} ></RenderApplied>
							})}
							</Table>						
						</div>
					}		
					{this.state.isEmpty && this.state.field=="applied" &&< div>
						<div>No Applied Jobs :(</div>
					</div>}
					
					{this.state.isLoaded && !this.state.isEmpty && this.state.field=="edu" &&
						<div>
							{!this.state.isEdit && 
							<div>
								<div className="row mt-5 pl-5 field">
									<h3>Education</h3>
								</div>
								<div className="row view"><hr></hr></div>
							</div>}
							{items.resume.education.map((edu) => {
								return(<div><RenderEdu edu={edu} aid={this.props.aid} edit={this.state.isEdit}></RenderEdu></div>)
							})}
						</div>
					}
					{this.state.isEmpty && this.state.isEdit && this.state.field=="edu" && <EducationForm aid={this.props.aid} update={false}/>}
					
					{/* since experience is optional, if there's no data, no need to display form */}
					{this.state.isLoaded && !this.state.isEmpty && this.state.field=="exp" && 
						<div>
							{!this.state.isEdit && 
							<div>
								<div className="row mt-5 pl-5 field">
									<h3>Work Experience</h3>
								</div>
								<div className="row view"><hr></hr></div>
							</div>}
							{items.resume.experience.map((exp, ind) => {
								return(<div><RenderExp exp={exp} aid={this.props.aid} expid={ind} edit={this.state.isEdit}></RenderExp></div>)
							})}
						</div>
					}
					
					{this.state.isLoaded && !this.state.isEmpty && this.state.field=="skill" && 
						<div>
							{!this.state.isEdit && <div>
								<div className="row mt-5 pl-2 field">
									<h3>Skills</h3>
								</div>
								<div className="row view"><hr></hr></div>
							</div>}
							<div className="row mx-0 field"> 
								<RenderSkills data={items.resume.skills} aid={this.props.aid} edit={this.state.isEdit}/>
							</div>
						</div>
					}
					{this.state.isEmpty && this.state.isEdit && this.state.field=="skill" && <SkillsForm aid={this.props.aid} />}
					
					{this.state.isLoaded && !this.state.isEmpty && this.state.field=="proj" &&
						<div>
							{!this.state.isEdit && <div>
								<div className="row mt-5 pl-5 field">
									<h3>Portfolio</h3>
								</div>
								<div className="row view"><hr></hr></div>
							</div>}
							{items.resume.projects.map((proj, ind) => {
								return(<div><RenderProj proj={proj} aid={this.props.aid} pid={ind} edit={this.state.isEdit}/></div>)
								})
							}
						</div>
					}
					{this.state.isEmpty && this.state.isEdit && this.state.field=="proj" && <ProjectForm aid={this.props.aid} update={false}/>}
					
					{/* since achievements are optional, if there's no data, no need to display form */}
					{this.state.isLoaded && !this.state.isEmpty && this.state.field=="ach" &&
						<div>
							{!this.state.isEdit && <div>
								<div className="row mt-5 pl-5 field">
									<h3>Achievements</h3>
								</div>
								<div className="row view"><hr></hr></div>
							</div>}
							{items.resume.achievements.map((ach, ind) => {
								return(<div><RenderAch ach={ach} aid={this.props.aid} achid={ind} edit={this.state.isEdit}/></div>)
							})}
						</div>
					}
					{this.state.isLoaded && !this.state.isEdit && this.state.field=="about" &&
					<div>
						<div className="row mt-5 pl-5 pt-2 field">
							<h3>About Me</h3>
						</div>
						<div className="row view"><hr></hr></div>
						<div className="col-md-10 about"><p>{items.about}</p></div>
					</div>
					}
					{this.state.isLoaded && !this.state.isEdit && this.state.field=="personalDetails" &&
					<div>
							<ul className="view candname">
								<img className="profileImg" src={items.image}/>
								<h4>{items.name}</h4>
								<li className="currentJob">{items.currentJob} <span className="currentCompany">at {items.currentCompany}</span></li>
								<li>{items.email}</li>
								<li><span className="r-icons dob"><FaBirthdayCake size={20}/></span>{items.dob.split("T")[0]}</li>
								<li><span className="r-icons address"><IoLocationOutline size={20}/></span>{items.address.city}, {items.address.state}, {items.address.country}</li>
							</ul>
					</div>
					}
					{this.state.isLoaded && !this.state.isEdit && this.state.field=="overview" &&
					<div>
						<div className="row mt-5 pt-2 mr-0 field">
							<h4>Job Overview</h4>
						</div>
						<div className="row overview">
							<ul>
								{items.gender!="" && <li><span className="r-icons">
									{items.gender=="Male" && <GiMale size={20}/>}
									{items.gender=="Female" && <GiFemale size={20}/>}
									</span>
									Gender<span className="overview_value">{items.gender}</span>
								</li>} 
								{items.experience!="" && <li>
									<span className="r-icons"><FaBusinessTime size={20}/>
									</span>
									Experience<span className="overview_value">{items.experience}</span>
								</li>}
								{items.qualification!="" && <li>
									<span className="r-icons"><FaUserGraduate size={20}/>
									</span>
									Qualification<span className="overview_value">{items.qualification}</span>
								</li>}
								{items.currentSalary!="" && <li>
									<span className="r-icons"><GiMoneyStack size={24}/>
									</span>
									Salary<span className="overview_value">{items.currentSalary}</span>
								</li>}
							</ul>
							
						</div>
					</div>
					}
					{this.state.isLoaded && !this.state.isEdit && this.state.field=="socialIcons" &&
					<ul className="socialMedia">
						{items.socialMedia.facebook!="" && <li><a href={items.socialMedia.facebook}><FaFacebook style={{color:"#3b5998"}} size={40}/></a></li>}
						{items.socialMedia.linkedin!="" && <li><a href={items.socialMedia.linkedin}><FaLinkedinIn style={{color:"#0077b5"}} size={40}/></a></li>}
						{items.socialMedia.twitter!="" && <li><a href={items.socialMedia.twitter}><FaTwitter style={{color:"#00acee"}} size={40}/></a></li>}
						{items.socialMedia.github!="" && <li><a href={items.socialMedia.github}><FaGithub style={{color:"#333"}} size={40}/></a></li>}
					</ul>
					}
					</div>
		);
   }
}
export default Details;
