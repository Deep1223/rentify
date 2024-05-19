import React from 'react';
import '../../styles/pages/_seller.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Seller = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state?.user;

    const handleLogout = async () => {
        try {
            const response = await axios.post("http://localhost:5001/logout", { userId: userData?.id });
            console.log(response.data);

            if (response.data) {
                navigate('/login');
            } else {
                console.log('Logout failed');
            }

        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className='custom-margin-70 py-3 px-5'>
            <p>{userData?.id}</p>
            <h2>Welcome, {userData?.firstName} {userData?.lastName} !</h2>
            <p>User Type: {userData?.userType}</p>
            <button type="button" className="btn btn-secondary" onClick={handleLogout}>Log Out</button>


            <div className='py-4'>
                <div className="container-fluid property-info-container">
                    <div className="row vh-100 g-0 align-items-center">
                        {/* Left Side */}
                        <div className="col-lg-8 d-none d-lg-block">
                            <img src="https://via.placeholder.com/800x600" alt="Property" className="img-fluid" />
                        </div>

                        {/* Right Side */}
                        <div className="col-lg-4 d-flex align-items-center justify-content-center">
                            <div className="col-sm-8">
                                <div className="property-info-text">
                                    <h2>Property Information</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis quae obcaecati doloribus distinctio, aliquam vero? Molestias, amet, eveniet.</p>
                                    <ul className="list-unstyled">
                                        <li><strong>Property Name:</strong> Marga Luxury Suite</li>
                                        <li><strong>Room:</strong> 2</li>
                                        <li><strong>Total Area:</strong> 482 Square Feets</li>
                                        <li><strong>Category:</strong> Modern House</li>
                                        <li><strong>Lunch Date:</strong> Jan 20, 2019</li>
                                    </ul>
                                    <button className="btn btn-primary">Get Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Seller;
