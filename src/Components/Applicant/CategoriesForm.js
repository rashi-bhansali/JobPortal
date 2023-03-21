import React, {useState} from 'react';
import 
{
  Form, 
  Input,
  Button,
  FormGroup,
  Label
} from 'reactstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import axios from 'axios';

function CategoriesForm(props)
{
    const [selected, setSelected] = useState(props.categories);
    const aid = props.aid;

    const Categories = ["IT", "Testing", "HR", "Finance","Management", "UI/UX", "Data Science", "Web Development"]

    function handleSelect(selectedList, selectedItem) {
        var val = []
        val = selectedList;
        setSelected(val);
        console.log(val);
    }

    function handleRemove(selectedList, removedItem){
        var val = []
        val = selectedList;
        setSelected(val);
        console.log(val);
    }

    const onSubmit = e => {
        e.preventDefault();
        axios({
			method: 'post',
			url: "http://localhost:1234/Applicant/"+aid+"/update/categories",
			headers: {
                'content-type':'application/json'
            }, 
			data: {
			  categories: selected // This is the body part
			}
		}).then((res) => {
            console.log(res);
        });
        window.location.reload(false);
        //window.location = "http://localhost:3000/profile#categories";
    };

    const url = "http://localhost:1234/Applicant/"+aid+"/update/categories";
    return(<div className="py-3">
        <Form onSubmit={onSubmit} className="Cat-Form row">
            <FormGroup className="col-lg-12 py-2">
                <Label for="categories">Job Domains</Label>
                <Multiselect
                    id="categories"
                    name="categories[]"
                    options={Categories}
                    selectedValues={selected}
                    value={selected}
                    isObject={false}
                    showCheckbox={true}
                    placeholder="Select Your Categories"
                    onSelect={handleSelect}
                    onRemove={handleRemove}
                />
            </FormGroup>
        <button type="submit" className="sub-button">Save</button>
        </Form>
    </div>);
}

export default CategoriesForm;