import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ModalWindow from '../../ModalWindow';
import styles from './TestimonialsWindow.less';

class TestimonialsWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: 'male',
    };
  }

  newSlideData() {
    return ({
      title: this.title.value, body: this.body.value, autor: this.autor.value, gender: this.state.gender,
    });
  }

  closeWindow(target) {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(target).parentNode);
  }

  render() {
    return (
      <ModalWindow type="form" formClass={styles.testimonialsForm}>
        <p>
          <textarea
            name="title"
            defaultValue=""
            ref={(title) => {
              this.title = title;
            }}
          />
        </p>
        <p>
          <textarea
            name="body"
            defaultValue=""
            ref={(body) => {
              this.body = body;
            }}
          />
        </p>
        <p>
          <textarea
            name="autor"
            defaultValue=""
            ref={(autor) => {
              this.autor = autor;
            }}
          />
        </p>

        <div className={styles.formImages}>
          <img
            className={this.state.gender === 'male' ? styles.selected : ''}
            src={this.props.children.male}
            onClick={() => this.setState({ gender: 'male' })}
          />
          <img
            className={this.state.gender === 'female' ? styles.selected : ''}
            src={this.props.children.female}
            onClick={() => this.setState({ gender: 'female' })}
          />
        </div>

        <div className={styles.editControls}>
          <button
            className="edit-ok"
            onClick={() => {
              this.props.addSlide(this.newSlideData());
              this.closeWindow(this);
            }}>
            OK
          </button>
          <button
            className={styles.editCancel}
            onClick={() => {
              this.closeWindow(this);
            }}>
            CANCEL
          </button>
        </div>
      </ModalWindow>
    );
  }
}

export default TestimonialsWindow;
