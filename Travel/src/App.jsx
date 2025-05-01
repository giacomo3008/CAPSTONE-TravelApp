import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NavBarComponent from './components/NavBarComponent';
import HomeComponent from './components/HomeComponent';
import FooterComponent from './components/FooterComponent';
import RisultatiComponent from './components/RisultatiComponent';
import DetailsComponent from './components/DetailsComponent';
import ScrollToTopComponent from './components/ScrollToTopComponent';
import CityComponent from './components/CityComponent';
import MyListingsComponent from './components/MyListingsComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AddListingComponent from './components/AddListingComponent';
import EditListingComponent from './components/EditListingComponent copy';
import WishlistComponent from './components/WishlistComponent';
import LoginModalComponent from './components/LoginModalComponent';
import CartComponent from './components/CartComponent';
import AccountComponent from './components/AccountComponent';
import BookingComponent from './components/BookingComponent';
import DashboardComponent from './components/DashboardComponent';
import DashboardAccountsComponent from './components/DashboardAccountsComponent';
import DashboardListingsComponent from './components/DashboardListingsComponent';
import AccountInfoComponent from './components/AccountInfoComponent copy';

function App() {
  const token = useSelector((state) => state.authLogin.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const checkTokenValidity = async () => {
    try {
      const response = await fetch("https://localhost:7146/api/account/validate", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.status === 401 || response.status === 403) {
        dispatch({ type: 'LOGOUT', payload: true });
        localStorage.removeItem('token');
        navigate('/');
      }
    } catch (err) {
      console.error("Errore durante la validazione del token", err);
    }
  };

  useEffect(() => {
    if (token) {
      checkTokenValidity();
    }
  }, [location.pathname]);

  return (
    <>
      <ScrollToTopComponent />
      <NavBarComponent />
      <div className='app-div'>
        <Routes>
          <Route path='/' element={<HomeComponent />} />
          <Route path='/results/:destination' element={<RisultatiComponent />} />
          <Route path='/city/:name' element={<CityComponent />} />
          <Route path='/details/:id' element={<DetailsComponent />} />
          <Route path='/listings' element={<MyListingsComponent />} />
          <Route path='/wishlist' element={<WishlistComponent />} />
          <Route path='/add' element={<AddListingComponent />} />
          <Route path='/edit/:id' element={<EditListingComponent />} />
          <Route path='/cart' element={<CartComponent />} />
          <Route path='/account' element={<AccountComponent />} />
          <Route path='/booking/:idListing' element={<BookingComponent />} />
          <Route path='/dashboard' element={<DashboardComponent />} />
          <Route path='/dashboard-acc' element={<DashboardAccountsComponent />} />
          <Route path='/dashboard-list' element={<DashboardListingsComponent />} />
          <Route path='/user/:email' element={<AccountInfoComponent />} />
        </Routes>
        <FooterComponent />
      </div>
    </>
  )
}

export default App
