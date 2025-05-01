import SearchComponent from "./SearchComponent";
import SuggestedComponent from "./SuggestedComponent";
import "../style/home.css"
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const HomeComponent = function () {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: 'TOGGLE_SEARCH',
            payload: false,
        });
    }, []);

    return (
        <div className="home-container">
            <img src="/src/assets/img/background.jpeg" className="bg-img-home" />
            <SearchComponent />
            <SuggestedComponent />
        </div>
    );
};

export default HomeComponent;