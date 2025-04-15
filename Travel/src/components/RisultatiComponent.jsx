import { Button, Card, Col, Row } from "react-bootstrap";
import "../style/suggested.css"
import SearchFormComponent from "./SearchFormComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RisultatiComponent = function () {
    const pulseBool = useSelector((state) => state.pulseResults.pulseBool)
    const dispatch = useDispatch();
    const cards = useSelector((state) => state.cards.cards);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({
            type: 'TOGGLE_SEARCH',
            payload: true,
        });
    }, []);

    const handleDetailsBtn = (e, id) => {
        e.preventDefault();
        navigate(`/details/${id}`);
    }

    return (
        <div className="results-div container-fluid py-5 px-0 bg-white">
            <SearchFormComponent search={true} />
            <div className={`suggested-container ${pulseBool ? 'pulse' : ''} m-0 mx-auto bg-white`}>
                <h2 className="mb-4">Risultati della tua ricerca :</h2>
                <Row className="d-flex flex-row justify-content-between">
                    {
                        cards.map((card) => (
                            <Col lg={4} key={card.id}>
                                <Card style={{ width: '18rem' }} className=" mx-auto mb-4 position-relative">
                                    <Card.Img variant="top" src={card.imgSrc} />
                                    <div className=" position-absolute icons">
                                        <i className="fa-solid fa-landmark"></i>
                                    </div>
                                    <Card.Body className="d-flex flex-column justify-content-between">
                                        <div>
                                            <Card.Title className="mb-1">{card.title}</Card.Title>
                                            <p className="continente"><i className="bi bi-geo-alt-fill"></i> {card.continent}</p>
                                            <div className="intermedio py-2 mb-3 d-flex flex-row justify-content-between align-items-center">
                                                <p className="tipo m-0">{card.typeExp}</p>
                                                <p className="prezzo m-0">{card.price} €</p>
                                            </div>
                                            <Card.Text>
                                                {card.text}
                                            </Card.Text>
                                        </div>
                                        <Button onClick={(e) => handleDetailsBtn(e, card.id)}>DETAILS</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        </div>
    );
};

export default RisultatiComponent;