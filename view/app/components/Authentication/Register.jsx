import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios/index';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import validateField from '../../../../helpers/Validate';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Auth.less';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'example@ex.com',
      password: 'password123',
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
      this.props.onRegister({
        password: this.state.password,
        email: this.state.email,
      });
      this.setState({ redirect: true });
    }
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
          <label>Email:</label>
          { !!this.state.validationStatus.emailStatus && (
            <label>
              { this.state.validationStatus.emailStatus }
            </label>
            ) }
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            ref={(email) => {
              this.email = email;
            }}
          />
          <label>Password:</label>
          { !!this.state.validationStatus.passwordStatus && (
            <label>
              { this.state.validationStatus.passwordStatus }
            </label>
            ) }
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            ref={(password) => {
              this.password = password;
            }}
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default connect(
  state => ({
    session: state.session,
  }),

  dispatch => ({
    onRegister: (data) => {
      axios.post('/users/register', data)
        .then((response) => {
          if (response.data.message) {
            toast.error(response.data.message);
          } else toast.success('Success. You may log in!');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }),
)(Register);
