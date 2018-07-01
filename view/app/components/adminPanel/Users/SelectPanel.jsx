import React, { Component } from 'react';
import styles from './SelectPanel.less';

class SelectPanel extends Component {
  updateUser(e) {
    this.props.updateUser(e.target.options[e.target.selectedIndex].value);
  }

  render() {
    return (
      <select className={styles.select} value={this.props.value} onChange={this.updateUser.bind(this)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="superAdmin">SuperAdmin</option>
      </select>
    );
  }
}

export default SelectPanel;
