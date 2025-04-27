import { useNavigate } from 'react-router-dom';
import '../style/myListings.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const WishlistComponent = function () {
    const token = useSelector((state) => state.authLogin.token);
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dataLength, setDataLength] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const getFavoritesUser = async () => {
        try {
            const url = "https://localhost:7146/api/";
            const response = await fetch(url + "listing/favorites", {
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
                    throw new Error("Errore nella richiesta delle listings preferite dell'utente");
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

    useEffect(() => {
        getFavoritesUser();
    }, []);

    const handleClickDiv = (id) => {
        navigate(`/details/${id}`)
    }

    const deleteFavorite = async (id) => {
        try {
            const url = "https://localhost:7146/api/";
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
                navigate('/');
            } else {
                if (!response.ok) {
                    throw new Error("Errore nella delete");
                }
                const data = await response.json();
                console.log(data);
                getFavoritesUser();
                navigate('/wishlist');
            }
        } catch (err) {
            console.log(err);
        }
    }

    if (!isLoading && listings.length == 0) {
        return (
            <div className='container my-listings-div'>
                <div className='d-flex flex-row justify-content-between'>
                    <h3 className="mb-5">Your favorite Listings : </h3>
                </div>
                <h5>Non hai nessuna listings nei tuoi preferiti!</h5>
            </div>
        )
    }

    return (
        <div className='container my-listings-div'>
            <div className='d-flex flex-row justify-content-between'>
                <h3 className="mb-5">Your favorite Listings : </h3>
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
                                    <div key={listing.id} className={`listing-cards ${index == dataLength - 1 ? 'last-card' : ''}`}>
                                        <div className='transformation d-flex flex-row' onClick={(e) => {
                                            e.preventDefault();
                                            handleClickDiv(listing.id);
                                        }}>
                                            <div className='listing-imgs me-5'>
                                                <img src={listing.imgUrls[0]} height="100%" />
                                            </div>
                                            <div className="listing-info">
                                                <h2 className="hotel-name">{listing.hotelName} - {listing.description.city.name}</h2>
                                                <p><strong>Tipo esperienza : &nbsp; </strong> {listing.description.city.experienceType.name}</p>
                                                <p><strong>Descrizione : &nbsp; </strong> {listing.description.description}</p>
                                                <p><strong>Posti letto : &nbsp; </strong> {listing.description.beds}</p>
                                                <p><strong>Capacità : &nbsp; </strong> {listing.description.capacity} persone</p>
                                                <p><strong>Prezzo a notte : &nbsp; </strong> €{listing.description.pricePerNight}</p>
                                            </div>
                                            <div className="favorite-btn" onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                deleteFavorite(listing.id);
                                            }}>
                                                <i class="fa-solid fa-heart"></i>
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

export default WishlistComponent