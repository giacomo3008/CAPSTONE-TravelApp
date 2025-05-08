import config from '../../config';

export const CITY_STRUCTURES = "CITY_STRUCTURES";
export const CITY_STRUCTURES_NULL = "CITY_STRUCTURES_NULL";

export const cityStructures = ({ name, token = null, maxBudget = null, prieviousStartDate = null, prieviousEndDate = null }) => async (dispatch) => {
    try {
        let URL = "";
        console.log("ENTRATO IN ACTION: ", prieviousStartDate, prieviousEndDate);
        if (prieviousStartDate != null && prieviousEndDate != null) {
            URL = maxBudget != null
                ? `${config.serverUrl}/api/city/${name}?startDate=${prieviousStartDate}&endDate=${prieviousEndDate}&budget=${maxBudget}`
                : `${config.serverUrl}/api/city/${name}?startDate=${prieviousStartDate}&endDate=${prieviousEndDate}`;
        } else {
            URL = maxBudget != null
                ? `${config.serverUrl}/api/city/${name}?budget=${maxBudget}`
                : `${config.serverUrl}/api/city/${name}`;
        }
        console.log(URL);
        let response;
        if (token) {
            response = await fetch(URL, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
        } else {
            response = await fetch(URL);
        }
        if (response.status == 404) {
            dispatch({
                type: CITY_STRUCTURES_NULL,
                payload: null,
            });
            dispatch({
                type: 'SET_ISLOADING',
                payload: false,
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