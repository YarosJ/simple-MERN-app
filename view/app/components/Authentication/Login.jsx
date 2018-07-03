import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios/index';
import { toast } from 'react-toastify';
import validateField from '../../../../helpers/Validate';
import styles from './Auth.less';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false,
      validationStatus: {
        emailStatus: '',
        passwordStatus: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const validationStatus = JSON.parse(JSON.stringify(this.state.validationStatus));
    validationStatus.emailStatus = validateField('email', this.state.email);
    validationStatus.passwordStatus = validateField('password', this.state.password);

    this.setState({ validationStatus });

    if (validationStatus.emailStatus.length === 0 && validationStatus.passwordStatus.length === 0) {
      this.props.onLogin({
        password: this.state.password,
        email: this.state.email,
      }, this);
    } else {
      console.log(`password:${validationStatus.passwordStatus}`);
      console.log(`email:${validationStatus.emailStatus}`);
    }
  }

  hasEmail() {
    return !!this.props.session.email && this.props.session.email !== 'undefined';
  }

  componentWillMount() {
    if (this.hasEmail()) this.setState({ email: this.props.session.email });
  }

  componentDidMount() {
    this.setState({ email: this.email.value });
    this.setState({ password: this.password.value });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className={styles.loginForm}>
        <form onSubmit={this.handleSubmit}>
          <label style={this.hasEmail() ? { display: 'none' } : {}}>
              Email:
          </label>
          <input
            type={this.hasEmail() ? 'hidden' : 'text'}
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            ref={(email) => {
              this.email = email;
            }}
          />
          { !!this.state.validationStatus.emailStatus && (
            <label style={{
              color: 'red',
              fontSize: '16px',
              marginTop: '0px',
            }}>
              { this.state.validationStatus.emailStatus }
            </label>
            ) }
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            onLoad={this.handleChange}
            ref={(password) => {
              this.password = password;
            }}
          />
          { !!this.state.validationStatus.passwordStatus
            && (
            <label style={{
              color: 'red',
              fontSize: '16px',
              marginTop: '0px',
            }}>
              { this.state.validationStatus.passwordStatus }
            </label>
            ) }
          <input type="submit" value="Log In" />
        </form>
        <Link to="/register">REGISTER</Link>
      </div>
    );
  }
}

export default connect(
  state => ({
    session: state.session,
  }),

  dispatch => ({
    onLogin: (data, _this) => {
      axios.post('/login', data)
        .then((response) => {
          dispatch({
            type: 'SET_SESSION',
            payload: {
              email: response.data.email,
              role: response.data.role,
            },
          });
          _this.setState({ redirect: true });
        })
        .catch((error) => {
          error.response.data.message ? toast.error(error.response.data.message) : toast.error('Something went wrong...');
        });
    },
  }),
)(Login);
