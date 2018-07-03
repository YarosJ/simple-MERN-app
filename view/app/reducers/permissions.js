const initialState = [];

function findAndEdit(state, res, cb) {
  return state.map(item => {
	if (item[0] === res)
	  cb(item);
	return item;
  });
}

function newArrayFrom(arr1, arr2) {
  return [...new Set([...arr1, ...arr2])];
}

export default function permissions(state = initialState, action) {

  let newState = [];

  switch (action.type) {
	case 'SET_PERMISSIONS':
	  return action.payload;

	case 'ADD_PERMISSION_TO_ROLE':
	  let foundResource = false;
	  newState = state.map(item => {
		if (item[0] === action.payload.resource) {
		  foundResource = true;
		  item[1] = newArrayFrom(item[1], action.payload.permission)
		}
		return item;
	  });
	  if (!foundResource)
		newState = newArrayFrom(state, [[action.payload.resource, action.payload.permission]]);
	  return newState;

	case 'REMOVE_PERMISSION_FROM_ROLE':
	  newState = findAndEdit(state, action.payload.resource,
		item => item[1].splice(item[1].indexOf(action.payload.permission), 1));
	  return state.filter(item => item[1].length > 0);

	default:
	  return state;
  }
}
