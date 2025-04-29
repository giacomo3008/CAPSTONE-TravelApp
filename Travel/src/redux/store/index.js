import { combineReducers, configureStore } from '@reduxjs/toolkit';
import toggleSearchReducer from '../reducers/navbarColor';
import pulseResultsReducer from '../reducers/pulseResults';
import loginSignUpReducer from '../reducers/loginSignUp';
import authLoginReducer from '../reducers/authLogin';
import cityStructuresReducer from '../reducers/cityStructures';
import errorReducer from '../reducers/error';
import filtersSearchReducer from '../reducers/filtersSearch';
import isLoadingReducer from '../reducers/isLoading';
import cartInfoReducer from '../reducers/cartInfo';

const mainReducer = combineReducers({
    toggleSearch: toggleSearchReducer,
    pulseResults: pulseResultsReducer,
    loginSignUp: loginSignUpReducer,
    authLogin: authLoginReducer,
    cityStructures: cityStructuresReducer,
    error: errorReducer,
    filtersSearch: filtersSearchReducer,
    isLoading: isLoadingReducer,
    cartInfo: cartInfoReducer,
});

const store = configureStore({
    reducer: mainReducer,
})

export default store