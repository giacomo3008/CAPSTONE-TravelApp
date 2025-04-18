import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
let initialState = {
    user: token ? jwtDecode(token) : null,
    token: token || null,
};

const authLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_ACCESSO':
            return {
                ...state,
                token: action.payload,
                user: jwtDecode(action.payload),
            }
        case 'LOGOUT':
            return {
                ...state,
                token: null,
                user: null,
            }
        default:
            return state;
    }
}

export default authLoginReducer