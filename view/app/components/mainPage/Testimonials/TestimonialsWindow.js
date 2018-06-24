import React, {Component} from 'react';
import ReactDOM from "react-dom";
import ModalWindow from "../../ModalWindow";
import './TestimonialsWindow.less';

class TestimonialsWindow extends Component {

    constructor(props) {
        super(props);

        this.gender = 'male';
    }

    newSlideData() {
        return ({title: this.title.value, body: this.body.value, autor: this.autor.value, gender: this.gender});
    }

    closeWindow(target) {
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(target).parentNode);
    }

    render() {
        return (
            <ModalWindow type="form">
                <p>
                    <textarea name="title" defaultValue="" ref={(title) => {
                        this.title = title
                    }}/>
                </p>
                <p>
                    <textarea name="body" defaultValue="" ref={(body) => {
                        this.body = body
                    }}/>
                </p>
                <p>
                    <textarea name="autor" defaultValue="" ref={(autor) => {
                        this.autor = autor
                    }}/>
                </p>

                <div className="form-images">
                    <img src={this.props.children.male} onClick={() => this.gender = 'male'}/>
                    <img src={this.props.children.female} onClick={() => this.gender = 'female'}/>
                </div>

                <div className="edit-controls">
                    <button className="edit-ok" onClick={() => {
                        this.props.addSlide(this.newSlideData());
                        this.closeWindow(this);
                    }}>OK
                    </button>
                    <button className="edit-cancel" onClick={() => {
                        this.closeWindow(this);
                    }}> CANCEL
                    </button>
                </div>
            </ModalWindow>
        )
    }
}

export default TestimonialsWindow;