import React, {Component} from 'react';
import './Services.less';

export class ServicesTitle extends Component {
    render() {
        return (
            <div className="services-title">
                <button>Our services</button>
            </div>
        )
    }
}

export class Services extends Component {
    render() {
        return (
            <div id="services">
                <div className="container">
                    <div className="services-item design">
                        <h4>Web Design</h4>
                        <p>
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Mauris nec ipsum at lacus
                            commodo suscipit. <a href="#">Details...</a>
                        </p>
                    </div>
                    <div className="services-item optimisation">
                        <h4>Search Optimization</h4>
                        <p>
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Mauris nec ipsum at lacus
                            commodo suscipit. <a href="#">Details...</a>
                        </p>
                    </div>
                    <div className="services-item shop">
                        <h4>Online Shop</h4>
                        <p>
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Mauris nec ipsum at lacus
                            commodo suscipit. <a href="#">Details...</a>
                        </p>
                    </div>
                    <div className="services-item media">
                        <h4>Social Media</h4>
                        <p>
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Mauris nec ipsum at lacus
                            commodo suscipit. <a href="#">Details...</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}