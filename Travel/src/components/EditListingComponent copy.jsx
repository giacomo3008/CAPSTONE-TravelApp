import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../style/add.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditListingComponent = function () {
    const { id } = useParams();
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
    const [isLoading, setIsLoading] = useState(true);

    const getStructureDetails = async (id) => {
        try {
            const URL = "https://localhost:7146/api/"
            const response = await fetch(URL + "listing/" + id);

            if (!response.ok) {
                throw new Error("Errore nel recuperare la struttura");
            }
            const data = await response.json();
            console.log(data);
            setListingTitle(data.hotelName);
            setDescription(data.description.description);
            setImgUrls(data.imgUrls);
            setBeds(data.description.beds);
            setCapacity(data.description.capacity);
            setPricePerNight(data.description.pricePerNight);
            setCity(data.description.city.name);
            setPropertyType(data.description.propertyType.name);
            setIsLoading(false);
        }
        catch (error) {
            console.error(error);
        }
    }

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

    useEffect(() => {
        getStructureDetails(id);
        getCities();
        getPropertyTypes();
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
        };
        console.log(payload);
        try {
            const response = await fetch("https://localhost:7146/api/listing/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Errore durante l'invio del form");
            }

            alert("Listing aggiornato con successo!");
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

    return (
        <>
            {
                propertyTypes.length > 0 && cities.length > 0 && !isLoading && (
                    <div className="add-container">
                        <h2 className="mb-4">Edit your Listing</h2>
                        <form onSubmit={handleSubmit}>
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

                            <div className="input-group mt-3 w-75">
                                <label>City</label>
                                <select
                                    value={City}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                >
                                    <option value="">Select a City</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.name}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

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


                                <button type="submit" className="submit-btn me-5"><i class="fa-solid fa-pen"></i></button>
                            </div>
                        </form>
                    </div>
                )
            }
        </>
    );
};

export default EditListingComponent;
