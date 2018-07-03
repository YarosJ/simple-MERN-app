import { combineReducers } from 'redux';

import slides from './slides';
import testimonialsSlides from './testimonialsSlides';
import users from './users';
import session from './session';
import roles from './roles';
import permissions from './permissions';

export default combineReducers({
  slides,
  testimonialsSlides,
  users,
  session,
  roles,
  permissions
});