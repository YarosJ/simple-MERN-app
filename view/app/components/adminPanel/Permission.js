import React, {Component} from 'react';
import './Permissions.less';
import ReactDOM from "react-dom";
import ModalWindow from "../ModalWindow";
import axios from "axios/index";
import {connect} from "react-redux";
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Permission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addMethod: null
        };
    }

    deletePermission(method, title, role) {
        toast("Wow so easy !");
        if (confirm('Are you sure you want to delete this?')) {
            this.props.onDeletePermission(method, title, role);
        }
    }

    handleOptionChange(changeEvent) {
        this.setState({
            addMethod: changeEvent
        });
    }

    addPermission(title, role) {
        ReactDOM.render(
            <ModalWindow type="html">
                <CheckboxGroup
                    checkboxDepth={2} // This is needed to optimize the checkbox group
                    name="methods"
                    value={this.state.addMethod}
                    onChange={this.handleOptionChange.bind(this)}>
                    <label><Checkbox value="get"/> Get</label>
                    <label><Checkbox value="view"/> View</label>
                    <label><Checkbox value="create"/> Create</label>
                    <label><Checkbox value="edit"/> Edit</label>
                    <label><Checkbox value="put"/> Put</label>
                    <label><Checkbox value="post"/> Post</label>
                    <label><Checkbox value="delete"/> Delete</label>
                    <label><Checkbox value="*"/> All</label>
                </CheckboxGroup>
                <p>
                    <button onClick={() => this.props.onAddPermission(title, role, this.state.addMethod)}>
                        Ok
                    </button>
                    <button>Cancel</button>
                </p>
            </ModalWindow>,

            document.getElementById('modal'));
    }

    render() {
        return (
            <div className='title'>
                {this.props.title}
                <span onClick={() => this.props.onRemoveResource(this.props.title, this.props.role)}>#Remove Resource#</span>
                {
                    this.props.children.map((method, index) =>
                        <div key={index} className='permissions'
                             onClick={this.deletePermission.bind(this, method, this.props.title, this.props.role)}>
                            <ToastContainer />
                            {method}
                        </div>
                    )
                }
                <span onClick={this.addPermission.bind(this, this.props.title, this.props.role)}>+</span>
            </div>
        );
    }
}

export default connect(
    state => ({
        permissions: state.permissions
    }),

    dispatch => ({
        onAddPermission: (title, role, method) => {
            axios.post('/roles', {roles: role, resources: title, permissions: method})
                .then((response) => {
                    dispatch({
                        type: 'ADD_PERMISSION_TO_ROLE',
                        payload: response.data
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        onDeletePermission: (method, title, role) => {
            axios.post('/roles/delete/permission', {roles: role, resources: title, permissions: method})
                .then((response) => {
                    dispatch({type: 'REMOVE_PERMISSION_FROM_ROLE', payload: response.data});
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        // onDeleteResource:
    }),
)(Permission);
