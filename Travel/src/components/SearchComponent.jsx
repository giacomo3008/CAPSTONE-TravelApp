import React, { useState } from "react";
import "../style/search.css";
import SearchFormComponent from "./SearchFormComponent";
import { useDispatch, useSelector } from "react-redux";

const SearchComponent = function () {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const suggestedCities = useSelector((state) => state.suggestedCities.typeSuggested);

    const handleSuggestedCities = (arrayCities, typeSuggested) => {
        dispatch({
            type: "CHANGE_SUGGESTED",
            payload: {
                arrayCities,
                typeSuggested,
            }
        });
    }

    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    return (
        <div className="search-container">
            <h4 className='mt-6'>OUR PACKAGES</h4>
            <h2 className='mb-5'>Search your Holiday</h2>
            <SearchFormComponent search={false} />

            <div className='search-bottom-container d-flex flex-row justify-content-between mt-5 mb-3'>
                <div className='order d-flex flex-column position-relative'>
                    <div className='div-h5' onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                        <h5 className='me-4'>
                            {suggestedCities} <span><i className="fa-solid fa-chevron-down"></i></span>
                        </h5>
                    </div>

                    {dropdownOpen && (
                        <div className="dropdown-menu-custom">
                            <ul>
                                <li className={suggestedCities === "POPULAR TRIPS" ? 'd-none' : ''} onClick={(e) => {
                                    e.preventDefault();
                                    handleSuggestedCities(["Tokyo", "Roma", "Barcellona", "Parigi", "Londra", "Xi'an"], "POPULAR TRIPS");
                                }
                                }>Popular Trips</li>
                                <li className={suggestedCities === "BUDGET TRIPS" ? 'd-none' : ''} onClick={(e) => {
                                    e.preventDefault();
                                    handleSuggestedCities(["Francoforte", "Lione", "Verona", "Osaka", "Venezia", "Liverpool"], "BUDGET TRIPS");
                                }
                                }>Budget Trips</li>
                                <li className={suggestedCities === "ASIAN DESTINATIONS" ? 'd-none' : ''} onClick={(e) => {
                                    e.preventDefault();
                                    handleSuggestedCities(["Tokyo", "Pechino", "Xi'an", "Osaka", "Kyoto", "Guilin"], "ASIAN DESTINATIONS");
                                }
                                }>Asian Destinations</li>
                                <li className={suggestedCities === "EUROPEAN GETAWAYS" ? 'd-none' : ''} onClick={(e) => {
                                    e.preventDefault();
                                    handleSuggestedCities(["Venezia", "Roma", "Parigi", "Barcellona", "Madrid", "Londra"], "EUROPEAN GETAWAYS");
                                }
                                }>European Getaways</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;
