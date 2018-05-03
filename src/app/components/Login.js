import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getCookie} from '../../Cookie';

export class Login extends Component {

    render() {
        return (
            <div className="login-form">
                <form action="users/login" method="POST">
                    <input type="hidden" name="email" value={getCookie('email')}/>
                    <label>Password:</label>
                    <input type="password" name="password"/>
                    <input type="submit" value="Log In"/>
                </form>
                <Link to="/register">REGISTER</Link>
                <Link to="/admin">ADMIN PANEL</Link>
            </div>
        );
    }
}

export default Login;