import { useNavigate } from 'react-router-dom';
import '../style/account.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    FiUser, FiMail, FiLogOut, FiTrash2, FiCalendar,
    FiShield, FiSettings, FiHelpCircle, FiEdit2, FiKey, FiActivity,
    FiHome
} from 'react-icons/fi';
import config from '../config';


const AccountComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.authLogin.token);
    const user = useSelector((state) => state.authLogin.user);
    let roles = null;
    if (user) {
        roles = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch({
            type: 'LOGOUT',
            payload: true,
        });
        localStorage.removeItem("token");
        navigate('/');
    };

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        if (window.confirm("Sei sicuro di voler eliminare il tuo account?")) {
            try {
                const url = config.serverUrl;
                const response = await fetch(url + "/api/account", {
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
                    dispatch({
                        type: 'LOGOUT',
                        payload: true
                    });
                    localStorage.removeItem('token');
                    alert('Il tuo account è stato eliminato!');
                    navigate('/');
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <>
            <div className="account-page">
                <div className="account-header position-relative">
                    <div className="profile-icon-account">
                        {user.firstName.charAt(0)}
                    </div>
                    <FiUser className="header-icon d-none d-lg-block" />
                    <h1>Benvenuto nel tuo Spazio Personale, {user.firstName}!</h1>
                    <p>Qui puoi gestire ogni aspetto del tuo account in totale sicurezza e autonomia.</p>
                </div>

                <section className="account-section info-section">
                    <h2><FiActivity className="section-icon" /> Informazioni Utente</h2>
                    <div className="info-grid">
                        <div className="info-card email">
                            <FiMail className="info-icon" />
                            <span>Email</span>
                            <p>{user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]}</p>
                        </div>
                        <div className="info-card">
                            <FiUser className="info-icon" />
                            <span>Nome</span>
                            <p>{user.firstName}</p>
                        </div>
                        <div className="info-card">
                            <FiUser className="info-icon" />
                            <span>Cognome</span>
                            <p>{user.lastName}</p>
                        </div>
                        <div className="info-card">
                            <FiKey className="info-icon" />
                            <span>Ruolo</span>
                            {
                                Array.isArray(roles) ? roles.map(role => {
                                    return <p key={role} className='m-0 p-0'>{role}</p>
                                }) : (<p>{roles}</p>)
                            }
                        </div>
                        <div className="info-card">
                            <FiCalendar className="info-icon" />
                            <span>Registrato il</span>
                            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </section>

                <div className=' container-fluid last-boxes'>
                    <div className='row'>
                        <div className='col-12 col-md-5 px-0'>
                            <section className="account-section actions-section d-flex flex-column align-items-center">
                                <h2><FiSettings className="section-icon" /> Azioni Rapide</h2>
                                <div className="actions-grid compact-actions d-flex flex-row gap-4">
                                    <div className="action-card logout m-0" onClick={handleLogout}>
                                        <FiLogOut className="action-icon m-0 p-0" />
                                        <span className='p-0 m-0'>Logout</span>
                                    </div>
                                    <div className="action-card delete m-0" onClick={handleDeleteAccount}>
                                        <FiTrash2 className="action-icon m-0 p-0" />
                                        <span className='p-0 m-0'>Elimina account</span>
                                    </div>
                                </div>

                            </section>
                        </div>
                        <div className='col-12 col-md-7 px-0 ps-md-4 mt-5 mb-5 mb-md-0 mt-md-0'>
                            <section className="account-section faq-section">
                                <h2><FiHelpCircle className="section-icon" /> Domande Frequenti</h2>
                                <div className="faq-list">
                                    <div className="faq-item">
                                        <strong><FiShield style={{ marginRight: '6px' }} />Perché non vedo alcune informazioni?</strong>
                                        <p>
                                            Per garantire la sicurezza e la riservatezza dei tuoi dati personali,
                                            alcune informazioni sensibili sono visibili solo a te o alle persone autorizzate.
                                            <br />
                                            <FiHelpCircle style={{ marginRight: '6px' }} />
                                            In questo modo tuteliamo la tua privacy e riduciamo il rischio di accessi non autorizzati.
                                        </p>
                                    </div>
                                    <div className="faq-item">
                                        <strong><FiEdit2 style={{ marginRight: '6px' }} />Come modificare l'email?</strong>
                                        <p>
                                            Puoi aggiornare il tuo indirizzo email accedendo alla sezione "Impostazioni" del profilo.
                                            <br />
                                            <FiKey style={{ marginRight: '6px' }} />
                                            Per motivi di sicurezza, ti verrà chiesto di confermare la tua identità tramite password o codice di verifica.
                                        </p>
                                    </div>
                                    <div className="faq-item">
                                        <strong><FiUser style={{ marginRight: '6px' }} />Chi può vedere le mie informazioni?</strong>
                                        <p>
                                            Le tue informazioni personali sono visibili solo a te e, se necessario,
                                            alle persone coinvolte in interazioni come prenotazioni o messaggi.
                                            <br />
                                            <FiShield style={{ marginRight: '6px' }} />
                                            Nessun dato viene reso pubblico senza il tuo consenso.
                                        </p>
                                    </div>
                                    <div className="faq-item">
                                        <strong><FiKey style={{ marginRight: '6px' }} />Come proteggo meglio il mio account?</strong>
                                        <p>
                                            Utilizza una password complessa che includa lettere, numeri e simboli.
                                            <br />
                                            <FiActivity style={{ marginRight: '6px' }} />
                                            Attiva l’autenticazione a due fattori (2FA) per una protezione aggiuntiva.
                                            <br />
                                            <FiSettings style={{ marginRight: '6px' }} />
                                            Tieni sempre aggiornate le tue impostazioni di sicurezza e controlla regolarmente l’attività del tuo account.
                                        </p>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountComponent;
