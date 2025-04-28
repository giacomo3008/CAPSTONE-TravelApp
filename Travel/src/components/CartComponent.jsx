import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartComponent = function () {
    const token = useSelector((state) => state.authLogin.token);
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dataLength, setDataLength] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const getListingsFromCart = async () => {
        try {
            const url = "https://localhost:7146/api/";
            const response = await fetch(url + "listing/cart", {
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
            const url = "https://localhost:7146/api/";
            const response = await fetch(url + "listing/cart?id=" + id, {
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

    const handleClickDiv = (indexItem, idListing) => {
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
                                    <div key={index} className={`listing-cards ${index == dataLength - 1 ? 'last-card' : ''}`}>
                                        <div className='transformation d-flex flex-row' onClick={(e) => {
                                            e.preventDefault();
                                            handleClickDiv(index, listing.listing.id);
                                        }}>
                                            <div className='listing-imgs me-5'>
                                                <img src={listing.listing.imgUrls[0]} height="100%" />
                                            </div>
                                            <div className="listing-info">
                                                <h2 className="hotel-name">{listing.listing.hotelName} - {listing.listing.description.city.name}</h2>
                                                <p><strong>Data di inizio : &nbsp; </strong> {listing.startDate}</p>
                                                <p><strong>Data di fine : &nbsp; </strong> {listing.endDate}</p>
                                                <p><strong>Ospiti : &nbsp; </strong> {listing.numberOfPeople}</p>
                                                <p><strong>Descrizione : &nbsp; </strong> {listing.listing.description.description}</p>
                                                <p><strong>Host : &nbsp; </strong> DA METTERE</p>
                                                <p><strong>Prezzo a notte : &nbsp; </strong> €{listing.listing.description.pricePerNight}</p>
                                            </div>
                                            <div className='listing-action'>
                                                <button className="btn delete-btn" onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    deleteById(listing.id);
                                                }}>
                                                    <i className="bi bi-trash-fill"></i> Elimina
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