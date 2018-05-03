import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
    }

    validateInput(e) {
        if (e.target.previousSibling.value === "") {
            e.stopPropagation();
            e.preventDefault();
            e.target.previousSibling.focus();
        }
    }

    render() {
        return (
            <div id="header">
                <div className="container">
                    <div className="left-inline">
                        <div className="center-top">
                            <Link to="/"><img src="../../images/logo.png" alt=""/></Link>
                            <Link to="/">Your logo</Link>
                        </div>
                    </div>
                    <input className="burger-shower" type="checkbox" id="burger"/>
                    <label htmlFor="burger" className="nav-burger right-inline"/>
                    <ul className="nav right-inline">
                        <li className="hover-nav"><NavLink exact to="/" activeClassName='home'>Home</NavLink></li>
                        <li className="hover-nav"><NavLink to="/portfolio" activeClassName='home'>Portfolio</NavLink></li>
                        <li className="hover-nav"><NavLink to="/about" activeClassName='home'>About</NavLink></li>
                        <li className="hover-nav"><NavLink to="/contact" activeClassName='home'>Contact</NavLink></li>
                        <li><a href="#">
                            <button>Blog</button>
                        </a></li>
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

export default Header;