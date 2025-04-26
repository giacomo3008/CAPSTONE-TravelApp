export const LOGIN_ACCESSO = "LOGIN_ACCESSO";

export const login = (email, password) => async (dispatch) => {
    try {
        const URL = "https://localhost:7146/api/"
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
        console.log(data);

        dispatch({
            type: LOGIN_ACCESSO,
            payload: data.token,
        });
        dispatch({
            type: 'CLOSE',
            payload: true,
        });
        localStorage.setItem("token", data.token);
    }
    catch (error) {
        dispatch({
            type: 'LOGIN_ERROR',
            payload: "Email o password errati, riprova",
        });
        console.error(error);
    }
}