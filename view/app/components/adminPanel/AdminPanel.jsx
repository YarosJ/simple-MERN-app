import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import UsersList from './Users/UsersList';
import TestimonialsCarousel from '../mainPage/Testimonials/TestimonialsCarousel';
import PermissionsList from './Permissions/PermissionsList';
import styles from './AdminPanel.less';
import { getCookie } from "../../../../helpers/Cookie";
import { Redirect } from 'react-router';

class AdminPanel extends Component {
  constructor(props) {
	super(props);
	this.state = {
	  redirect: false,
	};
  }

  componentWillMount() {
    const role = getCookie('role');
	if (!role.match(/admin/gi)) this.setState({ redirect: true });
  }

  render() {
	if (this.state.redirect) {
	  return <Redirect to="/login" />;
	}

    return (
      <div className={styles.adminPanel}>
        <Provider store={this.props.store}>
          <div>
            <Route exact path="/admin/users" component={UsersList} />
            <Route exact path="/admin/employees" component={TestimonialsCarousel} />
            <Route exact path="/admin/permissions"
              render={props => <PermissionsList {...props} {...{ store: this.props.store }} />}
            />
          </div>
        </Provider>
      </div>
    );
  }
}

export default AdminPanel;
