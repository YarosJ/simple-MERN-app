import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import UsersList from './Users/UsersList';
import TestimonialsCarousel from '../mainPage/Testimonials/TestimonialsCarousel';
import PermissionsList from './Permissions/PermissionsList';
import styles from './AdminPanel.less';

class AdminPanel extends Component {
  render() {
    return (
      <div className={styles.adminPanel}>
        <Provider store={this.props.store}>
          <div>
            <Route exact path="/admin/users" component={UsersList} />
            <Route exact path="/admin/employees" component={TestimonialsCarousel} />
            <Route
              exact
              path="/admin/permissions"
              render={props => <PermissionsList {...props} {...{ store: this.props.store }} />}
            />
          </div>
        </Provider>
      </div>
    );
  }
}

export default AdminPanel;
