import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux';

import reducer from './reducers/';

import '../styles/index.less';

import TestimonialsCarousel from "./components/TestimonialsCarousel";
import Slider from "./components/Slider";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {Services, ServicesTitle} from "./components/Services";
import Works from "./components/Works";
import Offers from "./components/Offers";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin";

const store = createStore(reducer);

import {Router, Route, Link} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import UsersPanel from "./components/UsersPanel";

const history = createBrowserHistory();
ReactDOM.render(
    <Router history={history}>
        <div>

            <Route path="/" component={Header}/>
            {/* HOME */}

            <Provider store={store}>
                <Route exact path="/" component={Slider}/>
            </Provider>

            <Route exact path="/" component={ServicesTitle}/>
            <Route exact path="/" component={Services}/>
            <Route exact path="/" component={Works}/>
            <Route exact path="/" component={Offers}/>

            <Provider store={store}>
                <Route exact path="/" component={TestimonialsCarousel}/>
            </Provider>

            {/* PORTFOLIO */}

            <Route exact path="/portfolio" component={Works}/>
            <Route exact path="/portfolio" component={Services}/>

            {/* ABOUT */}

            <Route exact path="/about" component={Offers}/>
            <Route exact path="/about" render={() => <br/>}/>

            {/* CONTACT */}

            <Provider store={store}>
                <Route exact path="/contact" component={TestimonialsCarousel}/>
            </Provider>

            {/* LOGIN */}

            <Route exact path="/login" component={Login}/>

            {/* REGISTER */}

            <Route exact path="/register" component={Register}/>

            {/* ADMIN */}

            <Route path="/admin" component={Admin}/>
            <Provider store={store}>
                <Route exact path="/admin/users" component={UsersPanel}/>
            </Provider>

            <Footer/>
        </div>
    </Router>,
    document.getElementsByClassName("wrapper")[0]
);

