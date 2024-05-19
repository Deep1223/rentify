import React from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/common/_header.css';
import './styles/common/_common.css';
import Register from './pages/register';
import Login from './pages/login';
import Seller from './pages/seller';
import Header from './common/header';
import Footer from './common/footer';

const App: React.FC = () => {
  return (
    <div className='App' style={{ backgroundColor: "#f2f2f2" }}>
    <Router>
      <AppContent />
    </Router>
    </div> 
  );
}


const AppContent: React.FC = () => {
  const location = useLocation();
  const hideHeaderFooterRoutes = ['/login', '/register'];

  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <Routes>
          <Route path="/" element={<Seller />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
