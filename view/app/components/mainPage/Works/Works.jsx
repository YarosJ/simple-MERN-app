import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ModalWindow from '../../ModalWindow';
import style from './Works.less';

class Works extends Component {
  showModal(e) {
    ReactDOM.render(<ModalWindow type="image">
      <img src={e.target.previousSibling.getAttribute('src')} />
    </ModalWindow>,
    document.getElementById('modal'));
  }

  render() {
    return (
      <div className={style.works}>
        <div className={style.container}>
          <div className={style.worksTitle}>
            <p className={style.leftInline}>
              Our Portfolio Awesome
            </p>
            <a href="#" className={style.rightInline}>
              <img src="../../../../images/more-works-text.png" alt="" />
            </a>
          </div>
          <div className={style.items}>
            <div className={style.worksItem}>
              <div className={style.hoverImgWorks}>
                <img src="../../../../images/camera.png" />
                <img
                  src="../../../../images/details2.png"
                  className={style.details}
                  onClick={this.showModal.bind(this)}
                />
              </div>
              <h4>
                Lorem Ipsum Dolar Sit Amet
              </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Mauris nec ipsum at lacus commodo suscipit.
              </p>
            </div>
            <div className={style.worksItem}>
              <div className={style.hoverImgWorks}>
                <img src="../../../../images/camera.png" />
                <img
                  src="../../../../images/details2.png"
                  className={style.details}
                  onClick={this.showModal.bind(this)}
                />
              </div>
              <h4>
                Lorem Ipsum
              </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscinglit.
              </p>
            </div>
            <div className={style.worksItem}>
              <div className={style.hoverImgWorks}>
                <img src="../../../../images/camera.png" />
                <img
                  src="../../../../images/details2.png"
                  className={style.details}
                  onClick={this.showModal.bind(this)}
                />
              </div>
              <h4>
                Ipsum Amet Dolar Sit
              </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing
                elitmauris nec ipsum at lacus commodo suscipit.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Works;
