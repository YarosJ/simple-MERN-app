import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ToastContainer } from 'react-toastify';

import reducer from './reducers';
import '../styles/index.less';

import TestimonialsCarousel from './components/mainPage/Testimonials/TestimonialsCarousel';
import Slider from './components/mainPage/Slider/Slider';
import Footer from './components/mainPage/Footer/Footer';
import Header from './components/mainPage/Header/Header';
import { Services, ServicesTitle } from './components/mainPage/Services/Services';
import Works from './components/mainPage/Works/Works';
import Offers from './components/mainPage/Offers/Offers';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import AdminPanel from './components/adminPanel/AdminPanel';
import AdminToolbar from './components/adminPanel/AdminToolbar/AdminToolbar';
import NotFound from './components/errors/NotFound';

const store = createStore(reducer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <div>
        <Route path="/" component={Header} />
          <Switch>

            {
                /**
                 * Home group of routes by path  '/'
                 */
            }

            <Route exact path="/" render={() =>
              <div>
                <Slider/>
                <ServicesTitle/>
                <Services/>
                <Works/>
                <Offers/>
                <TestimonialsCarousel/>
              </div>
            } />

            {
                /**
                 * Portfolio group of routes by path  '/portfolio'
                 */
            }

            <Route exact path="/portfolio" render={() =>
              <div>
                <Works/>
                <Services/>
              </div>
            } />

            {
                /**
                 * About group of routes by path  '/about'
                 */
            }

            <Route exact path="/about" render={() =>
              <div>
                <Offers/>
                <br />
              </div>
            } />

            {
                /**
                 * Contact page route
                 */
            }

            <Route exact path="/contact" component={TestimonialsCarousel} />

            {
                /**
                 * Login/Register routes
                 */
            }

            <Route exact path="/login" component={Login} />

            <Route exact path="/register" component={Register} />

            {
                /**
                 * Admin panel group of routes by path  '/admin'
                 */
            }

            <Route path="/admin" render={props =>
              <div style={{display: 'flex'}}>
                <AdminToolbar/>
                <AdminPanel {...props} {...{ store }} />
              </div>
            } />

            <Route path='*' exact={true} component={NotFound} />

          </Switch>

		    <ToastContainer />

        <Footer />
      </div>
    </Provider>
  </BrowserRouter>,
  document.getElementsByClassName('wrapper')[0],
);
