const initialState = {
    search: false,
};

const toggleSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_SEARCH':
            return {
                ...state,
                search: action.payload,
            }
        default:
            return state;
    }
}

export default toggleSearchReducer