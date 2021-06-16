import React from 'react';
import '../../../Styles/ProductCardBooking.scss';
import BussIcon from '../../Assets/bus-png-30677.png';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AirlineSeatReclineExtraIcon from '@material-ui/icons/AirlineSeatReclineExtra';
import LocationOnIcon from '@material-ui/icons/LocationOn';

interface propsProductCard {
    comapnys_details_data_name?: string;

}

const ProductCardBooking = ({ comapnys_details_data_name }: propsProductCard) => {

    return (
        <div className="product-card">
            <div className="product-card-container">
                <div className="company-name-icon">
                    <div className="company-icon">
                        {/* <img src={BussIcon} alt="buss_icon" /> */}
                        <DirectionsBusIcon className="company-icon-image" style={{ fontSize: 100 }} />
                    </div>
                    <div className="company-name">
                        <h3>{comapnys_details_data_name}</h3>
                    </div>
                </div>
                <div className="product-details-date">
                    <div className="product-details">
                        <h2><span><LocationOnIcon className="icon" style={{ fontSize: 18 }} /> From: </span>Nairobi </h2>
                        <h2><span><LocationOnIcon className="icon" style={{ fontSize: 18 }} /> To: </span>Nairobi </h2>

                    </div>
                    <div className="product-dates">
                        <div className="departure-time">

                            <h2><span className="icon"><QueryBuilderIcon className="company-icon-image" style={{ fontSize: 18 }} /></span> Departure Time </h2>
                            <h3>03:00pm</h3>
                        </div>
                        <div className="departure-date">

                            <h2><span className="icon"><EventAvailableIcon className="company-icon-image" style={{ fontSize: 18 }} /></span> Departure Date</h2>
                            <h3>03/26/2021</h3>
                        </div>

                    </div>
                </div>
                <div className="product-extra">
                    <div className="product-price">
                        <h2>R895</h2>
                    </div>
                    <div className="product-code">
                        <h3>CPB253648</h3>
                    </div>
                    <div className="booking-action">
                        <div className="numb-seat-left">
                            <p>   <AirlineSeatReclineExtraIcon className="company-icon-image" style={{ fontSize: 16 }} /> 450 seat left</p>
                        </div>
                        <div className="btn-booking">
                            <button className="btn-book-now"> Book Now </button>
                        </div>



                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductCardBooking
