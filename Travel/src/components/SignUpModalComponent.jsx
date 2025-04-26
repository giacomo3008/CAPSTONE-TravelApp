import { useEffect, useState } from 'react';
import '../style/signup.css';
import { useDispatch, useSelector } from 'react-redux';

const SignUpModalComponent = () => {
    const isSignUpModal = useSelector((state) => state.loginSignUp.signup);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const error = useSelector((state) => state.error.signup);
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        if (isSignUpModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup quando il componente viene smontato
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isSignUpModal]);

    const handleClose = () => {
        dispatch({
            type: 'CLOSE',
            payload: true,
        })
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }
        console.log('Registrazione con:', firstName, lastName, email, password);

        try {
            const URL = "https://localhost:7146/api/"
            const response = await fetch(URL + "account/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });
            if (!response.ok) {
                throw new Error("Errore nel SignUp");
            }
            const data = await response.json();
            console.log(data.message);
        }
        catch (error) {
            dispatch({
                type: 'SIGNUP_ERROR',
                payload: "Account già esistente, riprova",
            })
            console.error(error);
            return;
        }
        alert('SignUp avvenuto con successo!');
        handleClose();
    };

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch({
            type: 'LOGIN',
            payload: true,
        })
    }


    return (
        <>
            {
                isSignUpModal && (
                    <div className="modal-overlay" onClick={(e) => {
                        e.preventDefault();
                        handleClose();
                    }}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="close-button" onClick={(e) => {
                                e.preventDefault();
                                handleClose();
                            }}>
                                <i className="fas fa-times"></i>
                            </button>
                            <form className="signup-form" onSubmit={handleSignUp}>
                                <h2>Sign Up</h2>
                                <div className="input-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        placeholder="Enter your name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        placeholder="Enter your last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && (
                                    <div className="error-message mb-3" style={{ color: 'red', marginTop: '10px' }}>
                                        {error}
                                    </div>
                                )}
                                {passwordError && (
                                    <div className="error-message mb-3" style={{ color: 'red', marginTop: '10px' }}>
                                        Le password non coincidono!
                                    </div>
                                )}
                                <button type="submit">
                                    <span>Sign Up</span>
                                    <i className="fas fa-user-plus"></i>
                                </button>
                                <p className="signup-link">
                                    Already have an account? <a onClick={handleLogin} href=''>Log in</a>
                                </p>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default SignUpModalComponent;
