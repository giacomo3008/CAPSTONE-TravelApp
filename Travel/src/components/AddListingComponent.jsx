import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../style/add.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddListingComponent = function () {
    const [listingTitle, setListingTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [imgUrls, setImgUrls] = useState([""]);
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
    const [CountryImg, setCountryImg] = useState("");
    const [newCountry, setNewCountry] = useState(false);
    const [invalidInfo, setInvalidInfo] = useState("");




    const getCities = async () => {
        try {
            const response = await fetch("https://localhost:7146/api/city", {
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
            const response = await fetch("https://localhost:7146/api/listing/property-type", {
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
            const response = await fetch("https://localhost:7146/api/listing/experience-type", {
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
            const response = await fetch("https://localhost:7146/api/listing/countries", {
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

        const payload = {
            HotelName: listingTitle,
            ImgUrls: imgUrls.filter(url => url.trim() !== ""),
            Description,
            Beds,
            Capacity,
            PricePerNight,
            City,
            PropertyType,
            ExperienceType,
            Country,
            CityDescription,
            CountryName,
            CountryImg,
        };
        console.log(payload);
        try {
            const response = await fetch("https://localhost:7146/api/listing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
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

    const removeImageField = (indexToRemove) => {
        const updatedUrls = imgUrls.filter((_, index) => index !== indexToRemove);
        setImgUrls(updatedUrls);
    };


    const handleImageChange = (index, value) => {
        const newUrls = [...imgUrls];
        newUrls[index] = value;
        setImgUrls(newUrls);
    };

    const addImageField = () => {
        if (imgUrls.length < 7) {
            setImgUrls([...imgUrls, ""]);
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
                                                                <input
                                                                    type="text"
                                                                    value={CountryImg}
                                                                    onChange={(e) => setCountryImg(e.target.value)}
                                                                    placeholder="Enter the image URL"

                                                                />
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

                            <div className="form-bottom d-flex flex-row justify-content-between align-items-end mt-3">
                                <div className="image-url-section d-flex flex-column w-50">
                                    <label>Image URLs (up to 7)</label>
                                    <div className="img-urls w-100">
                                        {imgUrls.map((url, index) => {
                                            const isFirst = index === 0;
                                            const isLast = index === imgUrls.length - 1;
                                            const isMaxed = imgUrls.length === 7;

                                            let inputClass = "img-input w-100";
                                            if (isFirst) inputClass += " img-input-first";
                                            if (isLast && isMaxed) inputClass += " img-input-last";

                                            return (
                                                <div key={index} className={`input-urls input-${index} w-100`}>
                                                    <input
                                                        key={index}
                                                        type="text"
                                                        value={url}
                                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                                        placeholder={`Image ${index + 1} URL`}
                                                        className={inputClass}
                                                    />
                                                    <i class="fa-solid fa-x" onClick={(e) => {
                                                        e.preventDefault();
                                                        removeImageField(index);
                                                    }}></i>
                                                </div>
                                            );
                                        })}

                                        {imgUrls.length < 7 && (
                                            <button type="button" onClick={addImageField} className={`add-img-btn ${imgUrls.length == 0 ? 'alone' : ''} w-100`}>
                                                + Add Image
                                            </button>
                                        )}
                                    </div>
                                </div>


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
