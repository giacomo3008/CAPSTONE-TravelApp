import { combineReducers, configureStore } from '@reduxjs/toolkit';
import toggleSearchReducer from '../reducers/navbarColor';
import pulseResultsReducer from '../reducers/pulseResults';
import cardsReducer from '../reducers/cards';
import loginSignUpReducer from '../reducers/loginSignUp';
import authLoginReducer from '../reducers/authLogin';

const mainReducer = combineReducers({
    toggleSearch: toggleSearchReducer,
    pulseResults: pulseResultsReducer,
    cards: cardsReducer,
    loginSignUp: loginSignUpReducer,
    authLogin: authLoginReducer,
});

const store = configureStore({
    reducer: mainReducer,
})

export default store