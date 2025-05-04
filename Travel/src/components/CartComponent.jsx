import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../style/myListings.css'
import config from '../config';

const CartComponent = function () {
    const token = useSelector((state) => state.authLogin.token);
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dataLength, setDataLength] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    const getListingsFromCart = async () => {
        try {
            const url = config.serverUrl;
            const response = await fetch(url + "/api/listing/cart", {
                method: "GET",
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
                    throw new Error("Errore nella richiesta delle cart items");
                }
                const data = await response.json();
                console.log(data);
                setDataLength(data.length);
                setListings(data);
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteById = async (id) => {
        try {
            const url = config.serverUrl;
            const response = await fetch(url + "/api/listing/cart?id=" + id, {
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
                getListingsFromCart();
                navigate('/cart');
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getListingsFromCart();
    }, []);

    const handleClickDiv = (idListing) => {
        navigate(`/booking/${idListing}`)
    }

    if (!isLoading && listings.length == 0) {
        return (
            <div className='container my-listings-div'>
                <div className='d-flex flex-row justify-content-between'>
                    <h3 className="mb-5">Your cart items : </h3>
                </div>
                <h5>Non sono presenti strutture nel tuo carrello!</h5>
            </div>
        )
    }

    return (
        <div className='container my-listings-div'>
            <div className='d-flex flex-row justify-content-between'>
                <h3 className="mb-5">Your cart items : </h3>
            </div>
            <div className="listings-container m-0">
                {
                    isLoading ? (
                        <>
                            {
                                Array.from({ length: 6 }, (_, index) => (
                                    <div className="skeleton-listing mb-5" key={index}>
                                        {/* Image Placeholder */}
                                        <div className="skeleton-listing-img"></div>
                                        {/* Info Block */}
                                        <div className="skeleton-info">
                                            {/* Hotel Name Placeholder */}
                                            <div className="skeleton-title"></div>
                                            {/* Placeholder for Details */}
                                            <p className="skeleton-text"></p>
                                            <p className="skeleton-text"></p>
                                            <p className="skeleton-text"></p>
                                            <p className="skeleton-text"></p>
                                            <p className="skeleton-text"></p>
                                            {/* Action Buttons */}
                                            <div className="skeleton-btn"></div>
                                            <div className="skeleton-btn"></div>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    ) : (
                        <>
                            {
                                listings.map((listing, index) => (
                                    <div key={index} className={`listing-cards listing-cards-cart ${index == dataLength - 1 ? 'last-card' : ''}`}>
                                        <div className='transformation d-flex flex-column flex-lg-row' onClick={(e) => {
                                            e.preventDefault();
                                            handleClickDiv(listing.id);
                                        }}>
                                            <div className='listing-imgs me-5'>
                                                {
                                                    listing.listing.imgUrls[0] ? (
                                                        <img src={config.serverUrl + listing.listing.imgUrls[0]} height="100%" />
                                                    ) : (
                                                        <div style={{
                                                            width: "100%",
                                                            backgroundColor: "rgba(222, 222, 222, 0.55)",
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
                                            <div className="d-flex flex-column justify-content-between align-items-start">
                                                <div className="listing-info mt-4 mt-lg-0">
                                                    <h2 className="hotel-name">{listing.listing.hotelName} - {listing.listing.description.city.name}</h2>
                                                    <p><strong>Data di inizio : &nbsp; </strong> {listing.startDate}</p>
                                                    <p><strong>Data di fine : &nbsp; </strong> {listing.endDate}</p>
                                                    <p><strong>Ospiti : &nbsp; </strong> {listing.numberOfPeople}</p>
                                                    <hr />
                                                    <p><strong>Descrizione : &nbsp; </strong> {listing.listing.description.description}</p>
                                                </div>
                                                {
                                                    listing.user != null ? (
                                                        <p className="p-0 m-0 user-name"><strong>Host : &nbsp; </strong> {listing.user.firstName} {listing.user.lastName}</p>
                                                    ) : (
                                                        <p className="p-0 m-0 user-name"><strong>Host : &nbsp; </strong> Utente sconosciuto</p>
                                                    )
                                                }

                                            </div>
                                            <div className='price-div'>

                                                <strong className="fs-5"><span className="tot-span">Totale:</span> €{Math.ceil((new Date(listing.endDate) - new Date(listing.startDate)) / (1000 * 60 * 60 * 24)) * listing.listing.description.pricePerNight}</strong>
                                            </div>
                                            <div className="delete-action">
                                                <button className="btn delete-btn" onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    deleteById(listing.id);
                                                }}>
                                                    <i class="fa-solid fa-x"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default CartComponent