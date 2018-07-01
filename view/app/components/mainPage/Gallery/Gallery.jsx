import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { VelocityComponent } from 'velocity-react';
import Carousel from '../../Carousel';
import styles from './Gallery.less';

class Slide extends Component {
  render() {
    return (
      <li className={styles.slide}>
        <img src={this.props.children.image} alt="" className={styles.slideImg} />
      </li>
    );
  }
}

class Miniature extends Component {
  render() {
    const key = this.props['data-key'];
    return (
      <li
        className={this.props.className}
        onClick={this.props.onClick}
        key={key}
        data-key={key}>
        <img src={this.props.children.image} className="gallery-switcher" />
      </li>
    );
  }
}

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.transitionTime = 0;
    this.state = { active: true };
  }

  closeWindow(target) {
    this.setState({ active: false });
    setTimeout(() => ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(target).parentNode), this.transitionTime + 300);
  }

  render() {
    return (
      <VelocityComponent animation={{ opacity: this.state.active ? 1 : 0 }} duration={this.transitionTime}>
        <div className={`${styles.gallery} ${styles.velocityElement} ${styles.fixed}`}>
          <Carousel
            switcher={Miniature}
            slide={Slide}
            selectedClassName={styles.selectedSwitcher}
            slidewrapper={styles.slidewrapper}
            itemsClassName={styles.items}
            viewportClassName={styles.viewport}
            onRef={ref => (this.carousel = ref)}>
            { this.props.children }
          </Carousel>
          <div
            className={`${styles.controlGalleryItem} ${styles.arrowLeft}`}
            onClick={() => this.carousel.previousSlide(true)}
          />
          <div
            className={`${styles.controlGalleryItem} ${styles.arrowRight}`}
            onClick={() => this.carousel.nextSlide(true)}
          />
          <div className={`${styles.controlGalleryItem} ${styles.score}`} />
          <span className={styles.modalClose} onClick={() => this.closeWindow(this)}>
            x
          </span>
        </div>
      </VelocityComponent>
    );
  }
}

export default Gallery;
