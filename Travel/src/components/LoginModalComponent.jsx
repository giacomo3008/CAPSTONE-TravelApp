import { useEffect, useState } from 'react';
import '../style/login.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { useLocation } from 'react-router-dom';

const LoginModalComponent = () => {
    const isLoginModal = useSelector((state) => state.loginSignUp.login);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginError = useSelector((state) => state.error.login);
    const location = useLocation();

    useEffect(() => {
        dispatch({
            type: 'LOGIN_ERROR',
            payload: null,
        });
        if (isLoginModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup quando il componente viene smontato
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isLoginModal]);

    const handleClose = () => {
        dispatch({
            type: 'CLOSE',
            payload: true,
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login con:', email, password);
        let reload = false;
        if (location.pathname.startsWith("/results/") || location.pathname.startsWith("/city/")) {
            reload = true;
            dispatch(login(email, password, reload));
            return;
        }
        dispatch(login(email, password, reload));
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        dispatch({
            type: 'SIGNUP',
            payload: true,
        })
    }

    return (
        <>
            {
                isLoginModal && (
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
                            <form className="login-form" onSubmit={handleLogin}>
                                <h2>Log in</h2>
                                <div className="input-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => {
                                            dispatch({
                                                type: 'LOGIN_ERROR',
                                                payload: null,
                                            });
                                            setEmail(e.target.value)
                                        }}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => {
                                            dispatch({
                                                type: 'LOGIN_ERROR',
                                                payload: null,
                                            });
                                            setPassword(e.target.value)
                                        }}
                                        required
                                    />
                                </div>
                                {loginError && (
                                    <div className="error-message mb-3" style={{ color: 'red', marginTop: '10px' }}>
                                        {loginError}
                                    </div>
                                )}
                                <button type="submit">
                                    <span>Log in</span>
                                    <i className="fas fa-arrow-right"></i>
                                </button>
                                <p className="signup-link">
                                    Do not have an Account? <a onClick={handleSignUp} href=''>Sign Up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default LoginModalComponent;
