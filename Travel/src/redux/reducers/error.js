const initialState = {
    login: null,
    signup: null,
}

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            return {
                ...state,
                login: action.payload,
                signup: null,
            }
        case 'SIGNUP_ERROR':
            return {
                ...state,
                signup: action.payload,
                login: null,
            }
        default:
            return state;
    }
}

export default errorReducer