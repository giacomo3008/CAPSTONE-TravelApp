import { FaCheckCircle, FaEnvelope, FaCalendarCheck, FaHome, FaMapMarkerAlt, FaTimesCircle, FaCalendarTimes } from 'react-icons/fa';
import '../style/thankyou.css'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import config from '../config';


const ThanknyouComponent = function () {
    const user = useSelector((state) => state.authLogin.user);
    const token = useSelector((state) => state.authLogin.token);
    const bookingInfo = useSelector((state) => state.bookingInfo.bookingInfo);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const sendBookingInfo = async () => {
        try {
            const URL = config.serverUrl + "/api/"
            const response = await fetch(URL + "listing/email", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookingInfo),
            });

            if (!response.ok) {
                throw new Error("Errore nell'invio della mail");
            }
            setIsLoading(false);
        }
        catch (error) {
            setError(true);
            console.error(error);
        }
    }

    useEffect(() => {
        sendBookingInfo();
    }, []);


    return (
        <div className="thank-you-page">
            <div className="content">
                {
                    isLoading ? (
                        <>
                            <span class="loader"></span>
                            <h1>Sending Email...</h1>
                            <p className="email-confirm">Sending confirmation to <strong>{user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]}</strong></p>
                        </>
                    ) : (
                        <>
                            {
                                error ? (
                                    <>
                                        <FaTimesCircle className="icon error" />
                                        <h1>Oops!</h1>
                                        <p className="lead">There was a problem with your reservation confirmation.</p>
                                        <FaEnvelope className="icon small" />
                                        <p className="email-confirm">We couldn't send a confirmation email to <strong>{user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]}</strong>.</p>

                                        <div className="icons-row">
                                            <FaCalendarTimes className="icon detail" />
                                            <FaMapMarkerAlt className="icon detail" />
                                            <FaHome className="icon detail" />
                                        </div>

                                        <a href="/" className="back-home">← Back to homepage</a>
                                    </>
                                ) : (
                                    <>
                                        <FaCheckCircle className="icon success" />
                                        <h1>Thank You!</h1>
                                        <p className="lead">Your reservation was successful.</p>
                                        <FaEnvelope className="icon small" />
                                        <p className="email-confirm">A confirmation email has been sent to <strong>{user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]}</strong>.</p>

                                        <div className="icons-row">
                                            <FaCalendarCheck className="icon detail" />
                                            <FaMapMarkerAlt className="icon detail" />
                                            <FaHome className="icon detail" />
                                        </div>

                                        <a href="/" className="back-home">← Back to homepage</a>
                                    </>
                                )
                            }
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default ThanknyouComponent;
