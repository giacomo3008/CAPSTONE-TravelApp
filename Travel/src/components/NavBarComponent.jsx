import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import "../style/navbar.css";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginModalComponent from "./LoginModalComponent";
import SignUpModalComponent from "./SignUpModalComponent";

const NavBarComponent = function () {
    const location = useLocation();
    const dispatch = useDispatch();
    const searchBool = useSelector((state) => state.toggleSearch.search);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const user = useSelector((state) => state.authLogin.user);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleBookBtn = (e) => {
        if (location.pathname === "/results") {
            e.preventDefault();
            dispatch({ type: 'TOGGLE_PULSE', payload: true });
            setTimeout(() => {
                dispatch({ type: 'TOGGLE_PULSE', payload: false });
            }, 200);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setDropdownOpen(false);
        dispatch({
            type: 'LOGIN',
            payload: true,
        })
    };

    const handleLogout = (e) => {
        e.preventDefault();
        setDropdownOpen(false);
        dispatch({
            type: 'LOGOUT',
            payload: true,
        });
        localStorage.removeItem("token");
        navigate('/');
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        setDropdownOpen(false);
        dispatch({
            type: 'SIGNUP',
            payload: true,
        })
    };

    const handleWishlists = (e) => {
        e.preventDefault();
        setDropdownOpen(false);
        navigate("/wishlist");
    }

    const handleCart = (e) => {
        e.preventDefault();
        setDropdownOpen(false);
        navigate("/cart");
    }

    const handleAccount = (e) => {
        e.preventDefault();
        setDropdownOpen(false);
        navigate("/account");
    }

    const handleListings = (e) => {
        e.preventDefault();
        setDropdownOpen(false);
        navigate("/listings");
    }

    return (
        <>
            <Navbar expand="lg" className={`w-100 ${searchBool ? 'search' : ''}`}>
                <Container fluid className="m-0 h-100 w-100 p-0">
                    <Navbar.Brand href="#home" className="h-75 p-0 m-0 d-flex flex-row justify-content-center align-items-center">
                        <img src="/src/assets/img/travel-logo-white.png" alt="logo" className="h-75 mb-1" />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="d-flex w-100 justify-content-between align-items-center">
                            <div className="links ms-5 d-flex flex-row align-items-center">
                                <Link to="/" className={`d-flex flex-row justify-content-center align-items-center ms-5 ${location.pathname === "/" ? "active-link" : ""}`}>HOME</Link>
                                <Link to="/packages" className={`d-flex flex-row justify-content-center align-items-center ms-5 ${location.pathname === "/packages" ? "active-link" : ""}`}>PACKAGES</Link>
                                <Link to="/aboutus" className={`d-flex flex-row justify-content-center align-items-center ms-5 ${location.pathname === "/aboutus" ? "active-link" : ""}`}>ABOUT US</Link>
                                <Link to="/news" className={`d-flex flex-row justify-content-center align-items-center ms-5 ${location.pathname === "/news" ? "active-link" : ""}`}>NEWS</Link>
                                <Link to="/contact" className={`d-flex flex-row justify-content-center align-items-center ms-5 ${location.pathname === "/contact" ? "active-link" : ""}`}>CONTACT</Link>
                                <a href="#book-now" className="d-flex flex-row justify-content-center align-items-center ms-5 btn-book" onClick={handleBookBtn}>BOOK NOW</a>
                            </div>

                            {/* User Dropdown */}
                            <Dropdown show={isDropdownOpen} onToggle={() => { }} ref={dropdownRef}>
                                <div className="d-flex align-items-center gap-3 position-relative menu-toggle-wrapper">
                                    {/* Benvenuto animato */}
                                    {user && (
                                        <div className="welcome-container">
                                            <span className="welcome-text">Benvenuto, <br />
                                                <strong>{user.firstName} {user.lastName}</strong>
                                            </span>
                                        </div>
                                    )}
                                    <div
                                        className="menu-toggle-custom"
                                        onClick={() => setDropdownOpen((prev) => !prev)}
                                    >
                                        <i className="bi bi-list menu-icon"></i>
                                        {!user ? (
                                            <img
                                                src="/src/assets/img/profile-placeholder.png"
                                                alt="User"
                                                className="profile-icon"
                                            />
                                        ) : (
                                            <div className="profile-icon-login">
                                                {user.firstName.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <Dropdown.Menu align="end" className="custom-dropdown-menu">
                                    {
                                        !user ? (
                                            <>
                                                <Dropdown.Item onClick={handleLogin}>Log In</Dropdown.Item>
                                                <Dropdown.Item onClick={handleSignUp}>Sign Up</Dropdown.Item>
                                                <hr className="m-0" />
                                                <Dropdown.Item>Centro Assistenza</Dropdown.Item>
                                                <Dropdown.Item>Gift Card</Dropdown.Item>
                                                <Dropdown.Item>Affitta con Travel</Dropdown.Item>
                                                <Dropdown.Item>Proponi un esperienza</Dropdown.Item>
                                            </>
                                        ) : (
                                            <>
                                                <Dropdown.Item onClick={handleWishlists}>Wishlists</Dropdown.Item>
                                                <Dropdown.Item onClick={handleCart}>Cart</Dropdown.Item>
                                                <Dropdown.Item onClick={handleAccount}>Account</Dropdown.Item>
                                                <Dropdown.Item onClick={handleListings}>Your Listings</Dropdown.Item>
                                                <hr className="m-0" />
                                                <Dropdown.Item>Centro Assistenza</Dropdown.Item>
                                                <Dropdown.Item>Gift Card</Dropdown.Item>
                                                <hr className="m-0" />
                                                <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                                            </>
                                        )
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Modals */}
            <LoginModalComponent />
            <SignUpModalComponent />
        </>
    );
};

export default NavBarComponent;
