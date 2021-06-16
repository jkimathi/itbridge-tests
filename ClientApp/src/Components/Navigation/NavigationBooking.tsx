import React from 'react';
import "../../Styles/NavigationBooking.scss";


import { Link } from 'react-router-dom';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import Footer from '../Footer/Footer';

interface INavigationBookingProps {
    companyUrl?: string;
}
const NavigationBooking = ({ companyUrl }: INavigationBookingProps) => {
    return (
        <div className="navigation-booking">
            <ul>
                <li>
                    <Link to={`/${companyUrl}`}>Home</Link>
                </li>
                <li> <Link to="/login">English</Link></li>
                <li> <Link to="/signup">ZAR</Link></li>
                <li> <Link to="#">Help</Link></li>
            </ul>



        </div>
    )
}

export default NavigationBooking

