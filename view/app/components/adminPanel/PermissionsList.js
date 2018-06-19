import React, {Component} from 'react';
import axios from "axios/index";
import {connect} from "react-redux";
import Permission from "./Permission.js";

class PermissionsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            permissions: [],
            role: null
        };
    }

    addResource(role, e) {
        this.props.onAddResource(e.currentTarget.previousSibling.value, role);
    }

    selectRole(e) {
        let role = e.target.options[e.target.selectedIndex].value;
        this.setState({role: role});
        this.props.onGetPermissions(role);
    }

    componentWillMount() {
        this.props.onGetRoles();
    }

    render() {
        return (
            <div>
                Check Role:
                <select onChange={this.selectRole.bind(this)}>
                    {this.props.roles.map((role, index) =>
                        <option key={index} value={role.key}>{role.key}</option>
                    )}
                </select>

                <p>
                    <input type="text" size="40"/>
                    <button onClick={this.addResource.bind(this, this.state.role)}>Add Resource</button>
                </p>

                <ul>
                    {
                        this.props.permissions.map((role, index) =>
                            <Permission key={index} role={this.state.role} title={role[0]}
                                        onRemoveResource={this.props.onRemoveResource}>
                                {role[1]}
                            </Permission>
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default connect(
    state => ({
        roles: state.roles,
        permissions: state.permissions
    }),

    dispatch => ({

        onGetRoles: () => {

            axios.get('/roles')
                .then((response) => {
                    dispatch({type: 'SET_ROLES', payload: response.data});
                }).catch((error) => {
                console.log(error);
            });
        },

        onGetPermissions: (role) => {

            axios.get(`/roles/${role}/rolePermissions`)
                .then((response) => {
                    dispatch({type: 'SET_PERMISSIONS', payload: Object.entries(response.data)});
                }).catch((error) => {
                console.log(error);
            });
        },

        onAddResource: (resource, role) => {
            dispatch({type: 'ADD_RESOURCE_TO_ROLE', payload: {resource: resource, role: role}});
        },

        onRemoveResource: (resource, role) => {
            dispatch({type: 'REMOVE_RESOURCE_FROM_ROLE', payload: {resource: resource, role: role}});
        }
    }),
)(PermissionsList);