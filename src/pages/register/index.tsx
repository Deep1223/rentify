import React, { startTransition, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../../styles/pages/_login.css';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

import LogIn from '../../images/login-img.png';
import GoogleImg from '../../images/google.svg';
import Logo from '../../images/logo.png';

interface FormData {
    id?: any;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    userTypeID: string;
    userType?: string;
    timestamp?: any;
    errors?: { [key: string]: string };
}

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        userTypeID: '',
        userType: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 
        const { name, value } = e.target;
        let parsedValue: string | number;
            if (name === 'userTypeID') {
                parsedValue = value === '1' ? 'Seller' : 'Buyer';
                setFormData({ ...formData, userType: parsedValue, [name]: value });
            } else {
                parsedValue = value;
                setFormData({ ...formData, [name]: parsedValue });
            }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log(1);
            const response = await axios.post("http://localhost:5001/register", formData);
            console.log(response.data);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const handleNavigation = (path: string) => {
        startTransition(() => {
            navigate(path);
        });
    };

    return (
        <div className="container-fluid">
            <div className="row vh-100 g-0 align-items-center"> {/* Added align-items-center class here */}
                {/* Left Side */}
                <div className="col-lg-8 d-none d-lg-block">
                    <img src={LogIn} alt="Login Image" className="img-fluid" />
                </div>
                {/* / Left Side */}

                {/* Right Side */}
                <div className="col-lg-4 d-flex align-items-center justify-content-center">
                    <div className="col-sm-8"> {/* Adjust the width of the right side */}
                        {/* Logo */}
                        <a href="javascript:void(0)" onClick={() => handleNavigation('/carrent')} className="d-flex justify-content-center">
                            <img src={Logo} alt="logo" className='logoimg' />
                        </a>
                        {/* / Logo */}

                        <div className="text-center md-s">
                            <div className="fw-bold">Sign Up</div>
                            <div className="text-secondary">Get Create to your account</div>
                        </div>

                        {/* Divider */}
                        <div className="position-relative">
                            <hr className="text-secondary" />
                            <div className="divider-content-center">Or</div>
                        </div>
                        {/* / Divider */}

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <input
                                    type="text"
                                    className="form-control form-control-lg fs-6"
                                    placeholder="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <input
                                    type="text"
                                    className="form-control form-control-lg fs-6"
                                    placeholder="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
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
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faPhone} />
                                </span>
                                <input
                                    type="tel"
                                    className="form-control form-control-lg fs-6"
                                    placeholder="Phone Number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-select"
                                    id="userTypeID"
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
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <input
                                    type="password"
                                    className="form-control form-control-lg fs-6"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg w-100">Sign Up</button>
                        </form>
                        {/* / Form */}

                        <div className="text-center">
                            <small>Already have an account?
                                <a href="javascript:void(0)" onClick={() => handleNavigation('/login')} className="fw-bold">Sign In</a>
                            </small>
                        </div>
                    </div>

                </div>
            </div>
            {/* / Right Side */}
        </div>
    );
};

export default Register;
