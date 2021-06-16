import React from 'react';
import '../../../Styles/ResultCard.scss';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AirlineSeatReclineExtraIcon from '@material-ui/icons/AirlineSeatReclineExtra';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from 'react-router-dom';
import IResultCardProps from '../../../Types/IResultCardProps';







const ResultCard = ({ fromPlaceName, toPlaceName, departureTime, departureDate, eventPrice,
    eventClasses_availableNumberOfTickets, eventClasses_code, eventClasses_totalPrice, eventClasses_eventClassID, company_name, company_imagesLink, company_websiteUrlLink }: IResultCardProps) => {

    const app_image_url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`;



    return (
        <div className="product-card">
            <div className="product-card-container">
                <div className="company-name-icon">
                    <div className="company-icon">

                        <img src={`${app_image_url}${company_imagesLink}`} alt="Company log" />
                        {/* <img src={`${FULL_IMAGE_URL_PATH}${company_imagesLink}`} alt="" /> */}

                    </div>
                    <div className="company-name">

                        <Link to={`/${company_websiteUrlLink}`} >
                            <h3>{company_name}</h3>
                        </Link>
                    </div>
                </div>
                <div className="product-details-date">
                    <div className="product-details">
                        <h2><span><LocationOnIcon className="icon" style={{ fontSize: 18 }} /> From: </span>{fromPlaceName} </h2>
                        <h2><span><LocationOnIcon className="icon" style={{ fontSize: 18 }} /> To: </span>{toPlaceName} </h2>

                    </div>
                    <div className="product-dates">
                        <div className="departure-time">

                            <h2><span className="icon"><QueryBuilderIcon className="company-icon-image" style={{ fontSize: 18 }} /></span> Departure Time </h2>
                            <h3>{departureTime}</h3>
                        </div>
                        <div className="departure-date">

                            <h2><span className="icon"><EventAvailableIcon className="company-icon-image" style={{ fontSize: 18 }} /></span> Departure Date</h2>
                            <h3>{departureDate}</h3>
                        </div>

                    </div>
                </div>
                <div className="product-extra">
                    <div className="product-price">
                        <h2>R{eventClasses_totalPrice}</h2>
                    </div>
                    <div className="product-code">
                        <h3>{eventClasses_code}</h3>
                    </div>
                    <div className="booking-action">


                        <div className="numb-seat-left">
                            {/* <p>   <AirlineSeatReclineExtraIcon className="company-icon-image" style={{ fontSize: 16 }} /> {eventClasses_availableNumberOfTickets} seat left</p>
                         */}

                            {
                                eventClasses_availableNumberOfTickets >= 1 ?
                                    <p>   <AirlineSeatReclineExtraIcon className="company-icon-image" style={{ fontSize: 16 }} /> <span className="seat-available">{eventClasses_availableNumberOfTickets} seat left</span></p>
                                    :
                                    <p>   <AirlineSeatReclineExtraIcon className="company-icon-image" style={{ fontSize: 16 }} />
                                        <span className="seat-fully-booked">{
                                            eventClasses_availableNumberOfTickets < 0 ?
                                                0
                                                :
                                                0
                                        } seat left</span></p>



                            }


                        </div>


                        <div className="btn-booking">


                            {/* <Link to={`/portal/booking/${company_websiteUrlLink}/${eventClasses_eventClassID}`} className="btn-book-now">
                                Book Now
                            </Link> */}


                            {
                                eventClasses_availableNumberOfTickets >= 1 ?
                                    <Link
                                        to={`/portal/booking/${company_websiteUrlLink}/${eventClasses_eventClassID}`}
                                        className="btn-book-now"
                                    >
                                        Book Now
                                    </Link>
                                    :
                                    <p>     <span className="seat-fully-booked"> Fully booked</span></p>



                            }
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default ResultCard

