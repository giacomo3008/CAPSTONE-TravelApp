import { useEffect, useState } from 'react';
import '../style/login.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SummaryBoxComponent = ({ idCartItem, maxGuests, _startDate, _endDate, _guests }) => {
    const isSummaryBox = useSelector((state) => state.summaryBox.summaryBox);
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(_startDate);
    const [endDate, setEndDate] = useState(_endDate);
    const [invalidDates, setInvalidDates] = useState(false);
    const [pulse, setPulse] = useState(false);
    const token = useSelector((state) => state.authLogin.token);
    const navigate = useNavigate();
    const [guests, setGuests] = useState(_guests);



    //serve per non far scorrere lo sfondo sotto mentre la modale è aperta
    useEffect(() => {
        if (isSummaryBox) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isSummaryBox]);

    const handleClose = () => {
        dispatch({
            type: 'SUMMARYBOX_CLOSE',
            payload: true,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (invalidDates) {
            setPulse(true);
            setTimeout(() => {
                setPulse(false);
            }, 200);
            return;
        }
        if (!token) {
            dispatch({
                type: 'LOGIN',
                payload: true,
            });
            return;
        }

        const payload = {
            startDate,
            endDate,
            numberOfPeople: guests,
        }
        console.log("info aggiornate cart item: ", payload);

        try {
            const url = "https://localhost:7146/api/";
            const response = await fetch(url + "listing/cart/" + idCartItem, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
            });
            if (response.status === 401 || response.status === 403) {
                dispatch({
                    type: 'LOGOUT',
                    payload: true
                });
                localStorage.removeItem('token');
                navigate('/');
            } else {
                if (!response.ok) {
                    throw new Error("Errore nella PUT di cart item");
                }
                const data = await response.json();
                console.log(data);
                dispatch({
                    type: 'SUMMARYBOX_CLOSE',
                    payload: true,
                });
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {
                isSummaryBox && (
                    <div className="modal-overlay" onClick={(e) => {
                        e.preventDefault();
                        handleClose();
                    }}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="close-button" onClick={(e) => {
                                e.preventDefault();
                                handleClose();
                            }}>
                                <i className="fas fa-times"></i>
                            </button>
                            <form onSubmit={handleSubmit} className="booking-form summary-box-form mx-md-auto">
                                <h2>Prenota il tuo soggiorno</h2>
                                <div className="box-form container-fluid">
                                    <div className=" row">
                                        <div className=" col-6 form-floating p-0 m-0">
                                            {/* <label>Check-in</label> */}
                                            <input
                                                type="date"
                                                className={`first-input form-control ${startDate ? 'selected' : ''}`}
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
                                        <div className="col-6 form-floating p-0 m-0">
                                            <input
                                                type="date"
                                                className={`form-control ${endDate ? 'selected' : ''}`}
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
                                    <div className="row">
                                        <div className="col-12 form-floating p-0 m-0">
                                            <select
                                                value={guests}
                                                id="guests"
                                                className="last-input form-control"
                                                onChange={(e) => setGuests(parseInt(e.target.value))}
                                                required
                                            >
                                                {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
                                                    <option key={num} value={num}>
                                                        {num} {num === 1 ? "ospite" : "ospiti"}
                                                    </option>
                                                ))}
                                            </select>
                                            <label htmlFor="guests">Numero di ospiti</label>
                                        </div>
                                    </div>
                                </div>
                                {
                                    invalidDates && (
                                        <div className={`ps-2 error-message ${pulse ? 'pulse' : ''}`} style={{ color: 'red', marginTop: '10px' }}>
                                            Inserisci delle date valide!
                                        </div>
                                    )
                                }

                                <button type="submit">Modifica prenotazione</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default SummaryBoxComponent;
