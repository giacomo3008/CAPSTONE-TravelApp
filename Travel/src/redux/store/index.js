import { combineReducers, configureStore } from '@reduxjs/toolkit';
import toggleSearchReducer from '../reducers/navbarColor';
import pulseResultsReducer from '../reducers/pulseResults';
import cardsReducer from '../reducers/cards';
import loginSignUpReducer from '../reducers/loginSignUp';

const mainReducer = combineReducers({
    toggleSearch: toggleSearchReducer,
    pulseResults: pulseResultsReducer,
    cards: cardsReducer,
    loginSignUp: loginSignUpReducer,
});

const store = configureStore({
    reducer: mainReducer,
})

export default store