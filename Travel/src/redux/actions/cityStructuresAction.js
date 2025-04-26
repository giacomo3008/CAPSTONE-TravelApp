export const CITY_STRUCTURES = "CITY_STRUCTURES";
export const CITY_STRUCTURES_NULL = "CITY_STRUCTURES_NULL";

export const cityStructures = (name, maxBudget) => async (dispatch) => {
    try {
        const URL = maxBudget != null
            ? `https://localhost:7146/api/city/${name}?budget=${maxBudget}`
            : `https://localhost:7146/api/city/${name}`;
        const response = await fetch(URL);
        if (response.status == 404) {
            dispatch({
                type: CITY_STRUCTURES_NULL,
                payload: null,
            });
        }
        else {
            if (!response.ok && response.status != 404) {
                throw new Error("Errore nel recuperare le strutture");
            }
            const data = await response.json();
            console.log(data);

            dispatch({
                type: CITY_STRUCTURES,
                payload: data,
            });
            dispatch({
                type: 'SET_ISLOADING',
                payload: false,
            });
        }
    }
    catch (error) {
        console.error(error);
    }
}