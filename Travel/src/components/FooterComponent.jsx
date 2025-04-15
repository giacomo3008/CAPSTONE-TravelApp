import "../style/footer.css"

const FooterComponent = function () {
    return (
        <div className="footer d-flex justify-content-center align-items-center">
            <div className="inner-footer w-75 h-75 bg-white">
                <div className="info container-fluid">
                    <div className="row">
                        <div className=" col-sm-6">
                            <img src="/src/assets/img/travel-logo.png" alt="logo" className="mb-4" />
                            <p className="mb-4">La nostra piattaforma ti connette con soggiorni autentici, accoglienti e spesso unici. Dalle case in centro alle esperienze locali, ti aiutiamo a vivere ogni destinazione come un vero abitante, con semplicità, sicurezza e quel tocco in più.</p>
                            <div className=" d-flex flex-row justify-content-start align-items-center">
                                <a href="https://x.com/"><i className="bi bi-twitter-x"></i></a>
                                <a href="https://www.youtube.com/"><i className="bi bi-youtube"></i></a>
                                <a href="https://www.facebook.com/"><i className="bi bi-facebook"></i></a>
                                <a href="https://www.whatsapp.com/"><i className="bi bi-whatsapp"></i></a>
                            </div>
                        </div>
                        <div className=" col-sm-6 d-flex flex-row justify-content-between">
                            <div className="col-sm-4">
                                <h5 className="mb-4">
                                    OUR AGENCY
                                </h5>
                                <ul>
                                    <li><span><i className="fa-solid fa-chevron-right"></i></span> Services</li>
                                    <li><span><i className="fa-solid fa-chevron-right"></i></span> Insurancee</li>
                                    <li><span><i className="fa-solid fa-chevron-right"></i></span> Agency</li>
                                    <li><span><i className="fa-solid fa-chevron-right"></i></span> Tourism</li>
                                    <li><span><i className="fa-solid fa-chevron-right"></i></span> Payment</li>
                                </ul>
                            </div>
                            <div className="col-sm-4">
                                <h5 className="mb-4">
                                    PARTNERS
                                </h5>
                                <ul>
                                    <li><span><i className="fa-solid fa-chevron-right"></i></span> Booking</li>
                                    <li><span><i className="fa-solid fa-chevron-right"></i></span> RentalCar</li>
                                    <li><span><i className="fa-solid fa-chevron-right"></i></span> HostelWorld</li>
                                    <li><span><i className="fa-solid fa-chevron-right"></i></span> Trivago</li>
                                    <li><span><i className="fa-solid fa-chevron-right"></i></span> TripAdvisor</li>
                                </ul>
                            </div>
                            <div className="col-sm-4">
                                <h5 className="mb-4">
                                    LAST MINUTE
                                </h5>
                                <ul>
                                    <li><span><i className="fa-solid fa-chevron-right"></i></span> London</li>
                                    <li><span><i className="fa-solid fa-chevron-right"></i></span> California</li>
                                    <li><span><i className="fa-solid fa-chevron-right"></i></span> Indonesia</li>
                                    <li><span><i className="fa-solid fa-chevron-right"></i></span> Europa</li>
                                    <li><span><i className="fa-solid fa-chevron-right"></i></span> Oceania</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slogan">
                    <p>Dove ogni alloggio è un'esperienza
                    </p>
                </div>
            </div>
        </div>
    )
}

export default FooterComponent