import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../Styles/Applicant/RenderApplied.css';
import {RiDeleteBin5Fill} from 'react-icons/ri';
import {Badge} from 'reactstrap';
import {IoLocationOutline} from 'react-icons/io5';

function RenderApplied(props)
{
    const [appliedlist, setappliedlist] = useState(props.applied)
    const [date, setdate] = useState("")
    const [joblist, setjoblist] = useState({})
    const [complist, setcomplist] = useState({})
    const [isLoaded, setIsLoaded] = useState(false);
    const [status, setStatus] = useState("secondary")
    const [aStatus, setAStatus] = useState("Applied");
    const [isDelete, setIsDelete] = useState(false);

    function handleDelete(e){
      var appid = props.applied;
      axios({
        method: 'delete',
        url: "http://localhost:1234/Application/"+appid+"/delete",
        headers: {}, 
        });
      axios({
        method: 'delete',
          url: "http://localhost:1234/Applicant/"+appliedlist.ApplicantID+"/delete/apply",
          headers: {}, 
          data: {
            appid: appid// This is the body part
          }
        });
      axios({
          method: 'put',
          url: "http://localhost:1234/Job/"+appliedlist.JobID+"/updateApp/del",
        });
      alert("Application Withdrawn Successfully!");
      setIsDelete(true);
  }


    useEffect(() => {
            
            axios.get("http://localhost:1234/Application/"+props.applied)
            .then((res) => { 
                setappliedlist(res.data);
                setdate(new Date(res.data.DoA.split("T")[0]).toString());
                var color = res.data.aStatus;
                
                if(color==1){
                  setStatus("warning");
                  setAStatus("Shortlisted");
                }
                else if(color==2){
                  setStatus("success");
                  setAStatus("Accepted")
                }
                else if(color==3){
                  setStatus("danger");
                  setAStatus("Rejected")
                }

                axios.get("http://localhost:1234/Job/"+res.data.JobID)
                .then((res) => {
                  setjoblist(res.data);
                  
                  axios.get("http://localhost:1234/Company/"+res.data.companyID)
                  .then((res) => {
                    setcomplist(res.data);
                    setIsLoaded(true);
                  })
                })                
            })
    },[]);

    return(<tbody>
        {isLoaded && !isDelete && <tr>
            <td>
                <ul className="appliedcompany">
                   <li>{complist.Company_Name}</li>
                   <li className="appliedlocation"><IoLocationOutline />{complist.Location}</li> 
                </ul>
            </td>
            <td>{joblist.role}</td>
            <td>{ date.split(" ")[1] + " " + date.split(" ")[2] + ", " + date.split(" ")[3] }</td>
            <td><Badge color={status}>{aStatus}</Badge></td>
            <td><button style={{backgroundColor:"transparent"}} onClick={handleDelete}><RiDeleteBin5Fill size={20} className="r-icons"/></button></td>
            </tr>
        }
    </tbody>);
}

export default RenderApplied;