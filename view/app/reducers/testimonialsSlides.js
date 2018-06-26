const initialState = [
    {
        id: null,
        title: 'Consectetur',
        body: '“Lacus commodo suscipit praesent ' +
        'sollicitudin enim vel mirhon lorem ipsum dolor sit amet, ' +
        'consectetur adipiscing elit mauris necip at”',
        autor: 'Jon Doe / CEO of LoremIpsum',
        gender: 'female'
    }
];

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
                if (item._id === action.payload._id) {
                    return {...item, ...action.payload}
                }
                return item;
            });

        case 'REMOVE_TESTIMONIALS_SLIDE':
            let st = JSON.parse(JSON.stringify(state));
            st.splice(action.payload, 1);
            return st;

        default:
            return state;
    }
}