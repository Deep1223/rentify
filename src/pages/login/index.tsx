import React, { startTransition, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../../styles/pages/_login.css';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'; // Importing additional icons

import LogIn from '../../images/login-img.png';
import GoogleImg from '../../images/google.svg';
import Logo from '../../images/logo.png';

interface FormData {
    id?: any;
    email: string;
    password: string;
    userTypeID: string;
    timestamp?: any;
    errors?: { [key: string]: string };
}

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        userTypeID: ''
    });

    const handleNavigation = (path: string) => {
        startTransition(() => {
            navigate(path);
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5001/login", formData);
            console.log(response.data);

            if (response.data) {
                if(response.data.userType === 1){
                    navigate('/seller', { state: { user: response.data } });
                }
                else {
                    navigate('/buyer', { state: { user: response.data } });
                }
            } else {
                console.log('Invalid credentials');
            }

        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let parsedValue: string | number;
        parsedValue = value;
        setFormData({ ...formData, [name]: parsedValue });
    };

    return (
        <div className="container-fluid">
            <div className="row vh-100 g-0 align-items-center">
                <div className="col-lg-8 d-none d-lg-block">
                    <img src={LogIn} alt="Login Image" className="img-fluid" />
                </div>

                <div className="col-lg-4 d-flex align-items-center justify-content-center">
                    <div className="col-sm-8">
                        {/* Logo */}
                        <a href="javascript:void(0)" onClick={() => handleNavigation('/carrent')} className="d-flex justify-content-center">
                            <img src={Logo} alt="logo" className='logoimg' />
                        </a>
                        {/* / Logo */}

                        <div className="text-center md-s">
                            <div className="fw-bold">Sign In</div>
                            <div className="text-secondary">Get access to your account</div>
                        </div>

                        {/* Social login */}
                        <button className="btn btn-lg btn-outline-secondary w-100 mb-3 btn-outline-custom">
                            <img src={GoogleImg} alt="google" className="login-google-img me-2 fs-6" />Login with Google
                        </button>
                        {/* / Social login */}

                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <input
                                    type="email"
                                    className="form-control form-control-lg fs-6"
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-select"
                                    name="userTypeID"
                                    value={formData.userTypeID}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select User Type</option>
                                    <option value="1">Seller</option>
                                    <option value="2">Buyer</option>
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <input
                                    type="password"
                                    className="form-control form-control-lg fs-6"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group mb-3 d-flex justify-content-between">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="formCheck" />
                                    <label htmlFor="formCheck" className="form-check-label text-secondary">
                                        <small>Remember Me</small>
                                    </label>
                                </div>
                                <div>
                                    <small><a href="javascript:void(0)">Forgot Password?</a></small>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg w-100">Sign In</button>
                        </form>

                        <div className="text-center">
                            <small>Don't have an account?
                                <a href="javascript:void(0)" onClick={() => handleNavigation('/register')} className="fw-bold">Sign Up</a>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
