import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../style/details.css"

const DetailsComponent = function () {
    const { id } = useParams();
    const idNum = parseInt(id);
    const cards = useSelector((state) => state.cards.cards);

    const card = cards.find((card) => card.id === idNum);

    return (
        <Container className="details-container mt-5">
            <h2 className="mt-5">Nome Hotel Esperienza</h2>
            {/* Sezione immagini */}
            <Row className="mb-3 mt-3">
                <Col md={8} className="mb-4">
                    <Card className="main-image-card">
                        <Card.Img variant="top" src={card.imgSrc} alt={card.title} />
                    </Card>
                </Col>
                <Col md={4} className="d-flex flex-column justify-content-between">
                    <Row>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Col key={index} xs={6} className="mb-3">
                                <Card>
                                    <Card.Img variant="top" src={card.imgSrc} alt={card.title} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            {/* Sezione descrizione */}
            <Row>
                <Col>
                    <h1 className="mb-3">{card.title}</h1>
                    <p className="continent mb-2"><strong>Continente:</strong> {card.continent}</p>
                    <p className="type mb-2"><strong>Tipo Esperienza:</strong> {card.typeExp}</p>
                    <p className="price mb-4"><strong>Prezzo:</strong> €{card.price}</p>
                    <Card.Text>{card.text}</Card.Text>

                    <Button variant="primary" className="mt-3">Prenota Ora</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default DetailsComponent