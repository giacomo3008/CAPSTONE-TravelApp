let initialState = {
    maxBudget: null,
    date: null,
};

const filtersSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_FILTERS':
            return {
                ...state,
                maxBudget: action.payload.maxBudget,
                date: action.payload.date,
            }
        default:
            return state;
    }
}

export default filtersSearchReducer