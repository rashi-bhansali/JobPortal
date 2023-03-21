import React, {useState, Component} from 'react';
import 
{
  Form, 
	Input,
  Button
} from 'reactstrap';
import { Modal } from 'rsuite';
import { Divider } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import {IoKeyOutline} from 'react-icons/io5';
import {AiOutlineUser} from 'react-icons/ai';

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";


class Login extends Component{
    constructor() {
        super();
        this.state = {
          username: "",
          password: "",
          candidate: true,
          employer: false,
          errors: {}
        };
        this.control = this.control.bind(this);
      }

      componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/Dashboard");
        }
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push('/Dashboard'); // push user to dashboard when they login
        }
        // else if(!nextProps.auth.start)
        // {
        //    alert("Wrong Credentials");
        // }
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
        const userData = {
          username: this.state.username,
          password: this.state.password
        };
        console.log(userData);
        this.props.loginUser(userData);

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

        return(
            <Modal show={this.props.login} onHide={this.props.close} backdrop="static" size="xs">
                <Modal.Header>
                </Modal.Header>
                <Modal.Body>
                    <h3 className="modalHeading">User Login</h3>
                    <Button className={"controlbutton " + (this.state.candidate ? "selected" : "")} onClick={this.control}>Candidate</Button>{' '}
                    {/* <Button className={"controlbutton " + (this.state.employer ? "selected" : "")} onClick={this.control}>Employer</Button> */}
                    <Form noValidate onSubmit={this.onSubmit} className="pt-4">
                        <div className="cfield">
                            <Input type="text" name="username" id="username" placeholder="Username" onChange={this.onChange} value={this.state.name} error={errors.email}
                              pattern="[A-Za-z0-9_]+" required />
                            <AiOutlineUser className="icon" size={24}/>
                        </div>
                        <div className="cfield">
                            <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} value={this.state.password} error={errors.password}
                              pattern=".{8,}" required/>
                            <IoKeyOutline className="icon" size={24}/>
                        </div>
                        <div className="cfield">
                        <Input type="submit" value="Login" className="Submitbutton"/>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        );

    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

  export default connect(
    mapStateToProps,
    { loginUser }
  )(withRouter(Login));