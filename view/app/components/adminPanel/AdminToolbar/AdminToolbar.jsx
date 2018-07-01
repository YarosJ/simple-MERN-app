import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AdminToolbar.less';

class AdminToolbar extends Component {
  render() {
    return (
      <div className={styles.adminToolbar}>
        <ul>
          <li>
            <NavLink exact to="/admin/users" activeClassName={styles.active}>
              <img src="../../../../images/team.png" alt="Users" />
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/admin/employees" activeClassName={styles.active}>
              <img src="../../../../images/curriculum.png" alt="Employees" />
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/admin/permissions" activeClassName={styles.active}>
              <img src="../../../../images/key.png" alt="Employees" />
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default AdminToolbar;
