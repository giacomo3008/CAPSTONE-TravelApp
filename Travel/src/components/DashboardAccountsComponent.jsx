import { useNavigate } from 'react-router-dom';
import '../style/dashboard-acc.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const DashboardAccountsComponent = function () {
    const token = useSelector((state) => state.authLogin.token);
    const userLoggato = useSelector((state) => state.authLogin.user);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dataLength, setDataLength] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const getAllUsers = async () => {
        try {
            const url = "https://localhost:7146/api/";
            const response = await fetch(url + "account/all", {
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
                    throw new Error("Errore nella richiesta degli users!");
                }
                const data = await response.json();
                console.log(data);
                setDataLength(data.length);
                setUsers(data.filter(acc => acc.email !== userLoggato["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"])); //Rimuovo dalla lista l'Admin
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleClickDiv = (email) => {
        navigate(`/user/${email}`)
    }

    const deleteUser = async (email) => {
        if (window.confirm("Sei sicuro di voler eliminare questo account?")) {
            try {
                const url = "https://localhost:7146/api/";
                const response = await fetch(url + "account/" + email, {
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
                    alert('Account eliminato!');
                    getAllUsers();
                    navigate('/dashboard-acc');
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    if (!isLoading && users.length == 0) {
        return (
            <div className='container my-listings-div'>
                <div className='d-flex flex-row justify-content-between'>
                    <h3 className="mb-5">Dashboard Account : </h3>
                </div>
                <h5>Non sono presenti ulteriroi utenti in questo sito!</h5>
            </div>
        )
    }

    return (
        <div className='container my-accounts-div'>
            <div className='d-flex flex-row justify-content-between'>
                <h3 className="mb-5">Dashboard Account : </h3>
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
                                users.map((user, index) => (
                                    <div key={user.email} className={`accounts-cards ${index == dataLength - 1 ? 'last-card' : ''}`}>
                                        <div className='transformation d-flex flex-row justify-content-between align-items-center' onClick={(e) => {
                                            e.preventDefault();
                                            handleClickDiv(user.email);
                                        }}>
                                            <div className='d-flex flex-row justify-content-start'>
                                                <div className="profile-icon-account">
                                                    {user.firstName.charAt(0)}
                                                </div>
                                                <div className="listing-info d-flex flex-column justify-content-center ms-5">
                                                    <h2 className="hotel-name m-0">{user.firstName} {user.lastName}</h2>
                                                    <p><strong>Email : &nbsp; </strong> {user.email}</p>
                                                </div>
                                            </div>
                                            <div className="delete-action">
                                                <button className="btn delete-btn" onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    deleteUser(user.email);
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

export default DashboardAccountsComponent