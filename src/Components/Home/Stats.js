import React from 'react';
import '../Styles/Home/Stats.css';
import Counter from './Counter';
import Counterlist from '../Data/Counters';


function Stats(props)
{
  
    return(
        <div>
        <div className="stats">
        <div className="heading pt-5">
            <h1>Job Hunt Site Stats</h1>
            <p>
                How many people we’ve helped find a job and companies have found recruits. It's a pretty awesome stats area!
            </p>
        </div>
        <div className="row pt-5 mx-0">
            {Counterlist.map((count) => {
                return <div className="col-md-3 pb-1">
                <Counter end={count.value} />
                <h5 className="countername">{count.desc}</h5>
               </div>
            })}
        </div>
        </div>
        </div>
    );
}

export default Stats;