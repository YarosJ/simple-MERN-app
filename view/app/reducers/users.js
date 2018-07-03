const initialState = [];

export default function users(state = initialState, action) {

  switch (action.type) {
	case 'SET_USERS':
	  return action.payload;

	case 'ADD_USER':
	  return [
		...state,
		action.payload
	  ];

	case 'UPDATE_USER':
	  return state.map(item => {
		if (item._id === action.payload._id) {
		  return { ...item, ...action.payload }
		}
		return item;
	  });

	case 'REMOVE_USER':
	  let st = JSON.parse(JSON.stringify(state));
	  st.splice(action.payload, 1);
	  return st;

	default:
	  return state;
  }
}