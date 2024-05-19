import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../images/logo.png";
import axios from 'axios';

function Header() {
    const navigate = useNavigate();
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState(null);
    // const userData = location.state?.user;

    const handleNavbarToggle = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const handleNavItemClick = (navItem: any) => {
        setActiveNavItem(navItem);
        setIsNavbarOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-lg fixed-top navbarScroll bg-white">
            <div className="container">
                <a className="navbar-brand navbarpadDiv navbarDiv" onClick={() => navigate('/body')}><img src={Logo} alt="logo" className="custom-img-width"></img></a>
                <button className="navbar-toggler" type="button" onClick={handleNavbarToggle}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav ms-auto">
                        <li className={`nav-item custom-nav-item-hover ${activeNavItem === 'body' ? 'active' : (activeNavItem === 'null' || activeNavItem === '' ? 'active' : '')}`}>
                            <a className="nav-link navfontDiv" onClick={() => { navigate('/body'); handleNavItemClick('body'); }}>Home</a>
                        </li>
                        <li className={`nav-item custom-nav-item-hover ${activeNavItem === 'about' ? 'active' : ''}`}>
                            <a className="nav-link navfontDiv" onClick={() => { navigate('/about'); handleNavItemClick('about'); }}>About</a>
                        </li>
                        <li className={`nav-item custom-nav-item-hover ${activeNavItem === 'apartments' ? 'active' : ''}`}>
                            <a className="nav-link navfontDiv" onClick={() => { navigate('/apartments'); handleNavItemClick('apartments'); }}>Apartments</a>
                        </li>
                        <li className={`nav-item custom-nav-item-hover ${activeNavItem === 'contactus' ? 'active' : ''}`}>
                            <a className="nav-link navfontDiv" onClick={() => { navigate('/contactus'); handleNavItemClick('contactus'); }}>Contact</a>
                        </li>
                    </ul>
                    <div className="px-2">
                    <button type="button" className="btn btn-secondary" onClick={() => { navigate('/login') }}>Login</button>
                        {/* <i className="bi bi-person-circle" style={{ color: '#000000' }}></i>{userData?.firstName} {userData?.lastName} */}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;
