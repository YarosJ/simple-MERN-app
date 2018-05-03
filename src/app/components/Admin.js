import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Admin extends Component {

    render() {
        return (
            <div className="admin">
                <div className="admin-toolbar">
                    <ul>
                        <li><NavLink exact to="admin/users" activeClassName='active'>Users</NavLink></li>
                        <li><NavLink exact to="admin/employees" activeClassName='active'>Employees</NavLink></li>
                        <li><NavLink exact to="admin/slides" activeClassName='active'>Slides</NavLink></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Admin;