import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../style/add.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import config from "../config";

const AddListingComponent = function () {

    const [listingTitle, setListingTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [images, setImages] = useState(Array(7).fill(null));
    const [imagesUrls, setImgagesUrls] = useState(Array(7).fill(null));
    const inputRefs = useRef([...Array(7)].map(() => React.createRef()));
    const countryRef = useRef();
    const [Beds, setBeds] = useState(1);
    const [Capacity, setCapacity] = useState(1);
    const [PricePerNight, setPricePerNight] = useState(50);
    const [cities, setCities] = useState([]);
    const [City, setCity] = useState("");
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [PropertyType, setPropertyType] = useState("");
    const token = useSelector((state) => state.authLogin.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newCity, setNewCity] = useState(false);
    const [experienceTypes, setExperienceTypes] = useState([]);
    const [ExperienceType, setExperienceType] = useState("");
    const [countries, setCountries] = useState([]);
    const [Country, setCountry] = useState("");
    const [CityDescription, setCityDescription] = useState("");
    const [CountryName, setCountryName] = useState("");
    const [CountryImg, setCountryImg] = useState(null);
    const [CountryImgUrl, setCountryImgUrl] = useState(null);
    const [newCountry, setNewCountry] = useState(false);
    const [invalidInfo, setInvalidInfo] = useState("");


    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const newImages = [...images];
        newImages[index] = file;
        const newImagesUrl = [...imagesUrls];
        newImagesUrl[index] = URL.createObjectURL(file);
        setImages(newImages);
        setImgagesUrls(newImagesUrl);
    };

    const handleDeleteImg = (index) => {

        const newImages = [...images];
        newImages[index] = null;
        const newImagesUrl = [...imagesUrls];
        newImagesUrl[index] = null;
        setImages(newImages);
        setImgagesUrls(newImagesUrl);
    }

    const handleImageCountryChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setCountryImg(file);
        setCountryImgUrl(URL.createObjectURL(file));
    };

    const handleDeleteImgCountry = () => {
        setCountryImg(null);
        setCountryImgUrl(null);
    }


    const getCities = async () => {
        try {
            const response = await fetch(config.serverUrl + "/api/city", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Errore durante la richiesta delle cities");
            }

            const data = await response.json();
            console.log(data);
            setCities(data);
        } catch (err) {
            console.error("Errore:", err);
            alert("C'è stato un errore nell'invio.");
        }
    }

    const getPropertyTypes = async () => {
        try {
            const response = await fetch(config.serverUrl + "/api/listing/property-type", {
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
                    throw new Error("Errore durante la richiesta delle property types");
                }

                const data = await response.json();
                console.log(data);
                setPropertyTypes(data);
            }
        } catch (err) {
            console.error("Errore:", err);
            alert("C'è stato un errore nell'invio.");
        }
    }

    const getExperienceTypes = async () => {
        try {
            const response = await fetch(config.serverUrl + "/api/listing/experience-type", {
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
                    throw new Error("Errore durante la richiesta delle experience types");
                }

                const data = await response.json();
                console.log(data);
                setExperienceTypes(data);
            }
        } catch (err) {
            console.error("Errore:", err);
            alert("C'è stato un errore nell'invio.");
        }
    }

    const getCountries = async () => {
        try {
            const response = await fetch(config.serverUrl + "/api/listing/countries", {
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
                    throw new Error("Errore durante la richiesta dei paesi");
                }

                const data = await response.json();
                console.log(data);
                setCountries(data);
            }
        } catch (err) {
            console.error("Errore:", err);
            alert("C'è stato un errore nell'invio.");
        }
    }

    useEffect(() => {
        getCities();
        getPropertyTypes();
        getExperienceTypes();
        getCountries();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("HotelName", listingTitle);
        formData.append("Description", Description);
        formData.append("Beds", Beds);
        formData.append("Capacity", Capacity);
        formData.append("PricePerNight", PricePerNight);
        formData.append("City", City);
        formData.append("PropertyType", PropertyType);
        formData.append("ExperienceType", ExperienceType);
        formData.append("Country", Country);
        formData.append("CityDescription", CityDescription);
        formData.append("CountryName", CountryName);

        if (CountryImg !== null) {
            formData.append("CountryImg", CountryImg);
        }

        console.log(CountryImg);

        images.forEach((img) => {
            if (img !== null) {
                formData.append("Imgs", img);
            }
        });
        console.log("INVIO AL BACKEND:  ", formData);
        try {
            const response = await fetch(config.serverUrl + "/api/listing", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                if (errorMessage.message != null) {
                    console.log(errorMessage);
                    setInvalidInfo(errorMessage.message);
                    navigate("/add");
                    return;
                }
                throw new Error("Errore durante l'invio del form");
            }

            alert("Listing aggiunto con successo!");
            navigate('/listings');
        } catch (err) {
            console.error("Errore:", err);
            alert("C'è stato un errore nell'invio.");
        }
    };

    const addCity = (e) => {
        e.preventDefault();
        setCity("");
        setNewCity(true);
    };

    const deleteCity = (e) => {
        e.preventDefault();
        setCity("");
        setExperienceType("");
        setCountry("");
        setCountryImg("");
        setCountryName("");
        setCityDescription("");
        setNewCity(false);
        setNewCountry(false);
    };

    const addCountry = (e) => {
        e.preventDefault();
        setCountry("");
        setNewCountry(true);
    };

    const deleteCountry = (e) => {
        e.preventDefault();
        setCountryName("");
        setCountryImg("");
        setNewCountry(false);
    };

    return (
        <>
            <div className="add-container">
                <h2 className="mb-4">Add your Listing</h2>
                {
                    propertyTypes.length > 0 && cities.length > 0 && experienceTypes.length > 0 && countries.length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            {invalidInfo && (
                                <div className="error-message mb-3" style={{ color: 'red', marginBottom: '10px' }}>
                                    {invalidInfo}
                                </div>
                            )}
                            <div className="input-group">
                                <label>Listing title</label>
                                <input
                                    type="text"
                                    value={listingTitle}
                                    onChange={(e) => setListingTitle(e.target.value)}
                                    placeholder="Enter your listing title"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Describe your listing</label>
                                <textarea
                                    value={Description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter a description"
                                    required
                                />
                            </div>

                            <hr className="my-5" />

                            <div className="input-group w-100">
                                <label>Listing Images (up to 7)</label>
                                <div style={{ height: "300px" }} className="imgs-details mt-4 d-none d-lg-flex flex-row w-100">
                                    {/* Immagine principale a sinistra */}
                                    <div className="img-principal m-0 w-50">
                                        {
                                            imagesUrls[0] ? (
                                                <div style={{
                                                    backgroundColor: "rgba(249, 249, 249, 0.18)",
                                                    borderRight: "0.5px solid rgba(148, 148, 148, 0.51)",
                                                    overflow: "hidden",
                                                    height: "100%",
                                                    width: "100%",
                                                    position: "relative",
                                                }}>
                                                    <div className="img-handle d-flex justify-content-center align-items-center"><i class="fa-solid fa-trash" onClick={() => handleDeleteImg(0)}></i>
                                                    </div>
                                                    <img style={{ width: "150%" }} src={imagesUrls[0]} />
                                                </div>
                                            ) : (
                                                <div style={{
                                                    width: "100%",
                                                    backgroundColor: "rgba(249, 249, 249, 0.18)",
                                                    borderRight: "0.5px solid rgba(148, 148, 148, 0.51)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "1.5rem",
                                                    height: "100%",
                                                    overflow: "hidden"
                                                }} onClick={() => inputRefs.current[0].current.click()} className="img-principal-div">
                                                    <div className="h-100 w-100 bg-transparent icon-div d-flex flex-row justify-content-center align-items-center">
                                                        <i class="fa-solid fa-plus"></i>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        accept="image/*" //accetta solo immagini
                                                        ref={inputRefs.current[0]}
                                                        onChange={(e) => handleImageChange(e, 0)}
                                                        style={{ display: "none" }}
                                                    />
                                                </div>
                                            )
                                        }
                                    </div>

                                    <div style={{ width: "50%" }} className=" container-fluid h-100">
                                        <div className="row h-100">
                                            {imagesUrls.slice(1).map((url, index) => (
                                                <div key={`img-${index}`} className={`col-lg-6 p-0 ps-2 imgs-small ${index == 0 || index == 1 ? "" : "mt-2"}`}>
                                                    {
                                                        url !== null ? (
                                                            <div style={{
                                                                backgroundColor: "rgba(249, 249, 249, 0.18)",
                                                                border: "0.5px solid rgba(148, 148, 148, 0.51)",
                                                                overflow: "hidden",
                                                                height: "100%",
                                                                position: "relative",
                                                            }}>
                                                                <div className="img-handle d-flex justify-content-center align-items-center"><i class="fa-solid fa-trash" onClick={() => handleDeleteImg(index + 1)}></i>
                                                                </div>
                                                                <img src={url} style={{ width: "110%" }} />
                                                            </div>
                                                        ) : (
                                                            <div className="h-100">
                                                                <div style={{
                                                                    backgroundColor: "rgba(249, 249, 249, 0.18)",
                                                                    border: "0.5px solid rgba(148, 148, 148, 0.51)",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    height: "100%",
                                                                    overflow: "hidden"
                                                                }} className="imgs-small-div" onClick={() => inputRefs.current[index + 1].current.click()}>
                                                                    <div className="h-100 w-100 bg-transparent icon-div d-flex flex-row justify-content-center align-items-center">
                                                                        <i class="fa-solid fa-plus"></i>
                                                                    </div>
                                                                </div>
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    ref={inputRefs.current[index + 1]}
                                                                    onChange={(e) => handleImageChange(e, index + 1)}
                                                                    style={{ display: "none" }}
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="imgs-details w-100 responsive mt-4 d-block d-lg-none">
                                    <div className="row w-100">
                                        <div className="img-principal-responsive col-12 mb-2 p-0">
                                            <div
                                                style={{
                                                    height: "100%",
                                                    backgroundColor: "rgba(249, 249, 249, 0.18)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "1.5rem",
                                                    overflow: "hidden",
                                                    position: "relative",
                                                }} className="img-principal-div"
                                            >{
                                                    imagesUrls[0] ? (
                                                        <>
                                                            <div className="img-handle-resp d-flex justify-content-center align-items-center"><i class="fa-solid fa-trash" onClick={() => handleDeleteImg(0)}></i>
                                                            </div>
                                                            <img style={{ width: "110%" }} src={imagesUrls[0]} />
                                                        </>
                                                    ) : (
                                                        <div style={{
                                                            width: "100%",
                                                            backgroundColor: "trasparent",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            height: "100%",
                                                            overflow: "hidden"
                                                        }} onClick={() => inputRefs.current[0].current.click()}>
                                                            <div className="h-100 w-100 bg-transparent icon-div d-flex flex-row justify-content-center align-items-center">
                                                                <i class="fa-solid fa-plus"></i>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        {imagesUrls.slice(1).map((url, index) => (
                                            <div key={`img-${index}`} className={`col-6 mb-2 p-0 imgs-small ${index == 0 || index == 2 || index == 4 ? "" : "ps-2"}`}>
                                                {
                                                    url !== null ? (
                                                        <div style={{
                                                            backgroundColor: "rgba(249, 249, 249, 0.18)",
                                                            border: "0.5px solid rgba(148, 148, 148, 0.51)",
                                                            overflow: "hidden",
                                                            height: "100%",
                                                            position: "relative",
                                                        }}>
                                                            <div className="img-handle-resp d-flex justify-content-center align-items-center"><i class="fa-solid fa-trash" onClick={() => handleDeleteImg(index + 1)}></i>
                                                            </div>
                                                            <img src={url} style={{ width: "110%" }} />
                                                        </div>
                                                    ) : (
                                                        <div className="h-100">
                                                            <div style={{
                                                                backgroundColor: "rgba(249, 249, 249, 0.18)",
                                                                border: "0.5px solid rgba(148, 148, 148, 0.51)",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                height: "100%",
                                                                overflow: "hidden"
                                                            }} className="imgs-small-div" onClick={() => inputRefs.current[index + 1].current.click()}>
                                                                <div className="h-100 w-100 bg-transparent icon-div d-flex flex-row justify-content-center align-items-center">
                                                                    <i class="fa-solid fa-plus"></i>
                                                                </div>
                                                            </div>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                ref={inputRefs.current[index + 1]}
                                                                onChange={(e) => handleImageChange(e, index + 1)}
                                                                style={{ display: "none" }}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <hr className="my-5" />

                            <Container fluid className="mt-3">
                                <Row>
                                    <Col md={6}>
                                        <div className="input-group">
                                            <label>Beds</label>
                                            <input
                                                type="number"
                                                value={Beds}
                                                onChange={(e) => setBeds(parseInt(e.target.value))}
                                                min="1"
                                                required
                                            />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="input-group">
                                            <label>Capacity</label>
                                            <input
                                                type="number"
                                                value={Capacity}
                                                onChange={(e) => setCapacity(parseInt(e.target.value))}
                                                min="1"
                                                required
                                            />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="input-group">
                                            <label>Price per Night (€)</label>
                                            <input
                                                type="number"
                                                value={PricePerNight}
                                                onChange={(e) => setPricePerNight(parseFloat(e.target.value))}
                                                min="0"
                                                step="0.01"
                                                required
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Container>

                            <hr className="my-5" />

                            <div className="input-group w-75">
                                <label>Property Type</label>
                                <select
                                    value={PropertyType}
                                    onChange={(e) => setPropertyType(e.target.value)}
                                    required
                                >
                                    <option value="">Select a Property Type</option>
                                    {propertyTypes.map((propertyType) => (
                                        <option key={propertyType.id} value={propertyType.name}>
                                            {propertyType.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-group mt-3 w-100">
                                <label>City</label>
                                <div className="d-flex flex-row justify-content-start align-items-center">
                                    <select
                                        value={newCity ? "" : City}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="w-75 me-4"
                                        disabled={newCity}
                                        required
                                    >
                                        <option value="">Select a City</option>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.name}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                    {
                                        newCity ? (
                                            <button type="button" onClick={deleteCity} className={`delete-city-btn`}>
                                                <i class="fa-solid fa-x"></i>
                                            </button>
                                        ) : (
                                            <button type="button" onClick={addCity} className={`add-city-btn`}>
                                                + New City
                                            </button>
                                        )
                                    }
                                </div>
                            </div>

                            {
                                newCity && (
                                    <>
                                        <Container fluid className="mt-3 p-0">
                                            <Row className="px-1">
                                                <Col md={6}>
                                                    <div className="input-group">
                                                        <label>City Name</label>
                                                        <input
                                                            type="text"
                                                            value={City}
                                                            onChange={(e) => setCity(e.target.value)}
                                                            placeholder="Enter the city name"
                                                            required
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-group">
                                                        <label>Experience Type</label>
                                                        <select
                                                            value={ExperienceType}
                                                            onChange={(e) => setExperienceType(e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Select an Experience Type</option>
                                                            {experienceTypes.map((experienceType) => (
                                                                <option key={experienceType.id} value={experienceType.name}>
                                                                    {experienceType.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                        <div className="input-group">
                                            <label>City Description</label>
                                            <textarea
                                                value={CityDescription}
                                                onChange={(e) => setCityDescription(e.target.value)}
                                                placeholder="Enter a city description"
                                                required
                                            />
                                        </div>
                                        <div className="input-group mt-3 w-100">
                                            <label>Country</label>
                                            <div className="d-flex flex-row justify-content-start align-items-center">
                                                <select
                                                    value={newCountry ? "" : Country}
                                                    onChange={(e) => setCountry(e.target.value)}
                                                    className="w-75 me-4"
                                                    disabled={newCountry}
                                                    required
                                                >
                                                    <option value="">Select Country</option>
                                                    {countries.map((country) => (
                                                        <option key={country.id} value={country.name}>
                                                            {country.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {
                                                    newCountry ? (
                                                        <button type="button" onClick={deleteCountry} className={`delete-city-btn`}>
                                                            <i class="fa-solid fa-x"></i>
                                                        </button>
                                                    ) : (
                                                        <button type="button" onClick={addCountry} className={`add-city-btn`}>
                                                            + New Country
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        {
                                            newCountry && (
                                                <Container fluid className="mt-3 p-0">
                                                    <Row className="px-1">
                                                        <Col md={6}>
                                                            <div className="input-group">
                                                                <label>Country Name</label>
                                                                <input
                                                                    type="text"
                                                                    value={CountryName}
                                                                    onChange={(e) => setCountryName(e.target.value)}
                                                                    placeholder="Enter the country name"
                                                                    required
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col md={6}>
                                                            <div className="input-group">
                                                                <label>Country Image</label>
                                                                <div className={`w-100 imgs-small-country`}>
                                                                    {
                                                                        CountryImg !== null ? (
                                                                            <div style={{
                                                                                backgroundColor: "rgba(249, 249, 249, 0.18)",
                                                                                border: "0.5px solid rgba(148, 148, 148, 0.51)",
                                                                                overflow: "hidden",
                                                                                height: "100%",
                                                                                position: "relative",
                                                                            }}>
                                                                                <div className="img-handle d-flex justify-content-center align-items-center"><i class="fa-solid fa-trash" onClick={handleDeleteImgCountry}></i>
                                                                                </div>
                                                                                <img src={CountryImgUrl} style={{ width: "110%" }} />
                                                                            </div>
                                                                        ) : (
                                                                            <div className="h-100">
                                                                                <div style={{
                                                                                    backgroundColor: "rgba(249, 249, 249, 0.18)",
                                                                                    border: "0.5px solid rgba(148, 148, 148, 0.51)",
                                                                                    display: "flex",
                                                                                    alignItems: "center",
                                                                                    justifyContent: "center",
                                                                                    height: "100%",
                                                                                    overflow: "hidden"
                                                                                }} className="imgs-small-div" onClick={() => countryRef.current.click()}>
                                                                                    <div className="h-100 w-100 bg-transparent icon-div d-flex flex-row justify-content-center align-items-center">
                                                                                        <i class="fa-solid fa-plus"></i>
                                                                                    </div>
                                                                                </div>
                                                                                <input
                                                                                    type="file"
                                                                                    accept="image/*"
                                                                                    ref={countryRef}
                                                                                    onChange={handleImageCountryChange}
                                                                                    style={{ display: "none" }}
                                                                                />
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            )
                                        }
                                    </>
                                )
                            }

                            <hr className="my-5" />

                            <div className="form-bottom d-flex flex-row justify-content-center align-items-end mt-3">
                                <button type="submit" className="submit-btn me-5"><i class="fa-solid fa-plus"></i></button>
                            </div>
                        </form>
                    ) : (
                        <div className="skeleton-form">
                            {/* Title input */}
                            <div className="skeleton-input-group">
                                <div className="skeleton-label"></div>
                                <div className="skeleton-input"></div>
                            </div>

                            {/* Description textarea */}
                            <div className="skeleton-input-group">
                                <div className="skeleton-label"></div>
                                <div className="skeleton-textarea"></div>
                            </div>

                            {/* 3 inputs in grid */}
                            <div className="skeleton-row">
                                <div className="skeleton-input-group half">
                                    <div className="skeleton-label"></div>
                                    <div className="skeleton-input"></div>
                                </div>
                                <div className="skeleton-input-group half">
                                    <div className="skeleton-label"></div>
                                    <div className="skeleton-input"></div>
                                </div>
                                <div className="skeleton-input-group half">
                                    <div className="skeleton-label"></div>
                                    <div className="skeleton-input"></div>
                                </div>
                            </div>

                            {/* Dropdowns */}
                            <div className="skeleton-input-group wide">
                                <div className="skeleton-label"></div>
                                <div className="skeleton-input"></div>
                            </div>

                            <div className="skeleton-input-group wide">
                                <div className="skeleton-label"></div>
                                <div className="skeleton-input"></div>
                            </div>

                            {/* Image URLs */}
                            <div className="skeleton-input-group wide">
                                <div className="skeleton-label"></div>
                                {[...Array(3)].map((_, i) => (
                                    <div className="skeleton-input mb-2" key={i}></div>
                                ))}
                                <div className="skeleton-button mt-2"></div>
                            </div>

                            {/* Submit button */}
                            <div className="skeleton-submit-btn"></div>
                        </div>

                    )
                }
            </div >
        </>
    );
};

export default AddListingComponent;
