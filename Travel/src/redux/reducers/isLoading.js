const initialState = {
    isLoading: true,
}

const isLoadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ISLOADING':
            return {
                ...state,
                isLoading: action.payload,
            }
        default:
            return state;
    }
}

export default isLoadingReducer