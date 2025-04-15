import "../style/search.css"
import SearchFormComponent from "./SearchFormComponent";

const SearchComponent = function () {
    return (
        <div className="search-container">
            <h4 className='mt-6'>OUR PACKAGES</h4>
            <h2 className='mb-5'>Search your Holiday</h2>
            <SearchFormComponent search={false} />
            <div className='search-bottom-container d-flex flex-row justify-content-between mt-5 mb-3'>
                <div className='order d-flex flex-row'>
                    <div className='div-h5'>
                        <h5 className='me-4'>PRICE <span><i className="fa-solid fa-chevron-down"></i></span></h5>
                    </div>
                    <div className='div-h5'>
                        <h5 className='me-3'>NAME <span><i className="fa-solid fa-chevron-down"></i></span></h5>
                    </div>
                </div>
                <div className='order d-flex flex-row'>
                    <h4></h4> {/*TODO: DA COMPLETARE */}
                    <h4></h4>
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;