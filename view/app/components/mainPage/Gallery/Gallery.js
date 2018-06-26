import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Carousel from "../../Carousel";
import {VelocityComponent} from 'velocity-react';
import './Gallery.less';

class Slide extends Component {
    render() {
        return (
            <li className="slide">
                <img src={this.props.children.image} alt="" className="slide-img"/>
            </li>
        );
    }
}

class Miniature extends Component {
    render() {
        let key = this.props["data-key"];
        return (
            <li className={this.props.className}
                onClick={this.props.onClick}
                key={key}
                data-key={key}>
                <img src={this.props.children.image} className="gallery-switcher"/>
            </li>
        );
    }
}

class Gallery extends Component {

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
        return (
            <VelocityComponent animation={{opacity: this.state.active ? 1 : 0}} duration={this.transitionTime}>
                <div className="gallery velocity-element fixed">
                    <Carousel switcher={Miniature} slide={Slide} onRef={ref => (this.carousel = ref)}>
                        {this.props.children}
                    </Carousel>
                    <div className="control-gallery-item arrow-left" onClick={() => this.carousel.previousSlide(true)}/>
                    <div className="control-gallery-item arrow-right" onClick={() => this.carousel.nextSlide(true)}/>
                    <div className="control-gallery-item score"/>
                    <span className="modal_close" onClick={() => this.closeWindow(this)}>x</span>
                </div>
            </VelocityComponent>
        );
    }
}

export default Gallery;