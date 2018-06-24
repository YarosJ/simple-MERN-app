import React, {Component} from 'react';
import ReactDOM from "react-dom";
import ModalWindow from "../../ModalWindow";
import './Offers.less';

class Offers extends Component {

    showModal(e) {
        ReactDOM.render(<ModalWindow type="html">
                <p> {e.target.previousSibling.innerHTML} </p>
            </ModalWindow>,
            document.getElementById('modal'));
    }

    render() {
        return (
            <div id="offers">
                <div className="container">
                    <div id="offers-title">
                        <h1>What We Offer</h1>
                        <h3>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies sagittis magnaa
                            commodo. Ut
                            eget eros mauris, ut cursus urna.
                            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.
                        </h3>
                    </div>
                    <div className="items">
                        <div className="offers-item">
                            <h4>Web Design</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consect
                                etur adipiscing elit. Ut ultricies sagit
                                tism agnaa commodo. Ut eget eros mauris, ut cursus urna vestibuluman ipsum primis in
                                faucibus
                                orci luctuset.
                            </p>
                            <button onClick={this.showModal.bind(this)}>Details</button>
                        </div>
                        <div className="offers-item">
                            <h4>Search Optimization</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consect
                                etur adipiscing elit. Ut ultricies sagit
                                tism agnaa commodo. Ut eget eros mauris, ut cursus urna vestibuluman ipsum primis in
                                faucibus <a
                                href="#">Details...</a>
                            </p>
                        </div>
                        <div className="offers-item">
                            <h4>Online Shop</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consect
                                etur adipiscing elit. Ut ultricies sagit
                                tism agnaa commodo. Ut eget eros mauris, ut cursus urna vestibuluman ipsum primis in
                                faucibus
                                orci luctuset.
                            </p>
                            <button onClick={this.showModal.bind(this)}>Details</button>
                        </div>
                        <div className="offers-item">
                            <h4>Social Media</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consect
                                etur adipiscing elit. Ut ultricies sagit
                                tism agnaa commodo. Ut eget eros mauris, ut cursus urna vestibuluman ipsum primis in
                                faucibus
                                orci luc &nbsp; >>>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Offers;