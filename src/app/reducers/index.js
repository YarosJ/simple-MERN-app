import {combineReducers} from 'redux';

import slides from './slides';
import testimonialsSlides from './testimonialsSlides';
import users from './users';
import session from './session';

export default combineReducers({
    slides,
    testimonialsSlides,
    users,
    session
});