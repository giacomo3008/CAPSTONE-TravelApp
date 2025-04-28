let initialState = {
    startDate: null,
    endDate: null,
    guests: null,
};

const cartInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CART_INFO':
            return {
                ...state,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
                guests: action.payload.guests,
            }
        default:
            return state;
    }
}

export default cartInfoReducer