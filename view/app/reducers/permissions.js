const initialState = [];

function fnd(state, res, cb) {
    return state.map(item => {
        if (item[0] === res)
            cb(item);
        return item;
    });
}

export default function permissions(state = initialState, action) {

    switch (action.type) {
        case 'SET_PERMISSIONS':
            return action.payload;

        case 'ADD_PERMISSION_TO_ROLE':
            return state.map(item => {
                if (item[0] === action.payload.resources)
                    item[1] = [...new Set([...item[1], ...action.payload.permissions])];
                return item;
            });

        case 'REMOVE_PERMISSION_FROM_ROLE':
            return fnd(state, action.payload.resources, item => item[1].splice(item[1].indexOf(action.payload.permissions), 1));

        case 'ADD_RESOURCE_TO_ROLE':
            return new state.push([action.payload.resource,[]]);
            // console.log(action.payload.resource, action.payload.role);

        case 'REMOVE_RESOURCE_FROM_ROLE':
            console.log(action.payload.resource, action.payload.role);

        default:
            return state;
    }
}