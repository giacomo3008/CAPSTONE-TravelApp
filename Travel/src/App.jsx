import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBarComponent from './components/NavBarComponent';
import HomeComponent from './components/HomeComponent';
import FooterComponent from './components/FooterComponent';
import RisultatiComponent from './components/RisultatiComponent';
import DetailsComponent from './components/DetailsComponent';
import ScrollToTopComponent from './components/ScrollToTopComponent';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTopComponent />
      <NavBarComponent />
      <div className='app-div'>
        <Routes>
          <Route path='/' element={<HomeComponent />} />
          <Route path='/results' element={<RisultatiComponent />} />
          <Route path='/details/:id' element={<DetailsComponent />} />
        </Routes>
        <FooterComponent />
      </div>
    </BrowserRouter>
  )
}

export default App
