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
    const [isMenuOpen, setMenuOpen] = useState(false);
    const role = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";


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

    const handleDashboard = (e) => {
        e.preventDefault();
        setDropdownOpen(false);
        navigate("/dashboard");
    }

    return (
        <>
            <Navbar expand="lg" expanded={isMenuOpen} onToggle={() => setMenuOpen(!isMenuOpen)} className={`w-100 ${searchBool ? 'search' : ''}`}>
                <Container fluid className="m-0 h-100 w-100 p-0">
                    <Navbar.Brand href="#home" className="h-75 p-0 m-0 d-flex flex-row justify-content-center align-items-center">
                        <img src="/src/assets/img/travel-logo-white.png" alt="logo" className="h-75 mb-1" />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="d-flex w-100 justify-content-between align-items-center flex-column flex-lg-row">
                            <div className="links ms-0 ms-lg-5 d-flex flex-column flex-lg-row align-items-start align-items-lg-center w-100">
                                <button
                                    className="d-lg-none btn-x"
                                    onClick={() => setMenuOpen(false)}
                                    aria-label="Chiudi menu"
                                >
                                    <i className="fa-solid fa-x"></i>
                                </button>
                                <h3 className="altro-nav mb-4 d-lg-none">Altro</h3>
                                <Link to="/" className={`ms-lg-5 ${location.pathname === "/" ? "active-link" : ""}`} onClick={() => setMenuOpen(false)}>HOME</Link>
                                {
                                    user && (
                                        <>
                                            <Link to="/wishlist" className={`ms-lg-5 ${location.pathname === "/wishlist" ? "active-link" : ""}`} onClick={() => setMenuOpen(false)}>WISHLIST</Link>
                                            <Link to="/cart" className={`ms-lg-5 ${location.pathname === "/cart" ? "active-link" : ""}`} onClick={() => setMenuOpen(false)}>CART</Link>
                                        </>
                                    )
                                }
                                <Link to="/aboutus" className={`ms-lg-5 ${location.pathname === "/aboutus" ? "active-link" : ""}`} onClick={() => setMenuOpen(false)}>ABOUT US</Link>
                                <Link to="/contact" className={`ms-lg-5 ${location.pathname === "/contact" ? "active-link" : ""}`} onClick={() => setMenuOpen(false)}>CONTACT</Link>
                                <a href="#book-now" className="btn-book d-none d-lg-flex ms-5" onClick={handleBookBtn}>
                                    <p className="m-0">BOOK NOW</p>
                                </a>

                            </div>
                        </Nav>
                    </Navbar.Collapse>
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
                                    <div className="profile-icon-login" style={{
                                        backgroundColor: `${user.colorString}`,
                                    }}>
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
                                        <Dropdown.Item onClick={handleAccount}>Account</Dropdown.Item>
                                        <Dropdown.Item onClick={handleListings}>Your Listings</Dropdown.Item>
                                        {
                                            Array.isArray(user[role]) ? (
                                                <>
                                                    {
                                                        user[role].includes("Admin") && (
                                                            <Dropdown.Item onClick={handleDashboard}>Dashboard</Dropdown.Item>
                                                        )
                                                    }
                                                </>
                                            ) : (
                                                <>
                                                    {
                                                        user[role] == "Admin" && (
                                                            <Dropdown.Item onClick={handleDashboard}>Dashboard</Dropdown.Item>
                                                        )
                                                    }
                                                </>
                                            )
                                        }
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
                </Container>
            </Navbar >

            {/* Modals */}
            < LoginModalComponent />
            <SignUpModalComponent />
        </>
    );
};

export default NavBarComponent;
