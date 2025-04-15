const initialState = {
    pulseBool: false,
};

const pulseResultsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_PULSE':
            return {
                ...state,
                pulseBool: action.payload,
            }
        default:
            return state;
    }
}

export default pulseResultsReducer