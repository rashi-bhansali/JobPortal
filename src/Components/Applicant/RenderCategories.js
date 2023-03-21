import React, {useState} from 'react';
import {FaEdit} from 'react-icons/fa';
import {IoGrid} from 'react-icons/io5';
import CategoriesForm from './CategoriesForm';
import '../Styles/Applicant/RenderCategories.css';
import Chip from '@material-ui/core/Chip';

function RenderCategories(props)
{
    const aid = props.aid;
    const categories = props.categories;
    const empty = props.empty;

    const [isEdit, setIsEdit] = useState(false);

    function editCategories(){
		setIsEdit(true);
	}

    function editFalse()
    {
        setIsEdit(false);
    }

    return(<div>
            <div className="row profile-head mt-4">
                <div className="col-md-9"><h4>Categories <span className="p-icons"><IoGrid size={30}/></span></h4></div>
                <div className="col-md-3 p-icon">
                    <h6><button onClick={editCategories}>Edit Categories <span><FaEdit size={24} style={{'color':'#e9896a'}}></FaEdit></span></button></h6>
                </div> 
            </div>
        {!isEdit && !empty && <div className="py-5">
            {categories.map((item) => {return(
                <Chip label={item} className="category-chip"/>
            )})}
        </div>}
        {(isEdit || empty) && <CategoriesForm edit={editFalse} aid={aid} categories={categories} ></CategoriesForm>}
    </div>);
}

export default RenderCategories;