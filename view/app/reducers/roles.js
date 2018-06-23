const initialState = [
    'admin',
    'superAdmin',
    'user',
    'guest'
];

export default function roles(state = initialState, action) {

    switch (action.type) {
        case 'SET_ROLES':
            return action.payload;

        default:
            return state;
    }
}