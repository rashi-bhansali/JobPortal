import React, { useState }  from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import {IoIosAddCircle} from 'react-icons/io'; 
import {BsStarHalf} from 'react-icons/bs';



function Skills(props){
  const [defaultList, setDefaultList] = useState([1]);
  const [skills, setSkillArray] = useState([]);
	const [list,setList] = useState(defaultList.slice(0,1));
	const [index,setIndex] = useState(1);
  const [showButton, setShowButton] = useState(false);
	
	const loadMore = e => {
    e.preventDefault();	
		const newIndex = index + 1;
    defaultList.push(newIndex);
    setDefaultList(defaultList);
    const newList = defaultList.slice(0,newIndex);	
		setList(newList);
    setIndex(newIndex);
	}
  const changeSkill = e => {
		skills.push(e.target.value);
    setSkillArray(skills);
    if(index<=30)
      setShowButton(true);
  }

  function renderForm(ele){
    return (<FormGroup row className="skillform">
              <Label for="skill" sm={1}>Skill</Label>
              <Col sm={10}>
              <Input type="text" name="skills[]" id="skill" onChange={changeSkill}/>
              </Col>
              <Col sm={1}>
              { showButton && <button onClick={loadMore} className="r-icons"><IoIosAddCircle size={30}/></button>}
              </Col>
            </FormGroup>);
  }


  const url = "http://localhost:1234/Applicant/"+props.aid+"/update/skill";
   return(<div className="row">
              <div className="col-md-2 r-icons pt-5 pl-5">
				          <BsStarHalf size={60}></BsStarHalf>
              </div>
              <div className="col-md-10">
                <Form action={url} method="POST">
                  <FormGroup row></FormGroup>
                  <div>
                      {list.map(renderForm)}
                  </div> 
                  <FormGroup row>
					            <Col sm={{ size: 2, offset: 5 }}>
                        <Input type="submit" value="save" className="Submitbutton"/>
					            </Col>
		              </FormGroup>
                </Form>
              </div>
          </div>
  );
};

export default Skills;