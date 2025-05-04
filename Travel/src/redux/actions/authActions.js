import config from '../../config';

export const LOGIN_ACCESSO = "LOGIN_ACCESSO";

export const login = (email, password, reload) => async (dispatch) => {
    try {
        const URL = config.serverUrl + "/api/"
        const response = await fetch(URL + "account/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            throw new Error("Errore nel Login");
        }
        const data = await response.json();

        dispatch({
            type: LOGIN_ACCESSO,
            payload: data.token,
        });
        dispatch({
            type: 'CLOSE',
            payload: true,
        });
        if (reload) {
            window.location.reload();
        }
        localStorage.setItem("token", data.token);
        console.log(data);
    }
    catch (error) {
        dispatch({
            type: 'LOGIN_ERROR',
            payload: "Email o password errati, riprova",
        });
        console.error(error);
    }
}