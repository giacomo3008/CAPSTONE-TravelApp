import { CITY_STRUCTURES, CITY_STRUCTURES_NULL } from "../actions/cityStructuresAction";

let initialState = {
    city: null,
    listings: [],
};

const cityStructuresReducer = (state = initialState, action) => {
    switch (action.type) {
        case CITY_STRUCTURES:
            return {
                ...state,
                city: action.payload,
                listings: action.payload.listingDescriptions,
            }
        case CITY_STRUCTURES_NULL:
            return {
                ...state,
                city: null,
                listings: [],
            }
        default:
            return state;
    }
}

export default cityStructuresReducer