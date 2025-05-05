let initialState = {
    filtersModal: false,
};

const FiltersModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_OPEN':
            return {
                ...state,
                filtersModal: action.payload,
            }
        case 'FILTERS_CLOSE':
            return {
                ...state,
                filtersModal: !action.payload,
            }
        default:
            return state;
    }
}

export default FiltersModalReducer