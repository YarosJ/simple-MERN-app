import React, {Component} from 'react';
import ModalWindow from "../../ModalWindow";
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import axios from "axios/index";
import {connect} from "react-redux";
import ReactDOM from "react-dom";
import './AddPermissionModal.less';

class AddPermissionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addMethod: null
        };
    }

    closeWindow(target) {
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(target).parentNode);
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
                    className="checkboxGroup"
                    checkboxDepth={2} // This is needed to optimize the checkbox group
                    name="methods"
                    value={this.state.addMethod}
                    onChange={this.handleOptionChange.bind(this)}>
                    <div className="inputGroup">
                        <Checkbox id="get" value="GET"/>
                        <label htmlFor="get">Get</label>
                    </div>

                    <div className="inputGroup">
                        <Checkbox id="post" value="POST"/>
                        <label htmlFor="post">Post</label>
                    </div>

                    <div className="inputGroup">
                        <Checkbox id="put" value="PUT"/>
                        <label htmlFor="put">Put</label>
                    </div>

                    <div className="inputGroup">
                        <Checkbox id="delete" value="DELETE"/>
                        <label htmlFor="delete">Delete</label>
                    </div>
                </CheckboxGroup>

                <p className="permissionControls">
                    <button
                        onClick={() => {
                            this.props.onAddPermission(this.props.title, this.props.role, this.state.addMethod)
                            this.closeWindow(this);
                        }}>
                        Ok
                    </button>
                    <button
                        onClick={() => {
                            this.closeWindow(this);
                        }}>
                        Cancel
                    </button>
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