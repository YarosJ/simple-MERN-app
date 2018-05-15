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
import AdminPanel from "./components/AdminPanel";

const store = createStore(reducer);

import {Route, HashRouter} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import AdminToolbar from "./components/AdminToolbar";

const history = createBrowserHistory();

ReactDOM.render(
    <HashRouter history={history}>
        <Provider store={store}>
            <div>

                <Route path="/" component={Header}/>
                {/* HOME */}

                <Route exact path="/" component={Slider}/>

                <Route exact path="/" component={ServicesTitle}/>
                <Route exact path="/" component={Services}/>
                <Route exact path="/" component={Works}/>
                <Route exact path="/" component={Offers}/>

                <Route exact path="/" component={TestimonialsCarousel}/>

                {/* PORTFOLIO */}

                <Route exact path="/portfolio" component={Works}/>
                <Route exact path="/portfolio" component={Services}/>

                {/* ABOUT */}

                <Route exact path="/about" component={Offers}/>
                <Route exact path="/about" render={() => <br/>}/>

                {/* CONTACT */}

                <Route exact path="/contact" component={TestimonialsCarousel}/>

                {/* LOGIN */}

                <Route exact path="/login" component={Login}/>

                {/* REGISTER */}

                <Route exact path="/register" component={Register}/>

                {/* ADMIN */}

                <div className="admin">
                    <Route path="/admin" component={AdminToolbar}/>
                    <Route path="/admin" render={(props) => <AdminPanel {...props} {...{store: store}} />}/>
                </div>

                <Footer/>
            </div>
        </Provider>
    </HashRouter>,
    document.getElementsByClassName("wrapper")[0]
);