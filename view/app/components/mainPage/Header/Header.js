import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {getCookie} from "../../../../../helpers/Cookie";
import axios from "axios/index";
import {connect} from "react-redux";
import './Header.less';

class Header extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.session.email) this.props.onSetSessionData({
            email: getCookie('email'),
            role: getCookie('role')
        });
    }

    validateInput(e) {
        if (e.target.previousSibling.value === "") {
            e.stopPropagation();
            e.preventDefault();
            e.target.previousSibling.focus();
        }
    }

    checkAdmin() {
        if (!!this.props.session.role) {
            if (!!this.props.session.role.match(/admin/gi)) {
                return true;
            }
        }
        return false;
    }

    render() {
        return (
            <div id="header" className={this.props.location.pathname.match(/admin/) ? "admin-header" : ""}>
                <div className="container">
                    <div className="left-inline">
                        {
                            this.checkAdmin() ?
                                <div className="center-top">
                                    <Link to="/admin/users"><img src="../../../../images/gears-configuration-tool.png" style={{marginTop: '-15px', width: '50px'}} alt=""/></Link>
                                    <Link to="/admin/users">Admin Panel</Link>
                                </div>
                                :
                                <div className="center-top">
                                    <Link to="/"><img src="../../../../images/logo.png" alt=""/></Link>
                                    <Link to="/">Your logo</Link>
                                </div>
                        }
                    </div>
                    <input className="burger-shower" type="checkbox" id="burger"/>
                    <label htmlFor="burger" className="nav-burger right-inline"/>
                    <ul className="nav right-inline">
                        <li className="hover-nav"><NavLink exact to="/" activeClassName='active'>Home</NavLink></li>
                        <li className="hover-nav"><NavLink to="/portfolio" activeClassName='active'>Portfolio</NavLink>
                        </li>
                        <li className="hover-nav"><NavLink to="/about" activeClassName='active'>About</NavLink></li>
                        <li className="hover-nav"><NavLink to="/contact" activeClassName='active'>Contact</NavLink></li>
                        {
                            !!this.props.session.role ?
                                <li><Link to="/" onClick={this.props.onLogout}>
                                    <button>Log Out</button>
                                </Link></li>
                                :
                                <li><Link to="/login">
                                    <button>Log In</button>
                                </Link></li>
                        }
                        <li>
                            <input type="text" placeholder="Search" className="search-input"/>
                            <button className="search-button" onMouseDown={this.validateInput.bind(this)}/>
                        </li>
                    </ul>
                    <div className="nav-overlay"/>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        session: state.session
    }),

    dispatch => ({

        onLogout: () => {
            axios.get('/users/logout')
                .then(() => {
                    dispatch({type: 'REMOVE_SESSION'});
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        onSetSessionData: (data) => {
            dispatch({
                type: 'SET_SESSION',
                payload: data
            });
        }

    })
)(Header);
