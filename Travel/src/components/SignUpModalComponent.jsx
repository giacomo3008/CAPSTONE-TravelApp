import { useEffect, useState } from 'react';
import '../style/signup.css';
import { useDispatch, useSelector } from 'react-redux';

const SignUpModalComponent = () => {
    const isSignUpModal = useSelector((state) => state.loginSignUp.signup);
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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

    const handleSignUp = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Le password non coincidono!");
            return;
        }

        console.log('Registrazione con:', fullName, email, password);
        // Aggiungi chiamata API qui
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
                                    <label htmlFor="fullName">Full Name</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        placeholder="Enter your name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
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
