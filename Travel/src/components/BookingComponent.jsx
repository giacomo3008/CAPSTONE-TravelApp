import { useNavigate, useParams } from 'react-router-dom';
import '../style/booking.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SummaryBoxComponent from './SummaryBoxComponent';
import config from '../config';


const BookingComponent = function () {
    const { idListing } = useParams();
    const [structure, setStructure] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [totPrice, setTotPrice] = useState(null);
    const token = useSelector((state) => state.authLogin.token);
    const user = useSelector((state) => state.authLogin.user);
    const [paymentType, setPaymentType] = useState("card");
    const [insurance, setInsurance] = useState(false);
    const modalSummaryBox = useSelector((state) => state.summaryBox.summaryBox);

    const getListingInfo = async () => {
        try {
            const URL = config.serverUrl;
            const response = await fetch(URL + "/api/listing/cart/" + idListing, {
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

    const handleThankyou = async (e) => {
        e.preventDefault();
        const payload = {
            HotelName: structure.listing.hotelName,
            ImgUrl: structure.listing.imgUrls.length > 0 ? structure.listing.imgUrls[0] : null,
            RecipientEmail: user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
            Description: structure.listing.description.description,
            Beds: structure.listing.description.beds,
            NumberOfPeople: structure.numberOfPeople,
            StartDate: structure.startDate,
            EndDate: structure.endDate,
            TotPrice: totPrice,
            City: structure.listing.description.city.name,
            PropertyType: structure.listing.description.propertyType.name,
            Country: structure.listing.description.city.country.name,
            ExperienceType: structure.listing.description.city.experienceType.name,
            HostName: structure.listing.user ? `${structure.listing.user.firstName} ${structure.listing.user.lastName}` : null,
        };
        console.log("BOOKING INFORMATION:  ", payload);

        dispatch({
            type: 'BOOKING_INFO',
            payload: payload,
        });
        navigate('/thankyou');
    }

    useEffect(() => {
        getListingInfo();
    }, []);

    useEffect(() => {
        getListingInfo();
    }, [modalSummaryBox]);

    const handleHost = (e) => {
        e.preventDefault();
        navigate(`/userInfo/${structure.user.email}`);
    }

    const handleDetails = (e) => {
        e.preventDefault();
        navigate(`/details/${structure.listing.id}`);
    }

    const handleInsurance = (e) => {
        e.preventDefault();
        setInsurance(true);
    }

    const deleteInsurance = (e) => {
        e.preventDefault();
        setInsurance(false);
    }

    const handleModify = (e) => {
        e.preventDefault();
        dispatch({
            type: 'SUMMARYBOX_OPEN',
            payload: true,
        });
    }

    return (
        <>
            {
                structure && totPrice ? (
                    <>
                        <div className='container booking-container-principal' >
                            <div className="booking-container row">
                                <div className='col-12 col-md-7 pe-0 ps-0 pe-md-4'>
                                    <div className="main-content pe-0 pe-md-5">
                                        <h1>Invia una richiesta di prenotazione</h1>
                                        <form onSubmit={handleThankyou}>
                                            <div className="left-panel mt-5">
                                                <section className="trip-info">
                                                    <h2 className='mb-3'>Il tuo viaggio</h2>
                                                    <div className="info-row">
                                                        <p className="label m-0">Date</p>
                                                        <p className="value d-flex flex-row justify-content-between pe-5">{formatDateRange(structure.startDate, structure.endDate)} <a onClick={handleModify}>Modifica</a></p>
                                                    </div>
                                                    <div className="info-row">
                                                        <p className="label m-0">Ospiti</p>
                                                        <p className="value d-flex flex-row justify-content-between pe-5">{structure.numberOfPeople} <a onClick={handleModify}>Modifica</a></p>
                                                    </div>
                                                </section>
                                                <hr className='my-5' />

                                                <section className="insurance">
                                                    <h3>Vuoi aggiungere un'assicurazione di viaggio?</h3>
                                                    <p className='d-flex flex-row justify-content-between align-items-center'><strong>Sì, aggiungi per {parseFloat(totPrice * 0.08).toLocaleString('it-IT', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    })}€</strong>
                                                        {
                                                            !insurance ? (
                                                                <button className='aggiungi-btn' type='button' onClick={handleInsurance}>Aggiungi</button>
                                                            ) : (
                                                                <span className='aggiungi-link' onClick={deleteInsurance}>Rimuovi</span>
                                                            )
                                                        }
                                                    </p>
                                                    <p className="small-text">
                                                        Disponibile solo al momento della prenotazione.
                                                        <br />
                                                        Ottieni un rimborso fino al 100% del costo del tuo soggiorno se effettui una cancellazione per motivi coperti.
                                                        <br />
                                                        <a href="#">Cosa copre</a>
                                                    </p>
                                                </section>

                                                <hr className='my-5' />

                                                <section className="payment">
                                                    <h3 className='mb-5 mb-lg-3 d-flex flex-column justify-content-center align-items-start flex-lg-row justify-content-lg-between align-items-lg-center'>Paga con <span className="h-100"><img src='/src/assets/img/metodi-pagamento.png' height="55%" /></span></h3>

                                                    <select onChange={(e) => setPaymentType(e.target.value)}>
                                                        <option value="card">Carta di credito o debito</option>
                                                        <option value="sepa">Bonifico SEPA</option>
                                                        <option value="on-site">Paga in struttura</option>
                                                    </select>
                                                </section>
                                                {
                                                    paymentType == "sepa" && (
                                                        <p className='mt-3 mb-5'>Ti verranno inviate le coordinate bancarie via Email!</p>
                                                    )
                                                }
                                                {
                                                    paymentType == "card" && (
                                                        <>
                                                            <div className="box-form container-fluid mt-5">
                                                                <div className="row">
                                                                    <div className="col-12 form-floating p-0 m-0">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control first-input mb-2"
                                                                            id="cardNumber"
                                                                            placeholder="Numero Carta"
                                                                            maxLength={19}
                                                                            required
                                                                        />
                                                                        <label htmlFor="cardNumber">Numero Carta</label>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-6 form-floating p-0 m-0">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="expiryDate"
                                                                            placeholder="MM/AA"
                                                                            maxLength={5}
                                                                            required
                                                                        />
                                                                        <label htmlFor="expiryDate">Scadenza (MM/AA)</label>
                                                                    </div>
                                                                    <div className="col-6 form-floating p-0 m-0 ps-2">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="cvv"
                                                                            placeholder="CVV"
                                                                            maxLength={4}
                                                                            required
                                                                        />
                                                                        <label htmlFor="cvv">CVV</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <h6 className="mt-4 mb-2">Indirizzo di fatturazione</h6>

                                                            <div className="box-form container-fluid mb-5">
                                                                <div className="row mb-2">
                                                                    <div className="col-12 form-floating p-0 m-0">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control first-input"
                                                                            id="billingAddress"
                                                                            placeholder="Indirizzo"
                                                                            required
                                                                        />
                                                                        <label htmlFor="billingAddress">Indirizzo</label>
                                                                    </div>
                                                                </div>

                                                                <div className="row mb-2">
                                                                    <div className="col-12 form-floating p-0 m-0">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="postalCode"
                                                                            placeholder="Codice postale"
                                                                            required
                                                                        />
                                                                        <label htmlFor="postalCode">Codice postale</label>
                                                                    </div>
                                                                </div>

                                                                <div className="row pb-2">
                                                                    <div className="col-12 form-floating p-0 m-0">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="city"
                                                                            placeholder="Città"
                                                                            required
                                                                        />
                                                                        <label htmlFor="city">Città</label>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-6 form-floating p-0 m-0">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="province"
                                                                            placeholder="Provincia"
                                                                            required
                                                                        />
                                                                        <label htmlFor="province">Provincia</label>
                                                                    </div>
                                                                    <div className="col-6 form-floating p-0 m-0 ps-2">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="zip"
                                                                            placeholder="CAP"
                                                                            required
                                                                        />
                                                                        <label htmlFor="zip">CAP</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                                <section className="section-block mt-5">
                                                    <h2>Termini di cancellazione</h2>
                                                    <p><strong>Cancellazione gratuita entro il giorno {formatCancellationDate(structure.startDate)}.</strong> Dopo tale data, la prenotazione non è rimborsabile. <a>Scopri di più</a></p>
                                                </section>
                                                <hr className='mt-5' />
                                                <div className="d-flex flex-row align-items-center">
                                                    <img
                                                        src="/src/assets/img/profile-placeholder.png"
                                                        alt="User"
                                                        className="profile-icon me-3"
                                                    />
                                                    {
                                                        structure.listing.user != null ? (
                                                            <h5 className="m-0 host-name"><strong>Nome dell'host :</strong> &nbsp; <span className='host-name-span' onClick={handleHost}>{structure.listing.user.firstName} {structure.listing.user.lastName}</span></h5>
                                                        ) : (
                                                            <h5 className="m-0 host-name"><strong>Nome dell'host :</strong> &nbsp; <span className='host-name-span'>Utente Sconosciuto</span></h5>
                                                        )
                                                    }
                                                </div>
                                                <hr className='mb-5' />
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
                                                <hr className='my-5 d-block d-md-none' />

                                                <div className="right-panel-inner d-block d-md-none" >
                                                    <div onClick={handleDetails} className="listing-card d-flex flex-row align-items-center">
                                                        <div className='img-booking-div'>
                                                            {
                                                                structure.listing.imgUrls[0] ? (
                                                                    <img src={config.serverUrl + structure.listing.imgUrls[0]} height="100%" />
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
                                                            <span>{parseFloat(totPrice).toLocaleString('it-IT', {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2
                                                            })} €</span>
                                                        </div>
                                                        <div className="price-row">
                                                            <span>Costi di pulizia</span>
                                                            <span>100,00 €</span>
                                                        </div>
                                                        {
                                                            insurance && (
                                                                <div className="price-row">
                                                                    <span>Costi assicurazione Travel</span>
                                                                    <span>{parseFloat(totPrice * 0.08).toLocaleString('it-IT', {
                                                                        minimumFractionDigits: 2,
                                                                        maximumFractionDigits: 2
                                                                    })} €</span>
                                                                </div>
                                                            )
                                                        }
                                                        <div className="price-row">
                                                            <span>Costi del servizio Travel</span>
                                                            <span>{parseFloat(totPrice * 0.10).toLocaleString('it-IT', {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2
                                                            })} €</span>
                                                        </div>
                                                        <div className="price-row discount">
                                                            <span>Risparmi sui costi del servizio Travel</span>
                                                            <span>-{parseFloat(totPrice * 0.02).toLocaleString('it-IT', {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2
                                                            })} €</span>
                                                        </div>

                                                        <hr className='my-4' />
                                                        <div className="price-row total">
                                                            <strong>Totale (EUR)</strong>
                                                            {
                                                                insurance ? (
                                                                    <strong>{parseFloat(totPrice + 100 + totPrice * 0.10 + totPrice * 0.08 - totPrice * 0.02).toLocaleString('it-IT', {
                                                                        minimumFractionDigits: 2,
                                                                        maximumFractionDigits: 2
                                                                    })} €</strong>
                                                                ) : (
                                                                    <strong>{parseFloat(totPrice + 100 + totPrice * 0.10 - totPrice * 0.02).toLocaleString('it-IT', {
                                                                        minimumFractionDigits: 2,
                                                                        maximumFractionDigits: 2
                                                                    })} €</strong>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
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
                                                    <button type="submit">Invia una richiesta di prenotazione</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className='d-none d-md-block col-md-5 pt-8'>
                                    <div className="right-panel mb-lg-auto" >
                                        <div onClick={handleDetails} className="listing-card d-flex flex-row align-items-center">
                                            <div className='img-booking-div'>
                                                {
                                                    structure.listing.imgUrls[0] ? (
                                                        <img src={config.serverUrl + structure.listing.imgUrls[0]} height="100%" />
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
                                                <span>{parseFloat(totPrice).toLocaleString('it-IT', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })} €</span>
                                            </div>
                                            <div className="price-row">
                                                <span>Costi di pulizia</span>
                                                <span>100,00 €</span>
                                            </div>
                                            {
                                                insurance && (
                                                    <div className="price-row">
                                                        <span>Costi assicurazione Travel</span>
                                                        <span>{parseFloat(totPrice * 0.08).toLocaleString('it-IT', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        })} €</span>
                                                    </div>
                                                )
                                            }
                                            <div className="price-row">
                                                <span>Costi del servizio Travel</span>
                                                <span>{parseFloat(totPrice * 0.10).toLocaleString('it-IT', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })} €</span>
                                            </div>
                                            <div className="price-row discount">
                                                <span>Risparmi sui costi del servizio Travel</span>
                                                <span>-{parseFloat(totPrice * 0.02).toLocaleString('it-IT', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })} €</span>
                                            </div>

                                            <hr className='my-4' />
                                            <div className="price-row total">
                                                <strong>Totale (EUR)</strong>
                                                {
                                                    insurance ? (
                                                        <strong>{parseFloat(totPrice + 100 + totPrice * 0.10 + totPrice * 0.08 - totPrice * 0.02).toLocaleString('it-IT', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        })} €</strong>
                                                    ) : (
                                                        <strong>{parseFloat(totPrice + 100 + totPrice * 0.10 - totPrice * 0.02).toLocaleString('it-IT', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        })} €</strong>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                        <SummaryBoxComponent idCartItem={structure.id} maxGuests={structure.listing.description.capacity} _startDate={structure.startDate} _endDate={structure.endDate} _guests={structure.numberOfPeople} />
                    </>
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