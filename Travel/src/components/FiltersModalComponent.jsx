import { useEffect, useState } from 'react';
import '../style/filters.css';
import { useDispatch, useSelector } from 'react-redux';
import { PiBuildingApartmentBold, PiHouseLineBold } from "react-icons/pi";
import { RiHotelBedLine } from "react-icons/ri";


const FiltersModalComponent = ({ budget, setMaxBudget }) => {
    const [budgetFilter, setBudgetFilter] = useState(null);
    const isFiltersModal = useSelector((state) => state.filtersModal.filtersModal);
    const dispatch = useDispatch();
    const [bedsFilter, setBedsFilter] = useState(0);
    const [capacityFilter, setCapacityFilter] = useState(0);
    const [propType, setPropType] = useState(null);


    useEffect(() => {
        if (isFiltersModal) {
            setBudgetFilter(budget);
            handleMaxBudgetChange();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isFiltersModal]);

    useEffect(() => {
        handleMaxBudgetChange();
    }, [budgetFilter]);


    const handleMaxBudgetChange = () => {
        const rangeInput = document.getElementById('budget-filter');
        if (budgetFilter && rangeInput) {
            const percent = (budgetFilter / 1000) * 100;
            rangeInput.style.setProperty('--progress', `${percent}%`);
        }
    };

    const handleClose = () => {
        dispatch({
            type: 'FILTERS_CLOSE',
            payload: true,
        });
    }

    const handleFilters = (e) => {
        e.preventDefault();
        setMaxBudget(budgetFilter);
        dispatch({
            type: 'CHANGE_FILTERS',
            payload: {
                beds: bedsFilter,
                capacity: capacityFilter,
                propType: propType,
                budgetFilter: budgetFilter,
            },
        });
        handleClose();
    };

    const handleDeleteFilters = (e) => {
        e.preventDefault();
        setBudgetFilter(budget);
        setBedsFilter(0);
        setCapacityFilter(0);
        setPropType(null);
    };


    return (
        <>
            {
                isFiltersModal && budgetFilter && (
                    <div className="modal-overlay-filters" onClick={(e) => {
                        e.preventDefault();
                        handleClose();
                    }}>
                        <div className="modal-content-filters text-center" onClick={(e) => e.stopPropagation()}>
                            <button className="close-button" onClick={(e) => {
                                e.preventDefault();
                                handleClose();
                            }}>
                                <i className="fas fa-times"></i>
                            </button>
                            <div className='d-flex justify-content-center align-items-center h6-div'>
                                <h6 className='m-0 p-0'>Filters</h6>
                            </div>

                            <div className='pb-4 pt-5 px-4 form-filters'>
                                <div className="form-section budg range-section p-0 m-0">
                                    <label htmlFor="budget-filter" className='w-100 m-0 p-0'>
                                        <div className=' d-flex flex-row justify-content-between align-items-center'>
                                            <div className='flex-column justify-content-start align-items-start'>
                                                <p className='m-0 p-0 text-start subtitles'>Max Price</p>
                                                <p className='m-0 p-0'>
                                                    Prezzi giornalieri, costi e tasse inclusi</p>
                                            </div>
                                            <span id="max-value">€{budgetFilter}</span>
                                        </div>
                                    </label>
                                    <input
                                        type="range"
                                        id="budget-filter"
                                        name="budget-filter"
                                        min="0"
                                        max="1000"
                                        step="20"
                                        value={budgetFilter}
                                        onChange={(e) => setBudgetFilter(e.target.value)}
                                        className="range"
                                    />
                                </div>

                                <hr className='my-5' />

                                <div className='d-flex flex-column justify-content-start align-items-start'>
                                    <p className='p-0 m-0 subtitles'>Letti e capienza</p>
                                    <p className='mb-4'>Inserisci la capienza e minima e il numero minimo di letti!</p>

                                    <div className='d-flex flex-row justify-content-between align-items-center w-100'>
                                        <p className='p-0 m-0 filters-p'>Numero di letti</p>
                                        <div className='d-flex flex-row justify-content-between align-items-center filters-div'>
                                            {
                                                bedsFilter !== 0 ? (
                                                    <button className='btn-meno' onClick={(e) => {
                                                        e.preventDefault();
                                                        setBedsFilter((prev) => prev - 1);
                                                    }}><i class="fa-solid fa-minus"></i></button>
                                                ) : (
                                                    <button className='btn-meno-disabled'><i class="fa-solid fa-minus"></i></button>
                                                )
                                            }
                                            {
                                                bedsFilter === 0 ? (
                                                    <p className='p-0 m-0 mx-2 filters-p'>Qualsiasi</p>
                                                ) : (
                                                    <p className='p-0 m-0 mx-2 filters-p'>{bedsFilter}+</p>
                                                )
                                            }
                                            {
                                                bedsFilter !== 8 ? (
                                                    <button className='btn-piu' onClick={(e) => {
                                                        e.preventDefault();
                                                        setBedsFilter((prev) => prev + 1);
                                                    }}><i class="fa-solid fa-plus"></i></button>
                                                ) : (
                                                    <button className='btn-piu-disabled'><i class="fa-solid fa-plus"></i></button>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className='d-flex flex-row justify-content-between align-items-center w-100 mt-4'>
                                        <p className='p-0 m-0 filters-p'>Capienza minima</p>
                                        <div className='d-flex flex-row justify-content-between align-items-center filters-div'>
                                            {
                                                capacityFilter !== 0 ? (
                                                    <button className='btn-meno' onClick={(e) => {
                                                        e.preventDefault();
                                                        setCapacityFilter((prev) => prev - 1);
                                                    }}><i class="fa-solid fa-minus"></i></button>
                                                ) : (
                                                    <button className='btn-meno-disabled'><i class="fa-solid fa-minus"></i></button>
                                                )
                                            }
                                            {
                                                capacityFilter === 0 ? (
                                                    <p className='p-0 m-0 mx-2 filters-p'>Qualsiasi</p>
                                                ) : (
                                                    <p className='p-0 m-0 mx-2 filters-p'>{capacityFilter}+</p>
                                                )
                                            }
                                            {
                                                capacityFilter !== 8 ? (
                                                    <button className='btn-piu' onClick={(e) => {
                                                        e.preventDefault();
                                                        setCapacityFilter((prev) => prev + 1);
                                                    }}><i class="fa-solid fa-plus"></i></button>
                                                ) : (
                                                    <button className='btn-piu-disabled'><i class="fa-solid fa-plus"></i></button>
                                                )
                                            }
                                        </div>
                                    </div>

                                </div>
                                <hr className='my-5' />

                                <div className='d-flex flex-column justify-content-start align-items-start'>
                                    <p className='m-0 p-0 text-start subtitles'>Tipo di alloggio</p>
                                    <p className='mb-4'>Scegli il tipo di alloggio che più preferisci!</p>
                                    <div className='d-flex flex-row justify-content-between align-items-start flex-wrap'>
                                        <div className={`opt-typeProp ${propType === "Appartamento" ? ('selected') : ('')} d-flex flex-row justify-content-between align-items-center`} onClick={() => {
                                            if (propType !== "Appartamento") {
                                                setPropType("Appartamento");
                                            } else {
                                                setPropType(null);
                                            }
                                        }}>
                                            <PiBuildingApartmentBold size={20} />
                                            Appartamento
                                        </div>
                                        <div className={`opt-typeProp ${propType === "Villa" ? ('selected') : ('')} d-flex flex-row justify-content-between align-items-center`} onClick={() => {
                                            if (propType !== "Villa") {
                                                setPropType("Villa");
                                            } else {
                                                setPropType(null);
                                            }
                                        }}>
                                            <PiHouseLineBold size={20} /> Villa
                                        </div>
                                        <div className={`opt-typeProp ${propType === "Hotel" ? ('selected') : ('')} d-flex flex-row justify-content-between align-items-center`} onClick={() => {
                                            if (propType !== "Hotel") {
                                                setPropType("Hotel");
                                            } else {
                                                setPropType(null);
                                            }
                                        }}>
                                            <RiHotelBedLine size={20} />
                                            Hotel
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='submit-div d-flex flex-row justify-content-between align-items-center px-4'>
                                <p className='m-0 p-0 dlt-filters' onClick={handleDeleteFilters}>Cancella filtri</p>
                                <button className='btn-submit-filters' onClick={handleFilters}>Mostra strutture</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default FiltersModalComponent;
