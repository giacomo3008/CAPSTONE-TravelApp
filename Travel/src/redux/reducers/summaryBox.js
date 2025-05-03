let initialState = {
    summaryBox: false,
};

const summaryBoxReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUMMARYBOX_OPEN':
            return {
                ...state,
                summaryBox: action.payload,
            }
        case 'SUMMARYBOX_CLOSE':
            return {
                ...state,
                summaryBox: !action.payload,
            }
        default:
            return state;
    }
}

export default summaryBoxReducer