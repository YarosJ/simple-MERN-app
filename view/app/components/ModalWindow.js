import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {VelocityComponent} from 'velocity-react';
import './ModalWindow.less';

class ModalWindow extends Component {

    constructor(props) {
        super(props);
        this.transitionTime = 0;
        this.state = {active: true};
    }

    closeWindow(target) {
        this.setState({active: false});
        setTimeout(() => ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(target).parentNode), this.transitionTime + 300);
    }

    render() {
        switch (this.props.type) {
            case 'html':
                return (
                    <VelocityComponent animation={{opacity: this.state.active ? 1 : 0}} duration={this.transitionTime}>
                        <div className="velocity-element">
                            <div id="overlay" onClick={() => {
                                this.closeWindow(this);
                            }}/>
                            <div id="modal_form" className="modal_html">
                            <span className="modal_close" onClick={() => {
                                this.closeWindow(this);
                            }}> x </span>

                                {this.props.children}

                            </div>
                        </div>
                    </VelocityComponent>
                );
            case 'form':
                return (
                    <VelocityComponent animation={{opacity: this.state.active ? 1 : 0}} duration={this.transitionTime}>
                        <div className="velocity-element">
                            <div id="overlay" onClick={() => {
                                this.closeWindow(this);
                            }}/>
                            <div id="testimonials_form" className="modal_html">
                            <span className="modal_close" onClick={() => {
                                this.closeWindow(this);
                            }}> x </span>

                                {this.props.children}

                            </div>
                        </div>
                    </VelocityComponent>
                );
            case 'image':
                return (
                    <VelocityComponent animation={{opacity: this.state.active ? 1 : 0}} duration={this.transitionTime}>
                        <div className="velocity-element">
                            <div id="overlay" onClick={() => {
                                this.closeWindow(this);
                            }}/>
                            <div id="modal_form" className="modal_image">
                            <span className="modal_close" onClick={() => {
                                this.closeWindow(this);
                            }}> x </span>

                                {this.props.children}

                            </div>
                        </div>
                    </VelocityComponent>
                );
        }
    }
}

export default ModalWindow;