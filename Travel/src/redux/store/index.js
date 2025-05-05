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
import bookingInfoReducer from '../reducers/bookingInfo';
import summaryBoxReducer from '../reducers/summaryBox';
import FiltersModalReducer from '../reducers/filtersModal';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';

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
    bookingInfo: bookingInfoReducer,
    summaryBox: summaryBoxReducer,
    filtersModal: FiltersModalReducer
});

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['filtersSearch', 'filtersModal'] // salva solo questi due
};

const persistedReducer = persistReducer(persistConfig, mainReducer);

const store = configureStore({
    reducer: persistedReducer,
})

const persistor = persistStore(store);


export { store, persistor }