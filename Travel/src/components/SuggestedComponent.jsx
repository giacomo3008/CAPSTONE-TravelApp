import { Button, Card, Col, Row } from "react-bootstrap";
import "../style/suggested.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import config from '../config';
import { useSelector } from "react-redux";

const SuggestedComponent = function () {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const suggestedCitiesObject = useSelector((state) => state.suggestedCities);

    const getSuggestedCities = async () => {
        try {
            const params = new URLSearchParams();
            suggestedCitiesObject.suggestedCities.forEach(city => params.append("listCities", city));

            const url = config.serverUrl + "/api/city/suggested?" + params.toString();
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Errore nella richiesta delle città consigliate");
            }
            const data = await response.json();

            setCards(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getSuggestedCities();
    }, [suggestedCitiesObject.suggestedCities]);

    const handleDetailsBtn = (e, name) => {
        e.preventDefault();
        console.log(name);
        navigate(`/city/${name}`);
    }

    return (
        <>
            {
                suggestedCitiesObject.suggestedCities && (
                    <div className="container-fluid py-5 px-0 bg-white suggested-container-general" id="book-now">
                        <div className="suggested-container m-0 mx-auto bg-white">
                            <h2 className="mb-4">{suggestedCitiesObject.typeSuggested}</h2>
                            <Row>
                                {
                                    cards.length > 0 ?
                                        cards.map((card) => (
                                            <Col sm={6} lg={4} key={card.id}>
                                                <Card style={{ width: '18rem' }} className=" mx-auto mb-4 position-relative">
                                                    <div className="img-card">
                                                        <img height="195px" src={config.serverUrl + card.country.imgUrl} />
                                                    </div>
                                                    <div className=" position-absolute icons">
                                                        <i className={card.experienceType.icon}></i>
                                                    </div>
                                                    <Card.Body className="d-flex flex-column justify-content-between">
                                                        <div>
                                                            <Card.Title className="mb-1">{card.name}</Card.Title>
                                                            <p className="continente"><i className="bi bi-geo-alt-fill"></i> {card.country.name}</p>
                                                            <div className="intermedio py-2 mb-3 d-flex flex-row justify-content-between align-items-center">
                                                                <p className="tipo-suggested m-0">{card.experienceType.name}</p>
                                                                <button onClick={(e) => handleDetailsBtn(e, card.name)}>STRUTTURE</button>
                                                            </div>
                                                            <Card.Text>
                                                                {card.description}
                                                            </Card.Text>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )) : (
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
                                        )
                                }
                            </Row>
                        </div>
                    </div >
                )
            }
        </>
    );
};

export default SuggestedComponent;