const initialState = [
    {
        id: null,
        email: null,
        role: null
    }
]

export default function testimonialsSlides(state = initialState, action) {

    switch (action.type) {
        case 'SET_TESTIMONIALS_SLIDES':
            return action.payload;

        case 'ADD_TESTIMONIALS_SLIDE':
            return [
                ...state,
                action.payload
            ];

        case 'UPDATE_TESTIMONIALS_SLIDE':
            return state.map(item => {
                if(item._id === action.payload._id){
                    return { ...item, ...action.payload }
                }
                return item;
            });

        case 'REMOVE_TESTIMONIALS_SLIDE':
            state.splice(action.payload, 1);
            return state;

        default:
            return state;
    }
}