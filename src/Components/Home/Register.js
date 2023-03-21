import React, {useState, Component} from 'react';
import 
{
    Form,
	Input,
    Button,
    Label
} from 'reactstrap';
import { Modal } from 'rsuite';
import { Divider } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import {AiOutlineMail} from 'react-icons/ai';
import {AiOutlinePhone} from 'react-icons/ai';
import {IoKeyOutline} from 'react-icons/io5';
import {AiOutlineUser} from 'react-icons/ai';
import { HiOutlineIdentification } from "react-icons/hi"
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import Login from "./Login";

var alert = require('alert');

class Register extends Component{
    constructor() {
        super();
        this.state = {
          username: "",
          name: "",
          email: "",
          password: "",
          phoneno: "",
          candidate: true,
          employer: false,
          errors: {},
          login: false,
          signup: true
        };

        this.control = this.control.bind(this);
        this.loginopen = this.loginopen.bind(this);
        this.loginclose = this.loginclose.bind(this);

      }

      loginopen() {
        this.setState({ login: true });
        this.setState({signup: false});
      }

      loginclose(){
        this.setState({ login: false });
        }

      componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

    onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
          username: this.state.username,
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          phoneno: this.state.phoneno
        };
        console.log(newUser);
        this.props.registerUser(newUser, this.props.history);
        this.props.close();
        alert("User Registered Succesfully");
    };

    control()
    {
        this.setState({
            candidate: !(this.state.candidate),
            employer: !(this.state.employer)
        });
    }

    render() {
        const { errors } = this.state;
        return (<div>
            {this.state.signup && <Modal show={this.props.signup} onHide={this.props.close} backdrop="static" size="xs">
            <Modal.Header>
            </Modal.Header>
            <Modal.Body>
                <h3 className="modalHeading">Sign Up</h3>
                <Button className={"controlbutton " + (this.state.candidate ? "selected" : "")} onClick={this.control}>Candidate</Button>{' '}
                {/* <Button className={"controlbutton " + (this.state.employer ? "selected" : "")} onClick={this.control}>Employer</Button> */}
                <Form onSubmit={this.onSubmit} className="pt-4">
                    <div className="cfield">
                        <Input type="text" name="username" id="username" placeholder="Username" 
                               onChange={this.onChange} value={this.state.username} error={errors.username} 
                               pattern="[A-Za-z0-9_]+" title="Username can only contain Alphabets and underscore(_)" required/>
                        <AiOutlineUser className="icon" size={24}/>
                    </div>
                    <div className="cfield">
                        <Input type="text" name="name" id="name" placeholder="Name" 
                               onChange={this.onChange} value={this.state.name} error={errors.name} 
                               pattern="[A-Za-z ]+" title="Name can only contain Alphabets" required/>
                        <HiOutlineIdentification className="icon" size={24}/>
                    </div>
                    <div className="cfield">
                        <Input type="password" name="password" id="password" placeholder="Password" 
                            onChange={this.onChange} value={this.state.password} error={errors.password} 
                            pattern=".{8,}" title="Password must be atleast 8 characters long" required/>
                        <IoKeyOutline className="icon" size={24}/>
                    </div>
                    <div className="cfield">
                        <Input type="email" name="email" id="email" placeholder="Email" 
                            onChange={this.onChange} value={this.state.email} error={errors.email} required/>
                        <AiOutlineMail className="icon" size={24}/>
                    </div>
                    <div className="cfield">
                        <Input type="tel" name="phoneno" id="phoneno" placeholder="Phone no" 
                            onChange={this.onChange} value={this.state.phoneno} error={errors.phoneno} 
                            pattern="[0-9]{10}" title="Phone number must contain 10 digits only (0-9)" required/>
                        <AiOutlinePhone className="icon" size={24}/>
                    </div>
                    <div className="cfield">
                    <Input type="submit" value="Sign Up" className="Submitbutton"/>
                    </div>
                    <div className="cfield mt-3">
                    <Label><a onClick={this.loginopen} className="signin">Sign In</a></Label>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>}
        {!this.state.signup && <Login open={this.loginopen} close={this.loginclose} login={this.state.login}/>}
        </div>
        );}
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));