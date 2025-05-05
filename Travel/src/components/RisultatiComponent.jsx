import { Button, Card, Col, Row } from "react-bootstrap";
import "../style/suggested.css"
import SearchFormComponent from "./SearchFormComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cityStructures } from "../redux/actions/cityStructuresAction";
import config from '../config';

const RisultatiComponent = function () {
    const { destination } = useParams();
    const pulseBool = useSelector((state) => state.pulseResults.pulseBool);
    const maxBudget = useSelector((state) => state.filtersSearch.maxBudget);
    const prieviousStartDate = useSelector((state) => state.filtersSearch.startDate);
    const prieviousEndDate = useSelector((state) => state.filtersSearch.endDate);
    const beds = useSelector((state) => state.filtersSearch.beds);
    const capacity = useSelector((state) => state.filtersSearch.capacity);
    const propType = useSelector((state) => state.filtersSearch.propType);
    const budgetFilter = useSelector((state) => state.filtersSearch.budgetFilter);

    const dispatch = useDispatch();
    const city = useSelector((state) => state.cityStructures.city);
    const cardsReducer = useSelector((state) => state.cityStructures.listings);
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();
    const isLoading = useSelector((state) => state.isLoading.isLoading);
    const token = useSelector((state) => state.authLogin.token);

    useEffect(() => {
        if (propType === null) {
            setCards(cardsReducer.filter(card => card.beds >= beds && card.capacity >= capacity && card.pricePerNight <= budgetFilter));
        } else {
            setCards(cardsReducer.filter(card => card.beds >= beds && card.capacity >= capacity && card.pricePerNight >= budgetFilter && card.propertyType.name === propType));
        }
    }, [beds, capacity, propType, budgetFilter]);

    useEffect(() => {
        setCards(cardsReducer);
    }, [cardsReducer]);

    useEffect(() => {
        dispatch({
            type: 'CHANGE_FILTERS',
            payload: {
                beds: 0,
                capacity: 0,
                propType: null,
                budgetFilter: 10000,
            },
        });
    }, []);

    useEffect(() => {
        dispatch({
            type: 'SET_ISLOADING',
            payload: true,
        });
        dispatch({
            type: 'TOGGLE_SEARCH',
            payload: true,
        });
        const name = destination;
        if (token) {
            dispatch(cityStructures({ name, token, maxBudget }));
        } else {
            dispatch(cityStructures({ name, maxBudget }));
        }
        console.log(prieviousEndDate, prieviousStartDate);
    }, [destination, maxBudget, prieviousStartDate, prieviousEndDate]);


    const handleDetailsBtn = (e, id) => {
        e.preventDefault();
        console.log(id);
        navigate(`/details/${id}`);
    }

    const handleFavoriteDelete = async (id) => {
        try {
            const url = config.serverUrl + "/api/";
            const response = await fetch(url + "listing/favorite/" + id, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 401 || response.status === 403) {
                dispatch({
                    type: 'LOGOUT',
                    payload: true
                });
                localStorage.removeItem('token');
                dispatch({
                    type: 'LOGIN',
                    payload: true,
                });
                navigate(`/results/${destination}`);
            } else {
                if (!response.ok) {
                    throw new Error("Errore nella delete");
                }
                const data = await response.json();
                console.log(data);
                const name = destination;
                dispatch(cityStructures({ name, token }));
                navigate(`/results/${destination}`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleFavoriteAuthenticated = async (id) => {
        try {
            const url = config.serverUrl + "/api/";
            const response = await fetch(url + "listing/favorites/" + id, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 401 || response.status === 403) {
                dispatch({
                    type: 'LOGOUT',
                    payload: true
                });
                localStorage.removeItem('token');
                dispatch({
                    type: 'LOGIN',
                    payload: true,
                });
                navigate(`/results/${destination}`);
            } else {
                if (!response.ok) {
                    throw new Error("Errore nella post");
                }
                const name = destination;

                dispatch(cityStructures({ name, token }));
                navigate(`/results/${destination}`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    if (!isLoading && city == null) {
        return (
            <div className="results-div container-fluid py-5 px-0 bg-white">
                <SearchFormComponent search={true} budget={maxBudget} city={destination} prieviousStartDate={prieviousStartDate} prieviousEndDate={prieviousEndDate} />
                <div className={`suggested-container ${pulseBool ? 'pulse' : ''} m-0 mx-auto bg-white`}>
                    <h3 className="mb-5">Non ci sono Strutture disponibili per "{destination}"</h3>
                </div>
            </div>
        )
    }

    if (!isLoading && cards.length == 0) {
        return (
            <div className="results-div container-fluid py-5 px-0 bg-white">
                <SearchFormComponent search={true} budget={maxBudget} city={destination} prieviousStartDate={prieviousStartDate} prieviousEndDate={prieviousEndDate} />
                <div className={`suggested-container ${pulseBool ? 'pulse' : ''} m-0 mx-auto bg-white`}>
                    <h3 className="mb-5">Non ci sono Strutture disponibili per {city.name}</h3>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="results-div container-fluid py-5 px-0 bg-white">
                <SearchFormComponent search={true} budget={maxBudget} city={destination} prieviousStartDate={prieviousStartDate} prieviousEndDate={prieviousEndDate} />
                <div className={`suggested-container ${pulseBool ? 'pulse' : ''} m-0 mx-auto bg-white`}>
                    <h2 className="mb-5">Risultati della tua ricerca :</h2>
                    <Row className="d-flex flex-row justify-content-start">
                        {isLoading ? (
                            <>
                                {
                                    Array.from({ length: 6 }, (_, index) => (
                                        <Col lg={4} className="mb-5" key={index}>
                                            <Card style={{ width: '18rem' }} className="mx-auto position-relative skeleton-card">
                                                <div className="img-card skeleton-img" />
                                                <Card.Body className="d-flex flex-column justify-content-between">
                                                    <div>
                                                        <div className="skeleton-title skeleton-text"></div>
                                                        <div className="skeleton-continent skeleton-text"></div>
                                                        <div className="intermedio py-2 mb-3 d-flex flex-row justify-content-between align-items-center">
                                                            <div className="skeleton-type skeleton-text"></div>
                                                            <div className="skeleton-btn skeleton-text"></div>
                                                        </div>
                                                        <div className="skeleton-description skeleton-text"></div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))
                                }
                            </>
                        ) : (
                            <>
                                {
                                    cards.map((card) => (
                                        <Col sm={6} lg={4} key={card.id}>
                                            <Card style={{ width: '18rem' }} className=" mx-auto mb-4 position-relative card-listings" onClick={(e) => handleDetailsBtn(e, card.listing.id)}>
                                                <div className="img-card-cities">
                                                    {
                                                        card.listing.imgUrls[0] ? (
                                                            <img src={config.serverUrl + card.listing.imgUrls[0]} height="195px" />
                                                        ) : (
                                                            <div style={{
                                                                width: "100%",
                                                                backgroundColor: "rgba(181, 181, 181, 0.32)",
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
                                                <div className=" position-absolute icons">
                                                    <i className={city.experienceType.icon}></i>
                                                </div>
                                                <div className=" position-absolute favorite">
                                                    {
                                                        !card.listing.isUserListingFavorites ? (
                                                            <>
                                                                {
                                                                    token == null ? (
                                                                        <i className="fa-solid fa-heart" onClick={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            dispatch({
                                                                                type: 'LOGIN',
                                                                                payload: true,
                                                                            });
                                                                        }}></i>
                                                                    ) : (
                                                                        <i className="fa-solid fa-heart" onClick={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            handleFavoriteAuthenticated(card.listing.id);
                                                                        }}></i>
                                                                    )
                                                                }
                                                            </>
                                                        ) : (
                                                            <i className="fa-solid fa-heart fav-card" onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                handleFavoriteDelete(card.listing.id);
                                                            }}></i>
                                                        )
                                                    }
                                                </div>

                                                <Card.Body className="d-flex flex-column justify-content-between">
                                                    <div className="card-body">
                                                        <Card.Title className="mb-1">{card.listing.hotelName}</Card.Title>
                                                        <p className="continente"><i className="bi bi-geo-alt-fill"></i> {city.name}</p>
                                                        <div className="intermedio py-2 mb-3 d-flex flex-row justify-content-between align-items-center">
                                                            <p className="tipo m-0">{city.experienceType.name}</p>
                                                            <p className="prezzo m-0">{card.pricePerNight} € <span className="notte">/ notte</span></p>
                                                        </div>
                                                        <Card.Text>
                                                            {card.description}
                                                        </Card.Text>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))
                                }
                            </>
                        )
                        }
                    </Row>
                </div>
            </div>
        </>
    );
};

export default RisultatiComponent;