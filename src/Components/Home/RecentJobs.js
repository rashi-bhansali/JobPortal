import React, { useEffect, useState} from 'react';
import Jobs from './Jobs';
import JobList from '../Data/Job';
import '../Styles/Home/RecentJobs.css'
import axios from 'axios';
import {FaEdit} from 'react-icons/fa';
import Chip from '@material-ui/core/Chip';
import 
{
  Form, 
  Input,
  Button,
  FormGroup,
  Label
} from 'reactstrap';
import { Multiselect } from 'multiselect-react-dropdown';
const len = JobList.length;
const limit = 3;


function RecentJobs(props){
	
	const [list,setList] = useState(JobList.slice(0, 6));
	const [index,setIndex] = useState(6);
	const [jobs, setJobs] = useState([]);
	const [isLoaded, setLoaded] = useState(false);
	const [jobLen, setJoblen] = useState(0);
	const [showMore,setShowMore] = useState(props.auth?false:true);
	const [categories, setCategories] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [isRen, setIsRen] = useState(true);

	const Categories = ["IT", "Testing", "HR", "Finance","Management", "UI/UX", "Data Science", "Web Development"]
	
	const loadMore = () => {	
		const newIndex = index + limit;
	
		var newList = []
		var newShowMore = true;
		if(props.auth)
		{
			newShowMore = newIndex < (jobLen - 1);
			newList = list.concat(jobs.slice(index,newIndex));
		}
		else
		{
			newShowMore = newIndex < (len - 1);
			newList = list.concat(JobList.slice(index, newIndex));	
		}
		setIndex(newIndex);
		setList(newList);
		setShowMore(newShowMore);
	}

	function getJobs()
	{	
		axios.get("http://localhost:1234/Job/")
		.then((res)=>{
			setJobs(res.data);	
			axios.get("http://localhost:1234/Application/details/"+props.aid)
			.then((res) => {
				if(res.data.length){
				var applied = res.data;
				var job_id_remove = [];
				applied.map((appJob) => {
					job_id_remove.push(appJob.JobID);
				})
				var newJobs=jobs;
				job_id_remove.map((job_id) => {
					jobs.map((job, ind) => {
						if(job._id==job_id){
							var x = newJobs.splice(ind, 1);
						}
					})
					setJobs(newJobs);
				})
			}
			setList(jobs.slice(0,6));
			setJoblen(jobs.length);
			if(jobs.length>6)
				setShowMore(true);
		})
		setLoaded(true);
		return true;
		})
		.catch((err) => {
			//console.log(err);
		})
	}

	function handleSelect(selectedList, selectedItem) {
        var val = []
        val = selectedList;
        setCategories(val);
		//console.log(categories);
    }

    function handleRemove(selectedList, removedItem){
        var val = []
        val = selectedList;
        setCategories(val);
        //console.log(categories);
    }

	function editCategories(){
		setIsEdit(true);
		if(isRen)
		{
			setIsRen(false);
		}
	}


	function changeJobs(e){
		var jobList = [];
		jobs.map((item)=>{
			let isFounded = item.category.some( elem => categories.includes(elem) );
			if(isFounded)
			{
				jobList.push(item);
			}
		})
		console.log(jobList);
		//setJobs(jobList);
		if(categories.length)
		{
			setList(jobList.slice(0,6));
			setJoblen(jobList.length);
			if(jobList.length>6)
				setShowMore(true);
		}
		else
		{
			setList(jobs.slice(0,6));
			setJoblen(jobs.length);
			if(jobs.length>6)
				setShowMore(true);
		}
		console.log(jobList);
		setIsEdit(false);
	}

	return(
		<div className="RecentJobs">
			<div className="JobHeading pt-5">
				<h1>Recent Jobs</h1>
				<p>
					Leading Employers already using job and talent.
				</p>
			</div>
			{/* FILTER COMPONENT */}
			{props.auth && isLoaded && <div className="row">
				<div className="col-md-3"></div>
				<div className="col-md-6">
					<div className="">
						<Form className="Cat-Form row">
							<FormGroup className="col-lg-12 py-2">
								<Multiselect
									id="categories"
									name="categories[]"
									options={Categories}
									selectedValues={categories}
									value={categories}
									isObject={false}
									showCheckbox={true}
									placeholder="No Filters Selected"
									onSelect={handleSelect}
									onRemove={handleRemove}
									disable={!isEdit}
								/>
							</FormGroup>
						</Form>
					</div>
				</div>
				<div className="col-md-3">
				{isEdit && <button type="submit" className="filter-button mt-2 py-2" onClick={changeJobs}>Apply Filters</button>}
				{!isEdit && <h6 className="py-3"><button onClick={editCategories}>Edit Filters <span><FaEdit size={24} style={{'color':'#e9896a'}}></FaEdit></span></button></h6>}
				</div>
			</div>}
			
			{/* <button className="Filter" style={{'background':'white'}} onClick={getJobsFilter} >Apply Filter for your categories</button> */}
			<div className="Container">
				<div className="row">
							{props.auth && !isLoaded && getJobs()}
							{!props.auth && list.map((job) => { return <div className="col-md-4 px-1"><Jobs auth={props.auth} role={job.role} company={job.company} loc={job.loc} src={job.logo}></Jobs></div>})}
							{console.log(list)}
							{isLoaded && (!isEdit || isRen) && list.map((job) => {
								return <div className="col-md-4 px-1"><Jobs auth={props.auth}  aid={props.aid} compid={job.companyID} role={job.role}
								jobDesc={job.jobDescription} salary={job.salary} dur={job.duration} pos={job.positions} deadline={job.deadline} jid={job._id}></Jobs></div>
							})}
				</div>
				<div className="row">
					{showMore && <button className="More" onClick={loadMore}>Load More Listings</button>}
				</div>
				<div id="stats">
				</div>
			</div>
		</div>
	);
}


export default RecentJobs;