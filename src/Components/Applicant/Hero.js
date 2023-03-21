import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Drawer from './Drawer';
import Typewriter from 'typewriter-effect';
import '../Styles/Applicant/Hero.css';

function ResumeHero(props)
{
        
    const [user,setUser] = useState(props.user);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() =>{
        axios.get("http://localhost:1234/Applicant/"+props.user.aid)
		.then((response) => {
		  const data = response.data;
          setUser(data);
          setIsLoaded(true);
        })
		.catch(() => {
		  //alert("error retrieving data");
		});
    })
    return(<div>
    { isLoaded && <div className="ResumeHero">
        <div className="Brand">
            <a href="http://localhost:3000/Dashboard" style={{color: "white", textDecoration: "none"}}><h2>DreamJobs</h2></a>
        </div>
        <Drawer logout={props.logout} user={user}></Drawer>
    
        <Typewriter
            onInit={(typewriter) => {
                typewriter
                .pauseFor(2500)
                .deleteAll()
                .start();
            }}
            options={{
                strings: [`Hello <span style="color: #e9896a; font-weight: 900;">`+user.name.split(" ")[0]+`</span>`],
                autoStart: true,
                loop: true,
                cursor: "|"
            }}
        />
    </div>}
    </div>
    );
}

export default ResumeHero;