import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { VelocityComponent } from 'velocity-react';
import styles from './ModalWindow.less';

class ModalWindow extends Component {
  constructor(props) {
    super(props);
    this.transitionTime = 0;
    this.state = { active: true };
  }

  closeWindow(target) {
    if (this.state.active) {
      this.setState({ active: false });
      setTimeout(() => ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(target).parentNode),
        this.transitionTime + 300);
    }
  }

  render() {
    switch (this.props.type) {
      case 'html':
        return (
          <VelocityComponent
            animation={{ opacity: this.state.active ? 1 : 0 }}
            duration={this.transitionTime}>
            <div className={styles.velocityElement}>
              <div
                className={styles.overlay}
                onClick={() => {
                  this.closeWindow(this);
                }}/>
              <div className={`${styles.modalHtml} ${styles.modalForm}`}>
                <span
                  className={styles.modalClose}
                  onClick={() => {
                    this.closeWindow(this);
                  }}>x</span>

                { this.props.children }

              </div>
            </div>
          </VelocityComponent>
        );
      case 'form':
        return (
          <VelocityComponent animation={{ opacity: this.state.active ? 1 : 0 }} duration={this.transitionTime}>
            <div className={styles.velocityElement}>
              <div
                className={styles.overlay}
                onClick={() => {
                  this.closeWindow(this);
                }}/>
              <div className={`${styles.modalHtml} ${this.props.formClass}`}>
                <span
                  className={styles.modalClose}
                  onClick={() => {
                    this.closeWindow(this);
                  }}>x</span>

                { this.props.children }

              </div>
            </div>
          </VelocityComponent>
        );
      case 'confirm':
        return (
          <VelocityComponent animation={{ opacity: this.state.active ? 1 : 0 }} duration={this.transitionTime}>
            <div className={styles.velocityElement}>
              <div
                className={styles.overlay}
                onClick={() => {
                  this.closeWindow(this);
                }}/>
              <div className={`${styles.modalHtml} ${styles.modalConfirm} ${styles.modalForm}`}>
                <span
                  className={styles.modalClose}
                  onClick={() => {
                    this.closeWindow(this);
                  }}>x</span>

                { this.props.children }

                <div className={styles.controls}>
                  <button onClick={() => {
                    this.props.onConfirm();
                    this.closeWindow(this);
                  }}>
                    { this.props.yes || 'Yes' }
                  </button>
                  <button onClick={() => {
                    this.closeWindow(this);
                  }}>
                    { this.props.no || 'No' }
                  </button>
                </div>
              </div>
            </div>
          </VelocityComponent>
        );
      case 'image':
        return (
          <VelocityComponent animation={{ opacity: this.state.active ? 1 : 0 }} duration={this.transitionTime}>
            <div className={styles.velocityElement}>
              <div
                className={styles.overlay}
                onClick={() => {
                  this.closeWindow(this);
                }}/>
              <div className={`${styles.modalForm} ${styles.modalImage}`}>
                <span
                  className={styles.modalClose}
                  onClick={() => {
                    this.closeWindow(this);
                  }}>x</span>

                { this.props.children }

              </div>
            </div>
          </VelocityComponent>
        );
    }
  }
}

export default ModalWindow;
