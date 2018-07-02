import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios/index';
import { connect } from 'react-redux';
import { getCookie } from '../../../../../helpers/Cookie';
import styles from './Header.less';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.session.email) {
      this.props.onSetSessionData({
        email: getCookie('email'),
        role: getCookie('role'),
      });
    }
  }

  validateInput(e) {
    if (e.target.previousSibling.value === '') {
      e.stopPropagation();
      e.preventDefault();
      e.target.previousSibling.focus();
    }
  }

  checkAdmin() {
    if (this.props.session.role) {
      if (this.props.session.role.match(/admin/gi)) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <div
        className={this.props.location.pathname.match(/admin/) ? `${styles.adminHeader} ${styles.header}` : styles.header}>
        <div className={styles.container}>
          <div className={styles.leftInline}>
            {
              this.checkAdmin() ? (
              <div className={styles.centerTop}>
                <Link to="/admin/users">
                  <img
                    src="../../../../images/gears-configuration-tool.png"
                    style={{ marginTop: '-15px', width: '50px' }}
                    alt=""
                  />
                </Link>
                <Link to="/admin/users">
                  Admin Panel
                </Link>
              </div>
              ) : (
                <div className={styles.centerTop}>
                  <Link to="/">
                    <img src="../../../../images/logo.png" alt="" />
                  </Link>
                  <Link to="/">
                    Your logo
                  </Link>
                </div>
              )
            }
          </div>
          <input className={styles.burgerShower} type="checkbox" id="burger" />
          <label htmlFor="burger" className={`${styles.navBurger} ${styles.rightInline}`} />
          <ul className={`${styles.nav} ${styles.rightInline}`}>
            <li className={styles.hoverNav}>
              <NavLink exact to="/" activeClassName={styles.active}>
                Home
              </NavLink>
            </li>
            <li className={styles.hoverNav}>
              <NavLink
                to="/portfolio"
                activeClassName={styles.active}>
                Portfolio
              </NavLink>
            </li>
            <li className={styles.hoverNav}>
              <NavLink to="/about" activeClassName={styles.active}>
                About
              </NavLink>
            </li>
            <li className={styles.hoverNav}>
              <NavLink
                to="/contact"
                activeClassName={styles.active}>
                Contact
              </NavLink>
            </li>
            {
              this.props.session.role ? (
                <li>
                  <Link to="/" onClick={this.props.onLogout}>
                    <button>
                      Log Out
                    </button>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/login">
                    <button>
                      Log In
                    </button>
                  </Link>
                </li>
                )
            }
            <li>
              <input type="text" placeholder="Search" />
              <button onMouseDown={this.validateInput.bind(this)} />
            </li>
          </ul>
          <div className={styles.navOverlay} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    session: state.session,
  }),

  dispatch => ({

    onLogout: () => {
      axios.get('/logout')
        .then(() => {
          dispatch({ type: 'REMOVE_SESSION' });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onSetSessionData: (data) => {
      dispatch({
        type: 'SET_SESSION',
        payload: data,
      });
    },

  }),
)(Header);
