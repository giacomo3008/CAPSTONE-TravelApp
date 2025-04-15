let initialState = {
    login: false,
    signup: false,
};

const loginSignUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                login: action.payload,
                signup: !action.payload,
            }
        case 'SIGNUP':
            return {
                ...state,
                login: !action.payload,
                signup: action.payload,
            }
        case 'CLOSE':
            return {
                ...state,
                login: !action.payload,
                signup: !action.payload,
            }
        default:
            return state;
    }
}

export default loginSignUpReducer