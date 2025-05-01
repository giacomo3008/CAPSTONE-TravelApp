import { FaCheckCircle, FaEnvelope, FaCalendarCheck, FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import '../style/thankyou.css'
import { useSelector } from 'react-redux';


const ThanknyouComponent = function () {
    const user = useSelector((state) => state.authLogin.user);
    return (
        <div className="thank-you-page">
            <div className="content">
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
            </div>
        </div>
    );
};

export default ThanknyouComponent;
