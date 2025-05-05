let initialState = {
    maxBudget: null,
    startDate: null,
    endDate: null,
    beds: 0,
    capacity: 0,
    propType: null,
    budgetFilter: 10000,
};

const filtersSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_FILTERS':
            return {
                ...state,
                maxBudget: action.payload.maxBudget,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
            }
        case 'CHANGE_FILTERS':
            return {
                ...state,
                beds: action.payload.beds,
                capacity: action.payload.capacity,
                propType: action.payload.propType,
                budgetFilter: action.payload.budgetFilter,
            }
        default:
            return state;
    }
}

export default filtersSearchReducer