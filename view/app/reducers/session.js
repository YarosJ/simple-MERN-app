import { setCookie, deleteCookie } from "../../../helpers/Cookie";

const initialState = {
  role: '',
  email: ''
};

export default function session(state = initialState, action) {

  switch (action.type) {
	case 'SET_SESSION':
	  setCookie('email', action.payload.email, 5);
	  setCookie('role', action.payload.role, 5);
	  return action.payload;

	case 'REMOVE_SESSION':
	  deleteCookie('role');
	  deleteCookie('email');
	  return {};

	default:
	  return state;
  }
}