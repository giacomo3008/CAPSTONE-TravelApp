import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FiltersModalComponent from "./FiltersModalComponent";


const SearchFormComponent = function ({ search, budget = 120, city = '', prieviousStartDate = '', prieviousEndDate = '' }) {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    // Stati per ciascun campo
    const [destination, setDestination] = useState(city);
    const [startDate, setStartDate] = useState(prieviousStartDate);
    const [endDate, setEndDate] = useState(prieviousEndDate);
    const [maxBudget, setMaxBudget] = useState(budget);
    const [invalidDates, setInvalidDates] = useState(false);
    const [pulse, setPulse] = useState(false);


    const handleFilters = (e) => {
        e.preventDefault();
        dispatch({
            type: 'FILTERS_OPEN',
            payload: true,
        });
    };

    useEffect(() => {
        handleMaxBudgetChange();
    }, [maxBudget]);

    const handleMaxBudgetChange = () => {
        const rangeInput = document.getElementById('budget');
        const percent = (maxBudget / 1000) * 100;
        rangeInput.style.setProperty('--progress', `${percent}%`);
    };

    // Funzione per inviare il form 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (invalidDates) {
            setPulse(true);
            setTimeout(() => {
                setPulse(false);
            }, 200);
            return;
        }
        console.log(location.pathname);
        if (location.pathname === "/") {
            dispatch({
                type: 'TOGGLE_SEARCH',
                payload: true,
            });
        }
        dispatch({
            type: 'SEARCH_FILTERS',
            payload: {
                maxBudget,
                startDate,
                endDate,
            }
        });
        navigate(`/results/${destination}`);
    };

    return (
        <>
            <FiltersModalComponent budget={maxBudget} setMaxBudget={setMaxBudget} />
            <div className={`search-form-container ${search ? 'search' : ''} `}>
                <form className="search-form" onSubmit={handleSubmit}>
                    {
                        search && (
                            <button className='btn-filters me-4 d-none d-lg-flex flex-row align-items-center' type='button' onClick={handleFilters}><i className="fa-solid fa-sliders me-2"></i> Filters</button>
                        )
                    }
                    {/* Campo di ricerca per il luogo */}
                    <div className="form-section dest">
                        <div className="form-floating p-0 m-0">
                            <input
                                type="text"
                                id="destination"
                                className='form-control'
                                name="destination"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder="Es. Parigi"
                                required
                            />
                            <label htmlFor="destination">Select Your Destination</label>
                        </div>
                    </div>

                    {/* Campo di ricerca per la data */}
                    <div className="form-section dates">
                        <div className='d-flex flex-row w-100'>
                            <div className="form-floating p-0 m-0 w-50">
                                <input
                                    type="date"
                                    className={`form-control startDate`}
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => {
                                        if (e.target.value < endDate && endDate) {
                                            setInvalidDates(false);
                                            setStartDate(e.target.value);
                                        } else if (!endDate) {
                                            setInvalidDates(false);
                                            setStartDate(e.target.value);
                                        } else {
                                            setStartDate(e.target.value);
                                            setInvalidDates(true);
                                        }
                                    }}
                                    required
                                />
                                <label htmlFor="startDate">Check-in</label>
                            </div>
                            <div className="form-floating p-0 m-0 w-50">
                                {/* <label>Check-out</label> */}
                                <input
                                    type="date"
                                    className={`form-control endDate`}
                                    id="endDate"
                                    value={endDate}
                                    onChange={(e) => {
                                        if (e.target.value > startDate && startDate) {
                                            setInvalidDates(false);
                                            setEndDate(e.target.value);
                                        } else if (!startDate) {
                                            setInvalidDates(false);
                                            setEndDate(e.target.value);
                                        } else {
                                            setEndDate(e.target.value);
                                            setInvalidDates(true);
                                        }
                                    }}
                                    required
                                />
                                <label htmlFor="endDate">Check-out</label>
                            </div>
                        </div>
                        {
                            invalidDates && (
                                <div className={`ps-2 error-message ${pulse ? 'pulse' : ''}`} style={{ color: 'red', marginTop: '10px' }}>
                                    Inserisci delle date valide!
                                </div>
                            )
                        }
                    </div>

                    {/* Campo di ricerca per il budget */}
                    <div className="form-section budg range-section mb-auto">
                        <label htmlFor="budget" className='w-100 m-0 p-0'>
                            <div className=' d-flex flex-row justify-content-between align-items-center mb-1'>
                                <p className='m-0 p-0 mb-auto'>Max Price :</p>
                                <span id="max-value" className='pt-3'>€{maxBudget}</span>
                            </div>
                        </label>
                        <input
                            type="range"
                            id="budget"
                            name="budget"
                            min="0"
                            max="1000"
                            step="20"
                            value={maxBudget}
                            onChange={(e) => setMaxBudget(e.target.value)}
                            className="range"
                        />
                    </div>
                    {
                        search ? (
                            <div className='d-flex flex-row mt-auto mt-lg-0 ms-0 ms-sm-5'>
                                <button className='btn-filters me-4 d-flex d-lg-none flex-row align-items-center mt-auto mt-sm-0' type='button' onClick={handleFilters}><i className="fa-solid fa-sliders me-2"></i> Filters</button>
                                <button className="btn-submit" type="submit"><i className="bi bi-search"></i></button>
                            </div>
                        ) : (
                            <button className="btn-submit" type="submit" ><i className="bi bi-search"></i></button>
                        )
                    }
                </form>
            </div>
        </>
    )
}

export default SearchFormComponent