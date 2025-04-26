import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../style/details.css"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DetailsComponent = function () {
    const { id } = useParams();
    const [structure, setStructure] = useState(null);
    const token = useSelector((state) => state.authLogin.token);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [imageSubset, setImageSubset] = useState([]);
    const [remainingSlots, setRemainingSlots] = useState(0);
    const [userHost, setUserHost] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [guests, setGuests] = useState(1);
    const [maxGuests, setMaxGuests] = useState(1);


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

    const getUserHost = async (id) => {
        try {
            const URL = "https://localhost:7146/api/"
            const response = await fetch(URL + "listing/user/" + id, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 404) {
                console.warn("Utente non trovato per questa listing.");
                setUserHost(null);
                setIsLoading2(false);
                return;
            }

            if (!response.ok) {
                throw new Error("Errore nel recuperare la struttura");
            }
            const data = await response.json();
            console.log(data);
            setUserHost(data);
            setIsLoading2(false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getStructureDetails(id);
        getUserHost(id);
    }, []);

    useEffect(() => {
        if (structure !== null) {
            setImageSubset(structure.imgUrls.slice(1));
            setRemainingSlots(Math.max(0, 6 - imageSubset.length));
            setMaxGuests(structure.description.capacity);
            setIsLoading(false);
        }
    }, [structure]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(startDate, endDate, guests);
    };

    return (
        <>
            {!isLoading && !isLoading2 ? (
                <Container className="details-container mt-5">
                    <h2 className="mt-5">{structure.hotelName}</h2>
                    {/* Sezione immagini */}
                    <div style={{ height: "450px", display: "flex" }} className="imgs-details mt-4 mb-5">
                        {/* Immagine principale a sinistra */}
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
                                <img className="h-100" src={structure.imgUrls[0]} />
                            </div>
                        </div>

                        <div style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "space-between", flexWrap: "wrap" }}>
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
                        <Col xs={8} className="pe-5">
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
                                    userHost ? (
                                        <h5 className="m-0 host-name">Nome dell'host : &nbsp; {userHost.firstName} {userHost.lastName}</h5>
                                    ) : (
                                        <h5 className="m-0 host-name">Nome dell'host : &nbsp; Utente Sconosciuto</h5>
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
                                <i class="fa-solid fa-user-group me-4 ms-3"></i>
                                <div>
                                    <h5 className="m-0">Capienza persone :</h5>
                                    <p className="m-0">{structure.description.capacity}</p>
                                </div>
                            </div>
                            <hr className="mt-5 mb-4" />
                            <p className="mt-5 mb-5">{structure.description.description}</p>
                        </Col>
                        <Col xs={4}>
                            <form onSubmit={handleSubmit} className="booking-form">
                                <h2>Prenota il tuo soggiorno</h2>

                                <div className="input-group">
                                    <label>Check-in</label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Check-out</label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Numero di ospiti</label>
                                    <select
                                        value={guests}
                                        onChange={(e) => setGuests(parseInt(e.target.value))}
                                        required
                                    >
                                        {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
                                            <option key={num} value={num}>
                                                {num} {num === 1 ? "ospite" : "ospiti"}
                                            </option>
                                        ))}
                                    </select>
                                </div>

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