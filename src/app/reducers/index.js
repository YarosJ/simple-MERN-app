import {combineReducers} from 'redux';

import slides from './slides';
import testimonialsSlides from './testimonialsSlides';

export default combineReducers({
    slides,
    testimonialsSlides,
    users
});