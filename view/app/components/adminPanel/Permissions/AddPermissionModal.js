import React, {Component} from 'react';
import ModalWindow from "../../ModalWindow";
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import axios from "axios/index";
import {connect} from "react-redux";

class AddPermissionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addMethod: null
        };
    }

    handleOptionChange(changeEvent) {
        this.setState({
            addMethod: changeEvent
        });
    }

    render() {
        return (
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
                    <button onClick={() => this.props.onAddPermission(this.props.title, this.props.role, this.state.addMethod)}>
                        Ok
                    </button>
                    <button>Cancel</button>
                </p>
            </ModalWindow>
        );
    }
}

export default connect(
    state => ({
        permissions: state.permissions
    }),

    dispatch => ({
        onAddPermission: (title, role, method) => {
            axios.post('/roles', {role: role, resource: title, permission: method})
                .then((response) => {
                    dispatch({
                        type: 'ADD_PERMISSION_TO_ROLE',
                        payload: response.data
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }),
)(AddPermissionModal);