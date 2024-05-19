import React from "react";
import { useNavigate } from "react-router-dom";

function Footer(): JSX.Element {
    const navigate = useNavigate();

    return (
        <footer className="footer bg-white py-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h4>Portfolio</h4>
                        <p className="footer-text">
                            Let's Build Something Amazing Together! Reach out to discuss your project 
                            and how we can bring your vision to life.
                        </p>
                    </div>
                    <div className="col-md-3">
                        <h4>Company</h4>
                        <p className="footer-text">
                            <a onClick={() => navigate('/')}>Home</a>
                        </p>
                        <p className="footer-text">
                            <a onClick={() => navigate('/about')}>About</a>
                        </p>
                        <p className="footer-text">
                            <a onClick={() => navigate('/portfolio')}>Portfolio</a>
                        </p>
                        <p className="footer-text">
                            <a onClick={() => navigate('/contactus')}>Contact</a>
                        </p>
                    </div>
                    <div className="col-md-3">
                        <h4>Contact</h4>
                        <p className="footer-text">
                            <i className="bi bi-house-door-fill"></i> Surat, Gujarat, India
                        </p>
                        <p className="footer-text">
                            <i className="bi bi-envelope-fill"></i> deep.k.dungarani@gmail.com
                        </p>
                        <p className="footer-text">
                            <i className="bi bi-telephone-fill"></i> +91 90160 65685
                        </p>
                    </div>
                    <div className="col-md-3">
                        <h4>Follow Us</h4>
                        <div className="d-flex social-links gap-3">
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-facebook" style={{color: '#000000'}}></i>
                            </a>
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-twitter" style={{color: '#000000'}}></i>
                            </a>
                            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-instagram" style={{color: '#000000'}}></i>
                            </a>
                            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-linkedin" style={{color: '#000000'}}></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center footer-text">© 2024 | Designed and Coded by Deep Dungarani</div>
        </footer>
    );
}

export default Footer;
