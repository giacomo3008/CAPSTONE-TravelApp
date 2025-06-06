import { Button, Card, Col, Row } from "react-bootstrap";
import "../style/suggested.css"
import SearchFormComponent from "./SearchFormComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cityStructures } from "../redux/actions/cityStructuresAction";
import config from '../config';

const CityComponent = function () {
    const { name } = useParams();
    const pulseBool = useSelector((state) => state.pulseResults.pulseBool)
    const dispatch = useDispatch();
    const city = useSelector((state) => state.cityStructures.city);
    const cardsReducer = useSelector((state) => state.cityStructures.listings);
    const [cards, setCards] = useState([]); const navigate = useNavigate();
    const token = useSelector((state) => state.authLogin.token);
    const beds = useSelector((state) => state.filtersSearch.beds);
    const capacity = useSelector((state) => state.filtersSearch.capacity);
    const propType = useSelector((state) => state.filtersSearch.propType);
    const budgetFilter = useSelector((state) => state.filtersSearch.budgetFilter);

    useEffect(() => {
        dispatch({
            type: 'TOGGLE_SEARCH',
            payload: true,
        });

        dispatch({
            type: 'SEARCH_FILTERS',
            payload: {
                maxBudget: null,
                startDate: null,
                endDate: null,
            },
        });

        dispatch({
            type: 'CHANGE_FILTERS',
            payload: {
                beds: 0,
                capacity: 0,
                propType: null,
                budgetFilter: 10000,
            },
        });

        if (token) {
            dispatch(cityStructures({ name, token }));
        } else {
            dispatch(cityStructures({ name }));
        }
    }, []);

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

    const handleDetailsBtn = (e, id) => {
        e.preventDefault();
        navigate(`/details/${id}`);
    }

    const handleFavoriteDelete = async (id) => {
        try {
            const url = config.serverUrl;
            const response = await fetch(url + "/api/listing/favorite/" + id, {
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
                navigate('/');
            } else {
                if (!response.ok) {
                    throw new Error("Errore nella delete");
                }
                const data = await response.json();
                console.log(data);
                dispatch(cityStructures({ name, token }));
                navigate(`/city/${name}`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleFavoriteAuthenticated = async (id) => {
        try {
            const url = config.serverUrl;
            const response = await fetch(url + "/api/listing/favorites/" + id, {
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
                navigate('/');
            } else {
                if (!response.ok) {
                    throw new Error("Errore nella post");
                }
                dispatch(cityStructures({ name, token }));
                navigate(`/city/${name}`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    if (city && cards.length == 0) {
        return (
            <div className="results-div container-fluid py-5 px-0 bg-white">
                <SearchFormComponent search={true} />
                <div className={`suggested-container ${pulseBool ? 'pulse' : ''} m-0 mx-auto bg-white`}>
                    <h3 className="mb-5">Non ci sono Strutture disponibili per {city.name}</h3>
                </div>
            </div>
        )
    }

    return (
        <>
            {city ? (
                <div className="results-div container-fluid py-5 px-0 bg-white">
                    <SearchFormComponent search={true} />
                    <div className={`suggested-container ${pulseBool ? 'pulse' : ''} m-0 mx-auto bg-white`}>
                        <h2 className="mb-5">Strutture trovate a {name} :</h2>
                        <Row>
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
                                                                        e.stopPropagation();
                                                                        e.preventDefault();
                                                                        dispatch({
                                                                            type: 'LOGIN',
                                                                            payload: true,
                                                                        });
                                                                    }}></i>
                                                                ) : (
                                                                    <i className="fa-solid fa-heart" onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        e.preventDefault();
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
                        </Row>
                    </div>
                </div>
            ) : (
                <>
                    <div className="results-div container-fluid py-5 px-0 bg-white">
                        <SearchFormComponent search={true} />
                        <div className={`suggested-container ${pulseBool ? 'pulse' : ''} m-0 mx-auto bg-white`}>
                            <h2 className="mb-5">Strutture trovate a {name} :</h2>
                            <Row className="d-flex flex-row justify-content-start">
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
                            </Row>
                        </div>
                    </div>
                </>
            )
            }
        </>
    );
};

export default CityComponent;