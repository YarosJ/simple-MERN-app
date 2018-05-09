import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

class Footer extends Component {

    setEmail(e) {
        this.props.onSetEmail(e.currentTarget.parentNode.previousSibling.value);
    }

    render() {
        return (
            <footer>
                <div className="container">
                    <div className="footer-item">
                        <h4>Twitter Feeds</h4>
                        <div className="footer-block">
                            <p>Check out this great theme item</p>
                            <p><a href="#">http://tadjalskfj.com</a></p>
                            <p>2 weeks ago</p>
                            <hr/>
                        </div>
                        <div className="footer-block">
                            <p>Check out this great theme item for</p>
                            <p><a href="#">http://tadjalskfj.com</a></p>
                            <p>2 weeks ago</p>
                            <hr/>
                        </div>
                        <div className="footer-block">
                            <p>Check out this great theme item for you</p>
                            <p><a href="#">http://tadjalskfj.com</a></p>
                            <p>2 weeks ago</p>
                        </div>
                    </div>
                    <div className="footer-item">
                        <h4>Newsletter</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adip
                            iscing elit. Ut ultricies sagittis magna a comm.
                            Ut eget eros mauris, ut cursus urna.
                        </p>
                        <hr/>
                        <p>Your Email Address</p>
                        <input type="text" size="40"/>
                        <Link to="/login">
                            <button onClick={this.setEmail.bind(this)}>Sign Up</button>
                        </Link>
                    </div>
                    <div className="footer-item">
                        <h4>Recent projects</h4>
                        <div className="footer-2-columns">
                            <img src="../../images/white-rectangle.png" alt=""/>
                            <div className="footer-block">
                                <p>Sketchy Business Card</p>
                                <p><a href="#">http://tadjalskfj.com</a></p>
                                <p>2 weeks ago</p>
                            </div>
                            <hr/>
                        </div>
                        <div className="footer-2-columns">
                            <img src="../../images/white-rectangle.png" alt=""/>
                            <div className="footer-block">
                                <p>Message Boards in Nature</p>
                                <p><a href="#">http://tadjalskfj.com</a></p>
                                <p>2 weeks ago</p>
                            </div>
                            <hr/>
                        </div>
                        <div className="footer-2-columns">
                            <img src="../../images/white-rectangle.png" alt=""/>
                            <div className="footer-block">
                                <p>Website Design Kit</p>
                                <p><a href="#">http://tadjalskfj.com</a></p>
                                <p>2 weeks ago</p>
                            </div>
                        </div>
                    </div>
                    <div className="footer-item">
                        <h4>Contact</h4>
                        <div className="footer-2-columns">
                            <img src="../../images/phone.png" alt=""/>
                            <div className="footer-block">
                                <p>1 - 000 - 000-0000</p>
                                <p>1 - 000 - 000-0000</p>
                            </div>
                        </div>
                        <div className="footer-2-columns">
                            <img src="../../images/smartphone.png" alt=""/>
                            <div id="footer-block-left-corrected" className="footer-block">
                                <p>1 - 000 - 000-0000</p>
                                <p>1 - 000 - 000-0000</p>
                            </div>
                        </div>
                        <div className="footer-2-columns">
                            <img src="../../images/letter.png" alt="" className="image-corrected"/>
                            <div id="footer-block-corrected" className="footer-block">
                                <p>abcdefg@hijs.dfh</p>
                                <p>fjashfaf@jkfs.ckd</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default connect(
    state => ({
        session: state.session
    }),

    dispatch => ({

        onSetEmail: (email) => {

            dispatch({type: 'REMOVE_SESSION'});

            dispatch({
                type: 'SET_SESSION',
                payload: {email: email}
            });

        }

    })
)(Footer);
