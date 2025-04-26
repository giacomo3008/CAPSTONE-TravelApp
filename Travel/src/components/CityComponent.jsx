import { Button, Card, Col, Row } from "react-bootstrap";
import "../style/suggested.css"
import SearchFormComponent from "./SearchFormComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cityStructures } from "../redux/actions/cityStructuresAction";

const CityComponent = function () {
    const { name } = useParams();
    const pulseBool = useSelector((state) => state.pulseResults.pulseBool)
    const dispatch = useDispatch();
    const city = useSelector((state) => state.cityStructures.city);
    const cards = useSelector((state) => state.cityStructures.listings);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({
            type: 'TOGGLE_SEARCH',
            payload: true,
        });
        dispatch(cityStructures(name));
    }, []);

    const handleDetailsBtn = (e, id) => {
        e.preventDefault();
        navigate(`/details/${id}`);
    }

    return (
        <>
            {city ? (
                <div className="results-div container-fluid py-5 px-0 bg-white">
                    <SearchFormComponent search={true} />
                    <div className={`suggested-container ${pulseBool ? 'pulse' : ''} m-0 mx-auto bg-white`}>
                        <h2 className="mb-5">Strutture trovate a {name} :</h2>
                        <Row className="d-flex flex-row justify-content-start">
                            {
                                cards.map((card) => (
                                    <Col lg={4} key={card.id}>
                                        <Card style={{ width: '18rem' }} className=" mx-auto mb-4 position-relative card-listings">
                                            <div className="img-card-cities">
                                                {
                                                    card.listing.imgUrls.length > 0 && (
                                                        <img height="195px" src={card.listing.imgUrls[0]} />
                                                    )
                                                }
                                            </div>
                                            <div className=" position-absolute icons">
                                                <i className={city.experienceType.icon}></i>
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
                                                <Button onClick={(e) => handleDetailsBtn(e, card.listing.id)}>DETAILS</Button>
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