import { useNavigate, useParams } from 'react-router-dom';
import '../style/myListings.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import config from '../config';

const UserListingsComponent = function () {
    const token = useSelector((state) => state.authLogin.token);
    const userLoggato = useSelector((state) => state.authLogin.user);
    const user = useParams();
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dataLength, setDataLength] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const getListingsUser = async () => {
        try {
            const url = config.serverUrl + "/api/";
            const response = await fetch(url + "listing/user/" + user.email);

            if (!response.ok) {
                throw new Error("Errore nella richiesta delle listings dell'utente");
            }
            const data = await response.json();
            console.log(data);
            setDataLength(data.length);
            setListings(data);
            setIsLoading(false);

        } catch (err) {
            console.log(err);
        }
    }

    const deleteById = async (id) => {
        try {
            const url = config.serverUrl + "/api/";
            const response = await fetch(url + "listing/user/" + id, {
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
                getListingsUser();
                navigate(`/user/listings/${user.email}/${user.name}`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getListingsUser();
    }, []);

    const handleClickDiv = (id) => {
        navigate(`/details/${id}`)
    }

    const onEdit = (id) => {
        navigate(`/edit/${id}`);
    }

    if (!isLoading && listings.length == 0) {
        return (
            <div className='container my-listings-div'>
                <div className='d-flex flex-row justify-content-start'>
                    <h3 className="mb-5">{user.name}'s listings : </h3>
                </div>
                <h5>Non sono presenti listings appartenenti a questo Account!</h5>
            </div>
        )
    }

    return (
        <div className='container my-listings-div'>
            <div className='d-flex flex-row justify-content-start'>
                <h3 className="mb-5">{user.name}'s listings : </h3>
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
                                        <div className='transformation d-flex flex-column flex-lg-row' onClick={(e) => {
                                            e.preventDefault();
                                            handleClickDiv(listing.id);
                                        }}>
                                            <div className='listing-imgs m-0 me-lg-5'>
                                                {
                                                    listing.imgUrls[0] ? (
                                                        <img src={config.serverUrl + listing.imgUrls[0]} height="100%" />
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
                                            <div className="listing-info mt-4 mt-md-0">
                                                <h2 className="hotel-name">{listing.hotelName} - {listing.description.city.name}</h2>
                                                <p><strong>Tipo esperienza : &nbsp; </strong> {listing.description.city.experienceType.name}</p>
                                                <p><strong>Descrizione : &nbsp; </strong> {listing.description.description}</p>
                                                <p><strong>Posti letto : &nbsp; </strong> {listing.description.beds}</p>
                                                <p><strong>Capacità : &nbsp; </strong> {listing.description.capacity} persone</p>
                                                <p><strong>Prezzo a notte : &nbsp; </strong> €{listing.description.pricePerNight}</p>
                                            </div>
                                            {
                                                Array.isArray(userLoggato["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]) ? (
                                                    <>
                                                        {
                                                            userLoggato["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes("Admin") && (
                                                                <div className='listing-action'>
                                                                    <button className="btn edit-btn" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                        onEdit(listing.id);
                                                                    }}>
                                                                        <i className="bi bi-pencil-fill"></i> Modifica
                                                                    </button>
                                                                    <button className="btn delete-btn" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                        deleteById(listing.id);
                                                                    }}>
                                                                        <i className="bi bi-trash-fill"></i> Elimina
                                                                    </button>
                                                                </div>
                                                            )
                                                        }
                                                    </>
                                                ) : (
                                                    <>
                                                        {
                                                            userLoggato["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "Admin" && (
                                                                <div className='listing-action'>
                                                                    <button className="btn edit-btn" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                        onEdit(listing.id);
                                                                    }}>
                                                                        <i className="bi bi-pencil-fill"></i> Modifica
                                                                    </button>
                                                                    <button className="btn delete-btn" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                        deleteById(listing.id);
                                                                    }}>
                                                                        <i className="bi bi-trash-fill"></i> Elimina
                                                                    </button>
                                                                </div>
                                                            )
                                                        }
                                                    </>
                                                )
                                            }
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

export default UserListingsComponent