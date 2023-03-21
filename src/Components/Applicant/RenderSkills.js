import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    margin: theme.spacing(0.5),
    color: "#ffffff",
    background: "#e9896a"
  },
}));

export default function ChipsArray(props) {
  const classes = useStyles();
  const skills = props.data;
  const [chipData, setChipData] = useState(skills);
  const [isEmpty, setIsEmpty] = useState(false);
  
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
    if(!chipData.length){
      setIsEmpty(true);
    }
    axios({
			method: 'delete',
			url: "http://localhost:1234/Applicant/"+props.aid+"/delete/skill",
			headers: {}, 
			data: {
			  skill: chipToDelete, // This is the body part
			}
		  });
  };

  return (<div>
    {!isEmpty && <ul className={classes.root}>
      {chipData.map((skill, ind) => {
        let icon;

        return (
          <li key={ind}>
            { props.edit && 
            <Chip
              icon={icon}
              label={skill}
              onDelete={handleDelete(skill)}
              className={classes.chip}
            /> }
            {!props.edit && 
            <Chip
              label={skill}
              className={classes.chip}
            />}
          </li>
        );
      })}
    </ul>}
    </div>
  );
}
