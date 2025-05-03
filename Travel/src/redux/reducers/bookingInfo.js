const initialState = {
    bookingInfo: null
}

const bookingInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BOOKING_INFO':
            return {
                ...state,
                bookingInfo: action.payload,
            }
        default:
            return state;
    }
}

export default bookingInfoReducer