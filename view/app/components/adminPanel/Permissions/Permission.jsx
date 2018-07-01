import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios/index';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import styles from './Permission.less';
import 'react-toastify/dist/ReactToastify.css';
import AddPermissionModal from './AddPermissionModal';
import ModalWindow from '../../ModalWindow';

class Permission extends Component {
  deletePermission(method, title, role) {
    ReactDOM.render(
      <ModalWindow type="confirm" onConfirm={() => this.props.onDeletePermission(method, title, role)}>
        <p>Are you sure you want to delete this method?</p>
      </ModalWindow>,
      document.getElementById('modal'),
    );
  }

  showModal(title, role) {
    ReactDOM.render(
      <AddPermissionModal store={this.props.store} title={title} role={role} />,
      document.getElementById('modal'),
    );
  }

  render() {
    return (
      <div className={styles.permissions}>
        <div className={styles.ctr}>
          <p className={styles.title}>
            { this.props.title }
          </p>
          {
            this.props.children.map((method, index) => (
              <div
                key={index}
                className={styles.permission}
                onClick={this.deletePermission.bind(this, method, this.props.title, this.props.role)}>
                { method }
              </div>
            ))
          }
          <p
            className={styles.plus}
            onClick={this.showModal.bind(this, this.props.title, this.props.role)}>
            +
          </p>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    permissions: state.permissions,
  }),

  dispatch => ({
    onAddPermission: (title, role, method) => {
      axios.post('/roles', { role, resource: title, permission: method })
        .then((response) => {
          dispatch({
            type: 'ADD_PERMISSION_TO_ROLE',
            payload: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onDeletePermission: (method, title, role) => {
      const resource = title.replace(new RegExp('/', 'g'), '%2F');
      axios.delete(`/roles/${role}/resources/${resource}/permissions/${method}`)
        .then((response) => {
          dispatch({ type: 'REMOVE_PERMISSION_FROM_ROLE', payload: response.data });
          toast.success('Success!');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }),
)(Permission);
