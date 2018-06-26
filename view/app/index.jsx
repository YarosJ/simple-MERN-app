import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux';
import {ToastContainer, toast} from 'react-toastify';

import reducer from './reducers/';
import '../styles/index.less';

import TestimonialsCarousel from "./components/mainPage/Testimonials/TestimonialsCarousel";
import Slider from "./components/mainPage/Slider/Slider";
import Footer from "./components/mainPage/Footer/Footer";
import Header from "./components/mainPage/Header/Header";
import {Services, ServicesTitle} from "./components/mainPage/Services/Services";
import Works from "./components/mainPage/Works/Works";
import Offers from "./components/mainPage/Offers/Offers";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import AdminPanel from "./components/adminPanel/AdminPanel";
import AdminToolbar from "./components/adminPanel/AdminToolbar/AdminToolbar";

const store = createStore(reducer);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <div>
                <Route path="/" component={Header}/>

                {
                    /**
                     * Home group of routes by path  '/'
                     */
                }

                <Route exact path="/" component={Slider}/>
                <Route exact path="/" component={ServicesTitle}/>
                <Route exact path="/" component={Services}/>
                <Route exact path="/" component={Works}/>
                <Route exact path="/" component={Offers}/>
                <Route exact path="/" component={TestimonialsCarousel}/>

                {
                    /**
                     * Portfolio group of routes by path  '/portfolio'
                     */
                }

                <Route exact path="/portfolio" component={Works}/>
                <Route exact path="/portfolio" component={Services}/>

                {
                    /**
                     * About group of routes by path  '/about'
                     */
                }

                <Route exact path="/about" component={Offers}/>
                <Route exact path="/about" render={() => <br/>}/>

                {
                    /**
                     * Contact page route
                     */
                }

                <Route exact path="/contact" component={TestimonialsCarousel}/>

                {
                    /**
                     * Login/Register routes
                     */
                }

                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>

                {
                    /**
                     * Admin panel group of routes by path  '/admin'
                     */
                }

                <div className="admin">
                    <Route path="/admin" component={AdminToolbar}/>
                    <Route path="/admin" render={(props) => <AdminPanel {...props} {...{store: store}} />}/>
                </div>

                <Footer/>
                <ToastContainer/>
            </div>
        </Provider>
    </BrowserRouter>,
    document.getElementsByClassName("wrapper")[0]
);