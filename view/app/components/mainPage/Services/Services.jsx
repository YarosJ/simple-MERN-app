import React, { Component } from 'react';
import styles from './Services.less';

export class ServicesTitle extends Component {
  render() {
    return (
      <div className={styles.servicesTitle}>
        <button>
          Our services
        </button>
      </div>
    );
  }
}

export class Services extends Component {
  render() {
    return (
      <div className={styles.services}>
        <div className={styles.container}>
          <div className={`${styles.servicesItem} ${styles.design}`}>
            <h4>
              Web Design
            </h4>
            <p>
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
                Mauris nec ipsum at lacus
                commodo suscipit.
              {' '}
              <a href="#">
                Details...
              </a>
            </p>
          </div>
          <div className={`${styles.servicesItem} ${styles.optimisation}`}>
            <h4>
              Search Optimization
            </h4>
            <p>
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
                Mauris nec ipsum at lacus
                commodo suscipit.
              {' '}
              <a href="#">
                Details...
              </a>
            </p>
          </div>
          <div className={`${styles.servicesItem} ${styles.shop}`}>
            <h4>
              Online Shop
            </h4>
            <p>
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
                Mauris nec ipsum at lacus
                commodo suscipit.
              {' '}
              <a href="#">
                Details...
              </a>
            </p>
          </div>
          <div className={`${styles.servicesItem} ${styles.media}`}>
            <h4>
              Social Media
            </h4>
            <p>
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
                Mauris nec ipsum at lacus
                commodo suscipit.
              {' '}
              <a href="#">
                Details...
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
