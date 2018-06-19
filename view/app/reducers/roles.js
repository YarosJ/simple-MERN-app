const initialState = [
    'Admin',
    'SuperAdmin',
    'User',
    'Guest'
]

export default function roles(state = initialState, action) {

    switch (action.type) {
        case 'SET_ROLES':
            return action.payload;

        // case 'SET_PERMISSIONS':
        //     // console.log(response);
        //     return action.payload;

        case 'ADD_ROLE':
            return [
                ...state,
                action.payload
            ];

        case 'UPDATE_ROLE':
            return state.map(item => {
                if (item._id === action.payload._id) {
                    return {...item, ...action.payload}
                }
                return item;
            });

        case 'REMOVE_ROLE':
            let st = JSON.parse(JSON.stringify(state));
            st.splice(action.payload, 1);
            return st;

        default:
            return state;
    }
}