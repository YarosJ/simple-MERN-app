import React, {Component} from 'react';
import ReactDOM from "react-dom";
import './Permissions.less';
import axios from "axios/index";
import {connect} from "react-redux";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPermissionModal from './AddPermissionModal';

class Permission extends Component {

    deletePermission(method, title, role) {
        toast("Wow so easy !");
        if (confirm('Are you sure you want to delete this?')) {
            this.props.onDeletePermission(method, title, role);
        }
    }

    showModal(title, role) {
        ReactDOM.render(
            <AddPermissionModal store={this.props.store} title={title} role={role}/>,
            document.getElementById('modal'));
    }

    render() {
        return (
            <div className='permissions'>
                <div className='ctr'>
                    <p className='title'>
                        {this.props.title}
                    </p>
                    {
                        this.props.children.map((method, index) =>
                            <div key={index} className='permission'
                                 onClick={this.deletePermission.bind(this, method, this.props.title, this.props.role)}>
                                {method}
                            </div>
                        )
                    }
                    <p className='plus' onClick={this.showModal.bind(this, this.props.title, this.props.role)}>+</p>
                    <ToastContainer/>
                </div>
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
        },

        onDeletePermission: (method, title, role) => {
            let resource = title.replace('/', '%2F');
            axios.delete(`/roles/${role}/resources/${resource}/permissions/${method}`)
                .then((response) => {
                    dispatch({type: 'REMOVE_PERMISSION_FROM_ROLE', payload: response.data});
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }),
)(Permission);
