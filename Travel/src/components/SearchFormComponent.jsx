import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const SearchFormComponent = function ({ search }) {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    // Stati per ciascun campo
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [maxBudget, setMaxBudget] = useState(5000);

    useEffect(() => {
        const rangeInput = document.getElementById('budget');
        if (rangeInput) {
            const percent = (maxBudget / 10000) * 100;
            rangeInput.style.setProperty('--progress', `${percent}%`);
        }
    }, []);

    const handleMaxBudgetChange = (e) => {
        const value = e.target.value;
        setMaxBudget(value);

        // Calcola la percentuale
        const percent = (value / 10000) * 100;

        // Aggiorna la variabile CSS direttamente sul target
        e.target.style.setProperty('--progress', `${percent}%`);
    };

    // Funzione per inviare il form 
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(location.pathname);
        if (location.pathname === "/") {
            dispatch({
                type: 'TOGGLE_SEARCH',
                payload: true,
            });
        }
        navigate('/results');
    };


    return (
        <div className={`search-form-container ${search ? 'search' : ''} bg-white`}>
            <form className="search-form" onSubmit={handleSubmit}>
                {/* Campo di ricerca per il luogo */}
                <div className="form-section">
                    <label htmlFor="destination">Select Your Destination :</label>
                    <input
                        type="text"
                        id="destination"
                        name="destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Es. Parigi"
                        required
                    />
                </div>

                {/* Campo di ricerca per la data */}
                <div className="form-section">
                    <label htmlFor="date">Select Your Date :</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                {/* Campo di ricerca per il budget */}
                <div className="form-section range-section mb-auto">
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
                        max="10000"
                        step="100"
                        value={maxBudget}
                        onChange={handleMaxBudgetChange}
                        className="range"
                    />
                </div>

                <button type="submit"><i className="bi bi-search"></i></button>
            </form>
        </div>
    )
}

export default SearchFormComponent