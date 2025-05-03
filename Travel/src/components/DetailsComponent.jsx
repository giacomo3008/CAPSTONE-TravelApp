import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "../style/details.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DetailsComponent = function () {
    const { id } = useParams();
    const [structure, setStructure] = useState(null);
    const token = useSelector((state) => state.authLogin.token);
    const [isLoading, setIsLoading] = useState(true);
    const [imageSubset, setImageSubset] = useState([]);
    const [remainingSlots, setRemainingSlots] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [guests, setGuests] = useState(1);
    const [maxGuests, setMaxGuests] = useState(1);
    const [invalidDates, setInvalidDates] = useState(false);
    const [pulse, setPulse] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const getStructureDetails = async (id) => {
        try {
            const URL = "https://localhost:7146/api/"
            const response = await fetch(URL + "listing/" + id);

            if (!response.ok) {
                throw new Error("Errore nel recuperare la struttura");
            }
            const data = await response.json();
            console.log(data);
            setStructure(data);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getStructureDetails(id);
    }, []);

    useEffect(() => {
        if (structure !== null) {
            setImageSubset(structure.imgUrls.slice(1));
            setRemainingSlots(Math.max(0, 6 - imageSubset.length));
            setMaxGuests(structure.description.capacity);
            setIsLoading(false);
        }
    }, [structure]);

    const handleHost = (e) => {
        e.preventDefault();
        navigate(`/userInfo/${structure.user.email}`);
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

        try {
            const numberOfPeople = guests;
            const URL = "https://localhost:7146/api/"
            const response = await fetch(URL + "listing/cart/" + id, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ startDate, endDate, numberOfPeople })
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
                    throw new Error("Errore nella post del cart item!");
                }
                const data = await response.json();
                console.log(data);
                navigate('/cart');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {!isLoading ? (
                <Container className="details-container mt-5">
                    <h2 className="mt-5">{structure.hotelName}</h2>
                    {/* Sezione immagini */}
                    <div style={{ height: "450px", display: "flex" }} className="imgs-details mt-4 mb-5">
                        {/* Immagine principale a sinistra */}
                        <div style={{ width: "50%", marginRight: "0rem" }} className="img-principal">
                            <div
                                style={{
                                    height: "100%",
                                    backgroundColor: "rgba(222, 222, 222, 0.55)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.5rem",
                                    overflow: "hidden"
                                }}
                            >{
                                    structure.imgUrls[0] ? (
                                        <img className="h-100" src={structure.imgUrls[0]} />
                                    ) : (
                                        <div style={{
                                            width: "100%",
                                            backgroundColor: "trasparent",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: "100%",
                                            overflow: "hidden"
                                        }}>
                                            <div className="h-100 w-100 bg-transparent icon-div d-flex flex-row justify-content-center align-items-center">
                                                <i className="fa-regular fa-building"></i>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div style={{ width: "50%", flexDirection: "column", justifyContent: "space-between", flexWrap: "wrap" }} className="d-none d-lg-flex">
                            {
                                imageSubset.map((url, index) => (
                                    <div key={`img-${index}`} style={{
                                        width: "50%",
                                        height: "32%",
                                        marginLeft: "0.5rem",
                                        overflow: "hidden"
                                    }}>
                                        <img src={url} className="w-100" />
                                    </div>
                                ))
                            }
                            {
                                Array.from({ length: remainingSlots }).map((_, index) => (
                                    <div key={`img-${index}`} style={{
                                        width: "50%",
                                        backgroundColor: "rgba(222, 222, 222, 0.55)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "32%",
                                        marginLeft: "0.5rem",
                                        overflow: "hidden"
                                    }}>
                                        <div className="h-100 w-100 bg-transparent icon-div d-flex flex-row justify-content-center align-items-center">
                                            <i className="fa-regular fa-building"></i>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* Sezione descrizione */}
                    <Row>
                        <Col xs={12} md={8} className="pe-5">
                            <h4>{structure.description.propertyType.name} &nbsp;&bull;&nbsp; {structure.description.city.name}, {structure.description.city.country.name}</h4>
                            <p>{structure.description.city.experienceType.name} &bull; <i className={structure.description.city.experienceType.icon}></i></p>
                            <hr className="mt-4" />
                            <div className="d-flex flex-row align-items-center mt-4">
                                <img
                                    src="/src/assets/img/profile-placeholder.png"
                                    alt="User"
                                    className="profile-icon me-3"
                                />
                                {
                                    structure.user != null ? (
                                        <h5 className="m-0 host-name"><strong>Nome dell'host :</strong> &nbsp; <span className="host-name-span" onClick={handleHost}>{structure.user.firstName} {structure.user.lastName}</span></h5>
                                    ) : (
                                        <h5 className="m-0 host-name"><strong>Nome dell'host :</strong> &nbsp; Utente Sconosciuto</h5>
                                    )
                                }
                            </div>
                            <hr className="mt-4 mb-5" />
                            <div className="mb-4 d-flex flex-row align-items-center lista-desc">
                                <i className="fa-solid fa-bed me-4 ms-3"></i>
                                <div>
                                    <h5 className="m-0">Numero letti :</h5>
                                    <p className="m-0">{structure.description.beds}</p>
                                </div>
                            </div>
                            <div className="mb-4 d-flex flex-row align-items-center lista-desc">
                                <i className="fa-solid fa-user-group me-4 ms-3"></i>
                                <div>
                                    <h5 className="m-0">Capienza persone :</h5>
                                    <p className="m-0">{structure.description.capacity}</p>
                                </div>
                            </div>
                            <hr className="mt-5 mb-4" />
                            <p className="mt-5 mb-5">{structure.description.description}</p>
                        </Col>
                        <Col xs={12} md={4}>
                            <form onSubmit={handleSubmit} className="booking-form mx-md-auto">
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
                                            {/* <label>Check-out</label> */}
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
                                {
                                    startDate && endDate && !invalidDates && (
                                        <div class="summary-box">
                                            <p class="info-text mt-3 mb-4">Non riceverai alcun addebito in questa fase</p>

                                            <div class="rows">
                                                <p className="d-flex flex-row justify-content-between m-0 underline-p">Alloggio </p>
                                                <p>{parseFloat(Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) * structure.description.pricePerNight).toLocaleString('it-IT', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })} €</p>
                                            </div>
                                            <div class="rows">
                                                <p className="d-flex flex-row justify-content-between m-0 underline-p">Costi di pulizia </p>
                                                <p>100,00 €</p>
                                            </div>
                                            <div class="rows">
                                                <p className="d-flex flex-row justify-content-between m-0 p-0 underline-p">Costi del servizio Travel </p>
                                                <p className="m-0 p-0">{parseFloat(Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) * structure.description.pricePerNight * 0.2).toLocaleString('it-IT', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })} €</p>
                                            </div>

                                            <hr className="my-4" />

                                            <div class="rows total">
                                                <p className="d-flex flex-row justify-content-between m-0 p-0">Totale </p>
                                                <p className="m-0 p-0">{parseFloat((Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) * structure.description.pricePerNight) * 1.2 + 100).toLocaleString('it-IT', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })} €</p>
                                            </div>
                                        </div>
                                    )
                                }

                                <button type="submit">Aggiungi prenotazione</button>
                            </form>

                        </Col>
                    </Row>
                </Container>
            ) : (
                <Container className="skeleton-details mt-5">
                    {/* Titolo della struttura */}
                    <div className="skeleton-title"></div>

                    {/* Sezione Immagini */}
                    <div style={{ height: "450px", display: "flex" }} className="imgs-details mt-4 mb-5">
                        <div style={{ width: "50%", backgroundColor: "grey", marginRight: "0rem" }}>
                            <div
                                style={{
                                    height: "100%",
                                    backgroundColor: "grey",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.5rem",
                                    overflow: "hidden"
                                }}
                            >
                                <div className="skeleton-img-main"></div>
                            </div>
                        </div>
                        <div style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "space-between", flexWrap: "wrap" }}>
                            <div className="skeleton-img-sub"></div>
                            <div className="skeleton-img-sub"></div>
                            <div className="skeleton-img-sub"></div>
                        </div>
                    </div>

                    {/* Sezione Descrizione */}
                    <Row>
                        <Col xs={8} className="pe-5">
                            <div className="skeleton-paragraph skeleton-title"></div>
                            <div className="skeleton-paragraph skeleton-title"></div>
                            <div className="skeleton-paragraph"></div>
                            <div className="skeleton-paragraph"></div>
                            <div className="skeleton-paragraph"></div>
                            <div className="skeleton-paragraph"></div>
                            <div className="skeleton-paragraph"></div>
                            <div className="skeleton-paragraph"></div>
                        </Col>
                        <Col xs={4}>
                            <div className="skeleton-form">
                                <div className="skeleton-form-input"></div>
                                <div className="skeleton-form-input"></div>
                                <div className="skeleton-form-input"></div>
                                <div className="skeleton-btn"></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )
            }
        </>
    );
}

export default DetailsComponent