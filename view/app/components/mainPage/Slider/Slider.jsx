import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Carousel from '../../Carousel';
import Gallery from '../Gallery/Gallery';
import styles from './Slider.less';

class Slide extends Component {
  render() {
    return (
      <li className="slide">
        <img src={this.props.children.image} alt="" className={styles.slideImg} />
        <div className={styles.container}>
          <h1>
            Good Design Is Good Business
          </h1>
          <h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies sagittis magnaa commodo.
            </p>
            <p>
              Ut eget eros mauris, ut cursus urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.
            </p>
          </h3>
          <button className={styles.learnMore}>
            Learn More
          </button>
        </div>
      </li>
    );
  }
}

class Switcher extends Component {
  render() {
    const key = this.props['data-key'];
    return (
      <li
        className={this.props.className}
        onClick={this.props.onClick}
        key={key}
        data-key={key}
      />
    );
  }
}

class Slider extends Component {
  showGallery(e) {
    if (e.target.tagName !== 'LI') {
      ReactDOM.render(
        <Gallery>
          { this.props.slides }
        </Gallery>,
      document.getElementById('modal'));
    }
  }

  render() {
    return (
      <div className={styles.slider} onClick={this.showGallery.bind(this)}>
        <Carousel
          switcher={Switcher}
          slide={Slide}
          selectedClassName={styles.selectedSwitcher}
          slidewrapper={styles.slidewrapper}
          itemsClassName={styles.items}>
          { this.props.slides }
        </Carousel>
      </div>
    );
  }
}

export default connect(
  state => ({
    slides: state.slides,
  }),
)(Slider);
