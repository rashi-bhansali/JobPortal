import React, {useState} from 'react';
import { Modal } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import {FaWarehouse, FaBusinessTime} from 'react-icons/fa';
import {IoLocationOutline} from 'react-icons/io5';
import {AiOutlineUser} from 'react-icons/ai';
import {AiFillStar} from 'react-icons/ai';
import {BiRupee} from 'react-icons/bi';
import axios from 'axios';
import '../Styles/Applicant/Apply.css';

function Apply(props)
{
    var deadline = props.deadline.split("T")[0];

    function handleApply(e){
      var appid;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      axios({
        method: 'post',
        url: "http://localhost:1234/Application/create",
        headers: {}, 
        data: {
          jid: props.jid,
          aid: props.aid,
          date: today // This is the body part
        }
        }).then((res) =>{
            appid = res.data;
            axios({
              method: 'post',
              url: "http://localhost:1234/Applicant/"+props.aid+"/update/apply",
              headers: {}, 
              data: {
                appid: appid// This is the body part
              }
            });
            axios({
              method: 'put',
              url: "http://localhost:1234/Job/"+props.jid+"/updateApp/add",
            });
        alert("Application Submitted Successfully!");
        window.location.assign("http://localhost:3000/applied#appliedjobs");
    });
  }

    return (
    <div>
        <Modal show={props.apply} onHide={props.close} backdrop="static" size="sm">
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
        <h3 className="modalHeading">Apply for Job</h3>
        <div className="compdetails row mx-0">
          <div className="col-md-2"></div>
          <div className="col-md-3 companylogo">
              <img src={props.src} />
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-6 pt-3">
               <div><h6><FaWarehouse size={18} className="r-icons" style={{'marginRight':'0.8rem'}}/>{props.company} </h6></div>
               <div><h6><IoLocationOutline size={18} className="r-icons" style={{'marginRight':'0.8rem'}}/>{props.loc} </h6></div>
          </div>
        </div>
        <div className="jobdetails">
          <h5 style={{fontWeight: "bold"}}><AiOutlineUser size={24} className="r-icons"/> {props.role}</h5>
          <ul>{props.skills.map(item => {
            return <li className="skillspan">{item}</li>
          })}</ul>
          <p>{props.desc}</p>
          <h6><AiFillStar size={18} className="r-icons" /> {props.perks}</h6>
          <div className="row mx-0 jobdeets">
            <div className="col col-md-4">
              <h6 style={{fontWeight: "bold"}}><FaBusinessTime size={18} className="r-icons" style={{'marginRight':'0.8rem'}}/>{props.dur+" months"}</h6>
            </div>
            <div className="col col-md-4">
                <h6 style={{fontWeight: "bold"}}><BiRupee size={24} className="r-icons" />{props.salary+" p.m"}</h6>
            </div>
            <div className="col col-md-4">
                <h6 style={{fontWeight: "bold"}}>No. of Openings: {props.pos}</h6>
            </div>
        </div>
        <p>Last Date to Apply: <span style={{'color':'#E74C3C'}}>{deadline.split("-")[2]+"/"+deadline.split("-")[1]+"/"+deadline.split("-")[0]}</span></p>
        </div>
        <div className="confirm">
          <button className="apply" onClick={handleApply}>Apply</button>
          <button className="cancel" onClick={props.close}>Cancel</button>
        </div>
        <div>
        </div>
        </Modal.Body>
        </Modal>
    </div>);
}

export default Apply;
