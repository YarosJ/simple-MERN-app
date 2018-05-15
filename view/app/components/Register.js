import React, {Component} from 'react';
import {connect} from "react-redux";
import axios from "axios/index";
import validateField from "../../../helpers/Validate";
import {Redirect} from 'react-router';

export class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: 'example@ex.com',
            password: 'password123',
            redirect: false,
            validationStatus: {
                emailStatus: '',
                passwordStatus: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        let validationStatus = JSON.parse(JSON.stringify(this.state.validationStatus));
        validationStatus.emailStatus = validateField('email', this.state.email);
        validationStatus.passwordStatus = validateField('password', this.state.password);

        this.setState({validationStatus: validationStatus});

        if (validationStatus.emailStatus.length === 0 && validationStatus.passwordStatus.length === 0) {
            this.props.onRegister({
                password: this.state.password,
                email: this.state.email
            });
            this.setState({redirect: true});
        } else {
            console.log('password:' + validationStatus.passwordStatus);
            console.log('email:' + validationStatus.emailStatus);
        }
    }

    componentDidMount() {
        this.setState({email: this.email.value});
        this.setState({password: this.password.value});
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to='/'/>
        }

        return (
            <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                    <label>Email:</label>
                    {!!this.state.validationStatus.emailStatus &&
                    <label>{this.state.validationStatus.emailStatus}</label>}
                    <input type="text" name="email"
                           value={this.state.email}
                           onChange={this.handleChange}
                           ref={(email) => {
                               this.email = email;
                           }}/>
                    <label>Password:</label>
                    {!!this.state.validationStatus.passwordStatus &&
                    <label>{this.state.validationStatus.passwordStatus}</label>}
                    <input type="password" name="password"
                           value={this.state.password}
                           onChange={this.handleChange}
                           ref={(password) => {
                               this.password = password;
                           }}/>
                    <input type="submit" value="Register"/>
                </form>
            </div>
        );
    }
}

export default connect(
    state => ({
        session: state.session
    }),

    dispatch => ({

        onRegister: (data) => {
            axios.post('/users/register', data)
                .then((response) => {
                    dispatch({
                        type: 'SET_SESSION',
                        payload: {email: response.data.email, role: response.data.rights}
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    })
)(Register);