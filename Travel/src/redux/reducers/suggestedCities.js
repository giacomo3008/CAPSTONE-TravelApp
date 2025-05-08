const initialState = {
    suggestedCities: ["Tokyo", "Roma", "Barcellona", "Parigi", "Londra", "Xi'an"],
    typeSuggested: "POPULAR TRIPS",
};


const suggestedCitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_SUGGESTED':
            return {
                ...state,
                suggestedCities: action.payload.arrayCities,
                typeSuggested: action.payload.typeSuggested
            }
        default:
            return state;
    }
}

export default suggestedCitiesReducer
