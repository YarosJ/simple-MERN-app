import React, {Component} from 'react';
import {getCookie} from "../../Cookie";

export class Register extends Component {

    render() {
        return (
            <div className="login-form">
                <form action="users/register" method="post">
                    <label>Email:</label>
                    <input type="text" name="email"/>
                    <label>Password:</label>
                    <input type="password" name="password"/>
                    <input type="submit" value="Register"/>
                </form>
            </div>
        );
    }
}

export default Register;