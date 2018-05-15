import slide1 from '../../images/slide1.png';
import slide2 from '../../images/slide3.jpg';
import slide3 from '../../images/slide4.jpg';
import slide4 from '../../images/slide7.jpg';
import slide5 from '../../images/slide8.jpg';

const initialState = [
    {
        image: slide1,
        text: "Lorem ipsum..."
    },
    {
        image: slide2,
        text: "Lorem ipsum..."
    },
    {
        image: slide3,
        text: "Lorem ipsum..."
    },
    {
        image: slide4,
        text: "Lorem ipsum..."
    },
    {
        image: slide5,
        text: "Lorem ipsum..."
    },
]

export default function slides(state = initialState, action) {

    switch (action.type) {
        case 'ADD_SLIDE':
            return [
                ...state,
                action.payload
            ];
            break;
        default:
            return state;
    }
}