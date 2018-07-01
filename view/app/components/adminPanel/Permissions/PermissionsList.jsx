import React, { Component } from 'react';
import axios from 'axios/index';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Permission from './Permission.jsx';
import AddPermissionModal from './AddPermissionModal';
import styles from './PermissionsList.less';

class PermissionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissions: [],
      role: null,
    };
  }

  addResource(role, e) {
    ReactDOM.render(
      <AddPermissionModal
        store={this.props.store}
        title={e.currentTarget.previousSibling.value}
        role={role}
      />,
      document.getElementById('modal'),
    );
  }

  selectRole(e) {
    const role = e.target.options[e.target.selectedIndex].value;
    this.setState({ role });
    this.props.onGetPermissions(role);
  }

  componentWillMount() {
    this.props.onGetRoles();
    this.props.onGetPermissions('guest');
  }

  render() {
    return (
      <div className={styles.permissionsList}>
        <p className={styles.add}>
          <input type="text" placeholder="/example/:id/ex/" size="40" />
          <button onClick={this.addResource.bind(this, this.state.role)}>
            Add Resource
          </button>
        </p>
        <p className={styles.add}>
          <label>Check Role:</label>
          <select onChange={this.selectRole.bind(this)}>
            { this.props.roles.map((role, index) => (
              <option key={index} value={role.key}>
                { role.key }
              </option>
            )) }
          </select>
        </p>

        <div className={styles.list}>
          {
            this.props.permissions.map((role, index) => (
              <Permission
                key={index}
                role={this.state.role}
                title={role[0]}
                store={this.props.store}>
                { role[1] }
              </Permission>
            ))
          }
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    roles: state.roles,
    permissions: state.permissions,
  }),

  dispatch => ({
    onGetRoles: () => {
      axios.get('/roles')
        .then((response) => {
          dispatch({ type: 'SET_ROLES', payload: response.data });
        }).catch((error) => {
          console.log(error);
        });
    },

    onGetPermissions: (role) => {
      axios.get(`/roles/${role}/rolePermissions`)
        .then((response) => {
          dispatch({ type: 'SET_PERMISSIONS', payload: Object.entries(response.data) });
        }).catch((error) => {
          console.log(error);
        });
    },
  }),
)(PermissionsList);
