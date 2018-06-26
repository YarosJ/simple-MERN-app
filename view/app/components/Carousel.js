import React, {Component} from 'react';

class Carousel extends Component {

    constructor(props) {
        super(props);

        this.interval = null;
        this.state = {
            current: 0,
            length: 0
        };
    }

    start() {
        this.interval = setInterval(() => {
            this.nextSlide();
        }, 7000);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = false;
    }

    nextSlide(stopNext) {
        if (stopNext) clearInterval(this.interval);
        if (this.state.current < this.state.length - 1) {
            this.setState({current: ++this.state.current});
        } else {
            this.setState({current: 0});
        }
    }

    previousSlide(stopNext) {
        if (stopNext) clearInterval(this.interval);
        if (this.state.current > 0) {
            this.setState({current: --this.state.current});
        } else {
            this.setState({current: this.state.length - 1});
        }
    }

    recountLength() {
        this.setState({length: parseInt(this.props.children.length)});
        if (this.state.current > this.state.length - 1) {
            this.previousSlide();
        }
    }

    componentDidMount() {
        if (this.props.onRef) this.props.onRef(this);
        this.setState({length: parseInt(this.props.children.length)});
        this.start();
    }

    componentWillUnmount() {
        if (this.props.onRef) this.props.onRef(undefined);
        this.stop();
    }

    moveTo = switcher => {
        this.setState({current: parseInt(switcher.currentTarget.attributes["data-key"].value)});
    };

    render() {

        if (this.props.hasOwnProperty('getCurrent')) this.props.getCurrent(this.state.current);
        const {current} = this.state;
        const marginLeft = -(current * 100);
        const Slide = this.props.slide;
        const Switcher = this.props.switcher;
        const reqId = this.props.requiredId || false;
        const onUpdateSlide = this.props.onUpdateSlide || false;

        return (
            <div className="viewport" onMouseEnter={this.stop.bind(this)} onMouseLeave={this.start.bind(this)}>

                <ul className="slidewrapper" style={{transform: `translateX(${marginLeft}%)`}}>
                    {this.props.children.map((slide, index) =>
                        <Slide
                            key={index}
                            _id={slide._id}
                            onUpdateSlide={this.props.onUpdateSlide}
                            canChange={this.props.canChange}>{slide}</Slide>
                    )}
                </ul>

                <ul className="items">
                    {this.props.children.map((slide, index) =>
                        <Switcher
                            key={index}
                            data-key={index}
                            className={index === this.state.current ? "selected-switcher" : ""}
                            onClick={this.moveTo}
                            _id={slide._id}
                            onUpdateSlide={onUpdateSlide}
                            canChange={this.props.canChange}>{slide}</Switcher>
                    )}
                </ul>

            </div>

        );
    }
}

export default Carousel;
