import React, { Component } from 'react';
import styles from './NotFound.less';

class NotFound extends Component {

  render() {
	return (
		<div className={styles.notFound}>
		  <img src="https://atlassianblog.wpengine.com/wp-content/uploads/2017/12/404-pages_featured@2x.png" alt=""/>
		</div>
	);
  }
}

export default NotFound;
