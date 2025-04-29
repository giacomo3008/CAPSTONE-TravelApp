import { useNavigate, useParams } from 'react-router-dom';
import '../style/booking.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const BookingComponent = function () {
    const { idListing } = useParams();
    const [structure, setStructure] = useState(null);
    const navigate = useNavigate();
    const [totPrice, setTotPrice] = useState(null);
    const token = useSelector((state) => state.authLogin.token);

    const getListingInfo = async () => {
        try {
            const URL = "https://localhost:7146/api/"
            const response = await fetch(URL + "listing/cart/" + idListing, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Errore nel recuperare la cart item");
            }
            const data = await response.json();
            console.log(data);
            const start = new Date(data.startDate);
            const end = new Date(data.endDate);
            const diffInMs = end - start; // differenza in millisecondi
            const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
            setTotPrice(diffInDays * data.listing.description.pricePerNight);
            setStructure(data);
        }
        catch (error) {
            console.error(error);
        }
    }


    const formatDateRange = (startDate, endDate) => {
        const options = { day: '2-digit', month: 'short' };
        const formatter = new Intl.DateTimeFormat('it-IT', options);

        const start = new Date(startDate);
        const end = new Date(endDate);

        const startStr = formatter.format(start).replace('.', ''); // "08 lug"
        const endStr = formatter.format(end).replace('.', '');

        return `${startStr} – ${endStr}`;
    }

    const formatCancellationDate = (date) => {
        const options = { day: '2-digit', month: 'short' };
        const formatter = new Intl.DateTimeFormat('it-IT', options);

        const data = new Date(date) - (24 * 60 * 60 * 1000);
        const dataStr = formatter.format(data).replace('.', '');

        return dataStr;
    }



    useEffect(() => {
        getListingInfo();
    }, []);

    const handleDetails = (e) => {
        e.preventDefault();
        navigate(`/details/${structure.listing.id}`);
    }

    return (
        <>
            {
                structure && totPrice ? (
                    <div className='container' >
                        <div className="booking-container row">
                            <div className='col-7 pe-4'>
                                <div className="main-content pe-5">
                                    <h1>Invia una richiesta di prenotazione</h1>
                                    <div className="left-panel mt-5">
                                        <section className="trip-info">
                                            <h2 className='mb-3'>Il tuo viaggio</h2>
                                            <div className="info-row">
                                                <p className="label m-0">Date</p>
                                                <p className="value d-flex flex-row justify-content-between pe-5">{formatDateRange(structure.startDate, structure.endDate)} <a>Modifica</a></p>
                                            </div>
                                            <div className="info-row">
                                                <p className="label m-0">Ospiti</p>
                                                <p className="value d-flex flex-row justify-content-between pe-5">{structure.numberOfPeople} <a>Modifica</a></p>
                                            </div>
                                        </section>
                                        <hr className='my-5' />

                                        <section className="insurance">
                                            <h3>Vuoi aggiungere un'assicurazione di viaggio?</h3>
                                            <p><strong>Sì, aggiungi per 50€</strong></p>
                                            <p className="small-text">
                                                Disponibile solo al momento della prenotazione.
                                                <br />
                                                Ottieni un rimborso fino al 100% del costo del tuo soggiorno se effettui una cancellazione per motivi coperti.
                                                <br />
                                                <a href="#">Cosa copre</a>
                                            </p>
                                        </section>

                                        <hr className='my-5' />

                                        <section className="payment mb-5">
                                            <h3 className='mb-3'>Paga con</h3>
                                            <div className="cards mb-2">💳 VISA • MasterCard • Amex • PayPal • Google Pay</div>
                                            <select>
                                                <option>Carta di credito o debito</option>
                                                <option>Bonifico SEPA</option>
                                                <option>PayPal</option>
                                                <option>Revolut</option>
                                            </select>
                                        </section>

                                        <section className="section-block">
                                            <h2>Termini di cancellazione</h2>
                                            <p><strong>Cancellazione gratuita entro il giorno {formatCancellationDate(structure.startDate)}.</strong> Dopo tale data, la prenotazione non è rimborsabile. <a>Scopri di più</a></p>
                                        </section>
                                        <hr className='my-5' />

                                        <section className="section-block mb-5">
                                            <h2>Regole di base</h2>
                                            <p>Chiediamo a tutti gli ospiti di rispettare alcune linee guida per soddisfare le aspettative dell'host.</p>
                                            <ul className="rules-list">
                                                <li>Segui le regole della casa</li>
                                                <li>Tratta la casa del tuo host come se fosse tua</li>
                                            </ul>
                                        </section>

                                        <section className="section-block confirmation-box">
                                            <p><span className="icon">📩</span> La tua prenotazione verrà confermata solo una volta che l'host avrà accettato la tua richiesta (entro 24 ore). Fino ad allora, non ti addebiteremo nulla.</p>
                                        </section>
                                        <hr className='my-5' />

                                        <section className="section-block legal-box">
                                            <p className="small-text">
                                                Selezionando il pulsante qui sotto, accetto i termini stabiliti
                                                (<a href="#">Le regole dell'alloggio dell'host</a>, <a href="#">Regole di base per gli ospiti</a>,
                                                <a href="#">Termini di Rimborso</a>) e autorizzo Airbnb ad addebitare un importo sul mio metodo di pagamento nel caso in cui arrechassi danni all’alloggio.
                                                Mi impegno a corrispondere l’importo totale mostrato nel momento in cui l’host accetta la mia richiesta.
                                            </p>
                                            <p className="small-text">
                                                Accetto inoltre i <a href="#">Termini del servizio aggiornati</a>,
                                                i <a href="#">Termini del servizio per i pagamenti</a>,
                                                e prendo conoscenza dell’<a href="#">Informativa sulla privacy</a>.
                                            </p>
                                        </section>

                                        <div className="submit-button mt-5" id='book-btn'>
                                            <button>Invia una richiesta di prenotazione</button>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className='col-5 pt-8'>
                                <div className="right-panel mb-auto" >
                                    <div onClick={handleDetails} className="listing-card d-flex flex-row align-items-center">
                                        <div className='img-booking-div'>
                                            {
                                                structure.listing.imgUrls[0] ? (
                                                    <img src={structure.listing.imgUrls[0]} height="100%" />
                                                ) : (

                                                    <div style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        backgroundColor: "rgba(222, 222, 222, 0.55)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}>
                                                        <div className="h-100 w-100 bg-transparent icon-div d-flex flex-row justify-content-center align-items-center">
                                                            <i className="fa-regular fa-building"></i>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className='ms-3'>
                                            <h3 className='m-0 p-0 pb-1'>{structure.listing.hotelName}</h3>
                                            <p className="small-text m-0 p-0">{structure.listing.description.propertyType.name}</p>
                                        </div>
                                    </div>

                                    <hr className='my-4' />

                                    <div className="price-details">
                                        <h3 className='mb-4'>Dettagli del prezzo</h3>
                                        <div className="price-row">
                                            <span>Alloggio</span>
                                            <span>{totPrice} €</span>
                                        </div>
                                        <div className="price-row">
                                            <span>Costi di pulizia</span>
                                            <span>100,00 €</span>
                                        </div>
                                        <div className="price-row">
                                            <span>Costi del servizio Travel</span>
                                            <span>{totPrice * 0.10} €</span>
                                        </div>
                                        <div className="price-row discount">
                                            <span>Risparmi sui costi del servizio Travel</span>
                                            <span>-{totPrice * 0.02} €</span>
                                        </div>

                                        <hr className='my-4' />
                                        <div className="price-row total">
                                            <strong>Totale (EUR)</strong>
                                            <strong>{totPrice + 100 + totPrice * 0.10 - totPrice * 0.02} €</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                ) : (
                    <div className="booking-container">
                        <div className="skeleton-form">

                            {/* Titolo */}
                            <div className="skeleton-input-group wide">
                                <div className="skeleton-label pulse"></div>
                                <div className="skeleton-input pulse"></div>
                            </div>

                            {/* Il tuo viaggio */}
                            <div className="skeleton-row">
                                <div className="skeleton-input-group half">
                                    <div className="skeleton-label pulse"></div>
                                    <div className="skeleton-input pulse"></div>
                                </div>
                                <div className="skeleton-input-group half">
                                    <div className="skeleton-label pulse"></div>
                                    <div className="skeleton-input pulse"></div>
                                </div>
                            </div>

                            {/* Assicurazione */}
                            <div className="skeleton-input-group wide">
                                <div className="skeleton-label pulse"></div>
                                <div className="skeleton-textarea pulse"></div>
                            </div>

                            {/* Metodo di pagamento */}
                            <div className="skeleton-input-group wide">
                                <div className="skeleton-label pulse"></div>
                                <div className="skeleton-input pulse"></div>
                            </div>

                            {/* Termini di cancellazione */}
                            <div className="skeleton-input-group wide">
                                <div className="skeleton-label pulse"></div>
                                <div className="skeleton-textarea pulse"></div>
                            </div>

                            {/* Regole di base */}
                            <div className="skeleton-input-group wide">
                                <div className="skeleton-label pulse"></div>
                                <div className="skeleton-textarea pulse"></div>
                            </div>

                            {/* Conferma host */}
                            <div className="skeleton-input-group wide">
                                <div className="skeleton-textarea pulse"></div>
                            </div>

                            {/* Box legale */}
                            <div className="skeleton-input-group wide">
                                <div className="skeleton-textarea pulse"></div>
                            </div>

                            {/* Bottone invio */}
                            <div className="skeleton-submit-btn pulse"></div>
                        </div>

                        {/* Colonna destra – Riepilogo */}
                        <div className="skeleton-form" style={{ marginTop: "50px" }}>
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="skeleton-input-group">
                                    <div className="skeleton-label pulse"></div>
                                    <div className="skeleton-input pulse"></div>
                                </div>
                            ))}
                            <hr />
                            <div className="skeleton-input-group">
                                <div className="skeleton-label pulse"></div>
                                <div className="skeleton-input pulse"></div>
                            </div>
                        </div>
                    </div>

                )
            }
        </>
    )
}

export default BookingComponent