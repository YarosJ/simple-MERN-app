import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Footer.less';

class Footer extends Component {
  setEmail(e) {
    this.props.onSetEmail(e.currentTarget.parentNode.previousSibling.value);
  }

  render() {
    return (
      <footer>
        <div className={styles.container}>
          <div className={styles.footerItem}>
            <h4>Twitter Feeds</h4>
            <div className={styles.footerBlock}>
              <p>Check out this great theme item</p>
              <p>
                <a href="#">http://tadjalskfj.com</a>
              </p>
              <p>2 weeks ago</p>
              <hr />
            </div>
            <div className={styles.footerBlock}>
              <p>Check out this great theme item for</p>
              <p>
                <a href="#">http://tadjalskfj.com</a>
              </p>
              <p>2 weeks ago</p>
              <hr />
            </div>
            <div className={styles.footerBlock}>
              <p>Check out this great theme item for you</p>
              <p>
                <a href="#">http://tadjalskfj.com</a>
              </p>
              <p>2 weeks ago</p>
            </div>
          </div>
          <div className={styles.footerItem}>
            <h4>Newsletter</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adip
              iscing elit. Ut ultricies sagittis magna a comm.
              Ut eget eros mauris, ut cursus urna.
            </p>
            <hr />
            <p>Your Email Address</p>
            <input type="text" size="40" />
            <Link to="/login">
              <button onClick={this.setEmail.bind(this)}>
                Sign Up
              </button>
            </Link>
          </div>
          <div className={styles.footerItem}>
            <h4>Recent projects</h4>
            <div className={styles.footer2columns}>
              <img src="../../../../images/white-rectangle.png" alt="" />
              <div className={styles.footerBlock}>
                <p>Sketchy Business Card</p>
                <p>
                  <a href="#">http://tadjalskfj.com</a>
                </p>
                <p>2 weeks ago</p>
              </div>
              <hr />
            </div>
            <div className={styles.footer2columns}>
              <img src="../../../../images/white-rectangle.png" alt="" />
              <div className={styles.footerBlock}>
                <p>Message Boards in Nature</p>
                <p>
                  <a href="#">http://tadjalskfj.com</a>
                </p>
                <p>2 weeks ago</p>
              </div>
              <hr />
            </div>
            <div className={styles.footer2columns}>
              <img src="../../../../images/white-rectangle.png" alt="" />
              <div className={styles.footerBlock}>
                <p>Website Design Kit</p>
                <p>
                  <a href="#">http://tadjalskfj.com</a>
                </p>
                <p>2 weeks ago</p>
              </div>
            </div>
          </div>
          <div className={styles.footerItem}>
            <h4>Contact</h4>
            <div className={styles.footer2columns}>
              <img src="../../../../images/phone.png" alt="" />
              <div className={styles.footerBlock}>
                <p>1 - 000 - 000-0000</p>
                <p>1 - 000 - 000-0000</p>
              </div>
            </div>
            <div className={styles.footer2columns}>
              <img src="../../../../images/smartphone.png" alt="" />
              <div className={`${styles.footerBlock} ${styles.footerBlockLeftCorrected}`}>
                <p>1 - 000 - 000-0000</p>
                <p>1 - 000 - 000-0000</p>
              </div>
            </div>
            <div className={styles.footer2columns}>
              <img src="../../../../images/letter.png" alt="" className={styles.imageCorrected} />
              <div className={`${styles.footerBlock} ${styles.footerBlockCorrected}`}>
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
    session: state.session,
  }),

  dispatch => ({
    onSetEmail: (email) => {
      dispatch({ type: 'REMOVE_SESSION' });

      dispatch({
        type: 'SET_SESSION',
        payload: { email },
      });
    },
  }),
)(Footer);
