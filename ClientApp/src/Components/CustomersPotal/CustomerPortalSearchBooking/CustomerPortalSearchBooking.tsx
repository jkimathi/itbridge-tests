import { useState } from 'react';
import '../../../Styles/SearchBooking.scss';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import '../../../Styles/ProductCardBooking.scss';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AirlineSeatReclineExtraIcon from '@material-ui/icons/AirlineSeatReclineExtra';
import { Link } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import CustomerPortalSearchEventForm from './CustomerPortalSearchEventsForm/CustomerPortalSearchEventForm';
import ISearchEventClassesResults from '../../../Types/ISearchEventClassesResults';
import ISearchBookingProps from '../../../Types/ISearchBookingProps';






const CustomerPortalSearchBooking = ({ companys_events_data, comapnys_details_data_name, comapnys_details_data_url }: ISearchBookingProps) => {

    const [state_events_data, setState_events_data] = useState<ISearchEventClassesResults[]>([]);
    const [stateIsSearchInProgress, setStateIsSearchInProgress] = useState(false);
    const [stateIsSearchResultEmpty, setStateIsSearchResultEmpty] = useState(false);
    const listEventClasses = state_events_data.map((event, event_id) => {


        const app_image_url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`;



        return (
            <div className="product">
                <div className="product-card">
                    <div className="product-card-container">
                        <div className="company-name-icon">
                            <div className="company-icon">

                                <img src={`${app_image_url}${event.company_imagesLink}`} alt="Company log" />
                            </div>
                            <div className="company-name">
                                <h3>{comapnys_details_data_name}</h3>
                            </div>
                        </div>
                        <div className="product-details-date">
                            <div className="product-details">
                                <h2><span><LocationOnIcon className="icon" style={{ fontSize: 18 }} /> From: </span>{event.eventClasses_fromPlaceName} </h2>
                                <h2><span><LocationOnIcon className="icon" style={{ fontSize: 18 }} /> To: </span>{event.eventClasses_toPlaceName} </h2>

                            </div>
                            <div className="product-dates">
                                <div className="departure-time">



                                    <h2><span className="icon"><QueryBuilderIcon className="company-icon-image" style={{ fontSize: 18 }} /></span> Departure Time </h2>
                                    <h3>{event.event_fromHours}</h3>
                                </div>
                                <div className="departure-date">

                                    <h2><span className="icon"><EventAvailableIcon className="company-icon-image" style={{ fontSize: 18 }} /></span> Departure Date</h2>
                                    <h3>{event.event_fromDate}</h3>
                                </div>

                            </div>
                        </div>
                        <div className="product-extra">


                            <div className="product-price">
                                <h2>R{event.eventClasses_totalPrice}</h2>
                            </div>


                            <div className="product-code">
                                <h3>{event.event_code}</h3>
                            </div>
                            <div className="booking-action">
                                <div className="numb-seat-left">

                                    {
                                        event.eventClasses_availableNumberOfTickets >= 1 ?
                                            <p>   <AirlineSeatReclineExtraIcon className="company-icon-image" style={{ fontSize: 16 }} /> <span className="seat-available">{event.eventClasses_availableNumberOfTickets} seat left</span></p>
                                            :
                                            <p>   <AirlineSeatReclineExtraIcon className="company-icon-image" style={{ fontSize: 16 }} />
                                                <span className="seat-fully-booked">{
                                                    event.eventClasses_availableNumberOfTickets < 0 ?
                                                        0
                                                        :
                                                        0
                                                } seat left</span></p>



                                    }



                                </div>


                                <div className="btn-booking">


                                    {
                                        event.eventClasses_availableNumberOfTickets >= 1 ?
                                            <Link
                                                to={`/portal/booking/${comapnys_details_data_url}/${event.eventClasses_eventClassID}`}
                                                className="btn-book-now"
                                            >
                                                Select a seat
                                            </Link>
                                            :
                                            <p>     <span className="seat-fully-booked"> Fully booked</span></p>



                                    }
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )



    });


    return (
        <div className="search-booking">
            <h2 className="booking-section-title">Book your next trip</h2>


            <CustomerPortalSearchEventForm
                comapnys_details_data_url={comapnys_details_data_url}
                setState_events_data={setState_events_data}
                setStateIsSearchInProgress={setStateIsSearchInProgress}
                setStateIsSearchResultEmpty={setStateIsSearchResultEmpty}

            />


            {stateIsSearchInProgress
                ?
                <div className="loader-icon-search-event">

                    <GridLoader size={15} margin="2" color="#0078d4" />
                </div>

                :
                stateIsSearchResultEmpty
                    ?
                    <div className="search-result-not-found">
                        <div className="icon">
                            <DirectionsBusIcon className="company-icon-image" style={{ fontSize: 150 }} />

                        </div>
                        <div className="text">

                            <h2> Bus not found, please try again.</h2>
                        </div>
                    </div>
                    :
                    <div className="product-container">


                        {listEventClasses}



                    </div>

            }




        </div>
    )
}

export default CustomerPortalSearchBooking
