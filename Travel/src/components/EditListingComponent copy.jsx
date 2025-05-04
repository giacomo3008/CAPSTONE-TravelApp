import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../style/add.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import config from '../config';

const EditListingComponent = function () {
    const { id } = useParams();
    const [listingTitle, setListingTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [images, setImages] = useState(Array(7).fill(null));
    const [imagesUrls, setImgagesUrls] = useState(null);
    const inputRefs = useRef([...Array(7)].map(() => React.createRef()));
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
    const [stopLoadImages, setStopLoadImages] = useState(false);

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

    const urlToFile = async (url, filename) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const ext = url.split('.').pop().split('?')[0];
        const mimeType = blob.type || `image/${ext}`;
        return new File([blob], filename, { type: mimeType });
    };

    const loadImages = async (urls) => {
        const loadedImages = await Promise.all(
            urls.map(async (url) => {
                if (url !== null) {
                    const file = await urlToFile(url, url.split('/').pop());
                    console.log("FILENAME DA AGGIUNGERE: ", file);
                    return file;
                }
                return null;
            })
        );
        setImages(loadedImages);
        setStopLoadImages(true);
        setIsLoading(false);
    };

    const getStructureDetails = async (id) => {
        try {
            const URL = config.serverUrl;
            const response = await fetch(URL + "/api/listing/" + id);

            if (!response.ok) {
                throw new Error("Errore nel recuperare la struttura");
            }
            const data = await response.json();
            console.log(data);
            setListingTitle(data.hotelName);
            setDescription(data.description.description);
            let urlsToAdd = Array(7).fill(null);
            for (let i = 0; i < data.imgUrls.length; i++) {
                urlsToAdd[i] = config.serverUrl + data.imgUrls[i];
            }
            setImgagesUrls(urlsToAdd);
            setBeds(data.description.beds);
            setCapacity(data.description.capacity);
            setPricePerNight(data.description.pricePerNight);
            setCity(data.description.city.name);
            setPropertyType(data.description.propertyType.name);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!stopLoadImages && imagesUrls !== null) {
            console.log(imagesUrls);
            loadImages(imagesUrls);
        }
    }, [imagesUrls]);


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

    useEffect(() => {
        getStructureDetails(id);
        getCities();
        getPropertyTypes();
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

        images.forEach((img) => {
            if (img !== null) {
                console.log(img);
                formData.append("Imgs", img);
            }
        });
        try {
            const response = await fetch(config.serverUrl + "/api/listing/" + id, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
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


    return (
        <>
            <div className="add-container">
                <h2 className="mb-4">Edit your Listing</h2>
                {
                    propertyTypes.length > 0 && cities.length > 0 && !isLoading ? (
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
            </div>
        </>
    );
};

export default EditListingComponent;
