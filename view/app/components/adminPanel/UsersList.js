import React, {Component} from 'react';
import axios from "axios/index";
import {connect} from "react-redux";
import {getCookie} from "../../../../helpers/Cookie";
import SelectPanel from "./SelectPanel";

class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            canChange: false
        };
    }

    deleteUser(_id, index) {
        if (confirm('Are you sure you want to delete this user?')) {
            this.props.onDeleteUser(_id, index);
        }
    }

    updateUser(_id, value){
        this.props.onUpdateUser({role: value}, _id);
    }

    componentWillMount() {
        this.props.onGetUsers();
        if (getCookie('role') === 'admin') this.setState({canChange: true});
    }

    render() {
        return (
            <table className="users-list">
                <thead>
                    <tr>
                        <th>Email:</th>
                        <th>Role:</th>
                        <th>Created At:</th>
                        <th/>
                    </tr>
                </thead>
                    <tbody>
                    {this.props.users.map((user, index) =>
                        <tr key={index}>
                            <td>{user.email}</td>
                            <td><SelectPanel value={user.role} updateUser={this.updateUser.bind(this, user._id)} /></td>
                            <td>{new Date(user.createdAt).toUTCString()}</td>
                            <td className="delete-user" onClick={this.deleteUser.bind(this, user._id, index)}>X</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default connect(
    state => ({
        users: state.users
    }),

    dispatch => ({

        onGetUsers: () => {
            axios.get('/users')
                .then((response) => {
                    dispatch({type: 'SET_USERS', payload: response.data});
                }).catch((error) => {
                console.log(error);
            });
        },

        onUpdateUser: (role, _id) => { //===========================================================
            axios.put('/users/' + _id, role)
                .then((response) => {
                    dispatch({type: 'UPDATE_USER', payload: response.data});
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        onDeleteUser: (_id, id) => {
            axios.delete('/users/' + _id)
                .then((response) => {
                    dispatch({type: 'REMOVE_USER', payload: id});
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }),
)(UsersList);
