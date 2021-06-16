import React from 'react';
import "../../../Styles/BookingSummary.scss";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AirlineSeatReclineExtraIcon from '@material-ui/icons/AirlineSeatReclineExtra';



interface EventBookingSummaryProps {
    origin: string;
    destination: string;
    departureTime: string;
    departureDate: string;
    price: number;
    code: string;
    eventClasses_availableNumberOfTickets: number;
    eventClasses_currency_iso: string;
}

const EventBookingSummary = ({ origin, destination, departureTime, departureDate, price, code, eventClasses_availableNumberOfTickets, eventClasses_currency_iso }: EventBookingSummaryProps) => {

    //format event prices 

    const eventTotalPrice: number = Number(price) | 0;


    return (
        <div className="booking-summary-container">
            <div className="booking-summary">
                <div className="product-details">
                    <h2><span><LocationOnIcon className="icon" style={{ fontSize: 18 }} /> From: </span>{origin} </h2>
                    <h2><span><LocationOnIcon className="icon" style={{ fontSize: 18 }} /> To: </span>{destination} </h2>

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
                    <div className="product-code">

                        <h3>Code: <span>{code}</span></h3>

                    </div>

                </div>
                <div className="product-extra">
                    <div className="product-price">
                        <h2>{

                            eventClasses_currency_iso + " " + price

                        }</h2>
                    </div>

                    <div className="booking-action">
                        <div className="numb-seat-left">
                            <p>   <AirlineSeatReclineExtraIcon className="company-icon-image" style={{ fontSize: 16 }} /> {eventClasses_availableNumberOfTickets} seat left</p>
                        </div>


                    </div>
                </div>


            </div>

        </div>
    )
}

export default EventBookingSummary
