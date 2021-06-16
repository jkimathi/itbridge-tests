import React, { useState, useEffect } from 'react';
import '../../Styles/EventBooking.scss';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import Footer from '../Footer/Footer';
import NavigationBooking from '../Navigation/NavigationBooking';
import { useForm } from "react-hook-form";
import { animateScroll as scroll } from 'react-scroll';
import EventBookingSummary from './EventBookingSummary/EventBookingSummary';
import ILanguages from '../../Types/ILanguages';
import ICountries from '../../Types/ICountries';
import IGenders from '../../Types/IGenders';
import axiosInstance from '../../Api/Api';
import { IUserTitles } from '../../Types/IUserTitles';
import IBookedSeats from '../../Types/IBookedSeats';

import { Link } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import INewBooking from '../../Types/INewBooking';
import IPaymentOptionsList from '../../Types/IPaymentOptionsList';
import IPaymentField from '../../Types/IPaymentField';
import IEventsClasses from '../../Types/IEventClasses';



const EventBooking = (props: any) => {
    const [isBookingInProgress, SetIsBookingInProgress] = useState(false);
    const [isLoadingCompleted, SetIsLoadingCompleted] = useState(false);
    const [stateLanguages, setStateLanguages] = useState<ILanguages[]>([]);
    const [stateUserTitles, setStateUserTitles] = useState<IUserTitles[]>([]);
    const [stateSelectedLanguages, setStateSelectedLanguages] = useState<ILanguages[]>([]);
    const [statePaymentMethods, setStatePaymentMethods] = useState<IPaymentField>();
    const [stateBookedSeats, setStateBookedSeats] = useState<IBookedSeats[]>([]);
    const [stateCountries, setStateCountries] = useState<ICountries[]>([]);
    const [stateGenders, setStateGenders] = useState<IGenders[]>([]);
    const [stateCountryCode, setStateCountryCode] = useState("");
    const [stateLanguageId, setStateLanguageId] = useState("");

    //number of bus seats
    const startBusLayout = 0;
    const [stateBussLayoutMidle, SetStateBussLayoutMidle] = useState(1);
    const [stateBussLayoutWithWtoRow, SetStateBussLayoutWithWtoRow] = useState(false);

    const [resultCreateBookingError, SetresultCreateBookingError] = useState(false);
    const [isBookingSubmitted, SetIsBookingSubmitted] = useState(false);
    const [stateBookingVoucher, SetstateBookingVoucher] = useState("");
    const [stateBookingVoucherSeatNumber, SetstateBookingVoucherSeatNumber] = useState(0);
    const [stateBookingVoucherCustomerName, SetstateBookingVoucherCustomerName] = useState("");

    const companyUrl: string = props.match.params.companyLink;
    const eventClasses_eventClassID: string = props.match.params.eventClasses_eventClassID;


    /// booking Detail

    const [stateCustomerBookingDetail, SetCustomerBooking] = useState<IEventsClasses>();


    const { register, handleSubmit, errors } = useForm<INewBooking>({
        mode: "onBlur"
    });
    const email_pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const events = JSON.parse(sessionStorage.getItem('events') || '{}');

    //format event prices 
    const eventPrice: number = Number(stateCustomerBookingDetail?.eventClasses_price) | 0;
    const eventServiceFee: number = Number(stateCustomerBookingDetail?.eventClasses_serviceFees) | 0;
    const eventTotalPrice: number = Number(stateCustomerBookingDetail?.eventClasses_totalPrice) | 0;



    //retrive selected seat
    const handleSelectedSeat = (event: React.MouseEvent<HTMLInputElement>, seatNumber: number) => {

        SetstateBookingVoucherSeatNumber(seatNumber);

    };



    const onSubmit = (data: INewBooking) => {

        SetIsBookingInProgress(true);


        scroll.scrollToTop();
        let formData = new FormData();


        formData.append("Name", data.Name);
        formData.append("Surname", data.Surname);
        formData.append("IdNumber", data.IdNumber);
        formData.append("Phonenumber", data.Phonenumber);
        formData.append("Email", data.Email);
        formData.append("GenderID", String(data.GenderID));
        formData.append("DateOfBirth", data.DateOfBirth);
        formData.append("TitleID", String(data.TitleID));
        formData.append("EventClassID", eventClasses_eventClassID);
        formData.append("TicketCode", data.TicketCode);
        formData.append("LanguageID", String(data.LanguageID));
        formData.append("CountryID", String(data.CountryID));

        const customerFullName = `${data.Name} ${data.Surname}`;


        axiosInstance
            .post("auth/booking", formData)
            .then((response) => {

                if (response.status === 201 && response.data.voucher) {
                    SetIsBookingInProgress(false);
                    SetIsBookingSubmitted(true);
                    SetstateBookingVoucher(response.data.voucher);
                    SetstateBookingVoucherCustomerName(customerFullName);

                } else {

                    SetIsBookingInProgress(false);
                    SetresultCreateBookingError(true);
                }

            })
            .catch((error) => {

                SetIsBookingInProgress(false);
                SetresultCreateBookingError(true);

            });


    }

    //compute bus layout
    const computeBusLayout = (nummberOfSeats: number) => {
        if (nummberOfSeats >= 4) {
            try {
                const midle = Math.round(nummberOfSeats / 2);
                SetStateBussLayoutMidle(midle);
                SetStateBussLayoutWithWtoRow(true);
            } catch (error) {
                //
            }
        }
    };

    useEffect(() => {


        try {
            const getCustomerBookingDetail = events.find((x: { eventClasses_eventClassID: string; }) => x.eventClasses_eventClassID === eventClasses_eventClassID)
            SetCustomerBooking(getCustomerBookingDetail);  /// set a customer Detail


        }
        catch (error) {
            props.history.push(`/${companyUrl}`);

        }




        axiosInstance
            .get("/auth/countries")
            .then((response) => {

                setStateCountries(response.data.countries);

                axiosInstance
                    .get(`/auth/languages`)
                    .then((response) => {
                        setStateLanguages(response.data.languages);
                    })
                    .catch((error) => {

                    });

            })
            .catch((error) => {

            });

        axiosInstance
            .get(`/auth/booked/seats/${eventClasses_eventClassID}`)
            .then((response) => {

                //parse response to json object
                const fieldJson: IPaymentField = JSON.parse(response.data.payment_methods[0].fields);
                setStatePaymentMethods(fieldJson);


                if (response.data.booked_seats.length) {

                    setStateBookedSeats(response.data.booked_seats);

                    SetIsLoadingCompleted(true);

                    computeBusLayout(response.data.booked_seats.length);

                }
            })
            .catch((error) => {

            });



    }, []);




    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {


        let countryID = Number(e.target.value);
        let languageId = stateLanguageId;

        setStateSelectedLanguages(stateLanguages);

        const selectedCountries = stateCountries.filter(country => country.countryID == countryID);

        setStateCountryCode(selectedCountries[0].phonenumberCode);
        const selectedLanguageId = Number(selectedCountries[0].languageID);
        const countryLanguageSelected = stateLanguages.filter(language => language.languageID == selectedLanguageId);

        setStateSelectedLanguages(countryLanguageSelected);


        axiosInstance
            .get(`/auth/genders/${selectedLanguageId}`)
            .then((response) => {


                setStateGenders(response.data.genders);

            })
            .catch((error) => {

            });

        axiosInstance
            .get(`/auth/titles/${selectedLanguageId}`)
            .then((response) => {

                setStateUserTitles(response.data.list)
            })
            .catch((error) => {

            });

    }

    const listLanguages = stateSelectedLanguages.map((language, languageID) => {
        return (
            <>

                <option key={languageID} value={language.languageID} selected>
                    {language.name}
                </option>
            </>
        )

    });


    //list countries
    const listCountries = stateCountries.map((country, countryID) => {

        return (
            <>

                <option key={countryID} value={country.countryID}>
                    {country.name}
                </option>
            </>
        )

    });

    //list genders
    const listGenders = stateGenders.map((gender, countryID) => {

        return (
            <>

                <option key={countryID} value={gender.genderID}>
                    {gender.name}
                </option>
            </>
        )

    });
    //lis title
    const listTitles = stateUserTitles.map((title, keyID) => {
        return (
            <>
                <option key={keyID} value={title.titleID}>
                    {title.name}
                </option>
            </>
        )
    });




    let dataBusLayoutRight;
    let dataBusLayout;
    if (stateBussLayoutWithWtoRow) {
        dataBusLayout = stateBookedSeats.slice(startBusLayout, stateBussLayoutMidle).map((seat) => {


            if (seat.isReserved && seat.isBooked && seat.isCheckedIn) {
                return (

                    <label className="container">
                        <input className="seat"

                            type="radio" value={seat.seatNumber} name="TicketCode" ref={register({ required: true })} disabled />
                        <span className="checkmark">
                            <span className="tooltipSeatDetails">
                                {`Seat: ${seat.seatNumber} is already booked`}</span>
                        </span>
                    </label>
                )
            }
            else if (seat.isBooked && seat.isReserved) {
                return (
                    <label className="container">
                        <input className="seat" type="radio" value={seat.seatNumber} name="TicketCode" ref={register({ required: true })} disabled />
                        <span className="checkmark">
                            <span className="tooltipSeatDetails">
                                {`Seat: ${seat.seatNumber} is already booked`}</span>
                        </span>
                    </label>
                )
            }
            else if (seat.isReserved) {
                return (
                    <label className="container-reserved">
                        <input className="seat" type="radio" value={seat.seatNumber} name="TicketCode" ref={register({ required: true })} disabled />
                        <span className="checkmark checkmark-reserved">
                            <span className="seat-number">
                                {seat.seatNumber}

                            </span>
                            <span className="tooltipSeatDetails">
                                {`Seat: ${seat.seatNumber} is reserved`}</span>
                        </span>
                    </label>
                )
            }
            else {

                return (
                    <label className="container">
                        <input
                            onClick={(event) => handleSelectedSeat(event, seat.seatNumber)}
                            className="seat" type="radio" value={seat.seatNumber}
                            name="TicketCode" ref={register({ required: true })} />
                        <span className="checkmark">
                            <span className="seat-number">
                                {seat.seatNumber}

                            </span>
                            <span className="tooltipSeatDetails">
                                {`Seat: ${seat.seatNumber} is available`}</span>
                        </span>
                    </label>
                )
            }
        });


        dataBusLayoutRight = stateBookedSeats.slice(stateBussLayoutMidle).map((seat) => {

            if (seat.isReserved && seat.isBooked && seat.isCheckedIn) {
                return (

                    <label className="container">
                        <input className="seat" type="radio" value={seat.seatNumber} name="TicketCode" ref={register({ required: true })} disabled />
                        <span className="checkmark">
                            <span className="tooltipSeatDetails">
                                {`Seat: ${seat.seatNumber} is already booked`}</span>
                        </span>
                    </label>
                )
            }
            else if (seat.isBooked && seat.isReserved) {
                return (
                    <label className="container">
                        <input className="seat" type="radio" value={seat.seatNumber} name="TicketCode" ref={register({ required: true })} disabled />
                        <span className="checkmark">
                            <span className="tooltipSeatDetails">
                                {`Seat: ${seat.seatNumber} is already booked`}</span>
                        </span>
                    </label>
                )
            }
            else if (seat.isReserved) {
                return (
                    <label className="container-reserved">
                        <input className="seat" type="radio" value={seat.seatNumber} name="TicketCode" ref={register({ required: true })} disabled />
                        <span className="checkmark checkmark-reserved">
                            <span className="seat-number">
                                {seat.seatNumber}

                            </span>
                            <span className="tooltipSeatDetails">
                                {`Seat: ${seat.seatNumber} is reserved`}</span>
                        </span>
                    </label>
                )
            }
            else {

                return (
                    <label className="container">
                        <input
                            onClick={(event) => handleSelectedSeat(event, seat.seatNumber)}
                            className="seat" type="radio" value={seat.seatNumber}
                            name="TicketCode" ref={register({ required: true })} />
                        <span className="checkmark">
                            <span className="seat-number">
                                {seat.seatNumber}

                            </span>
                            <span className="tooltipSeatDetails">
                                {`Seat: ${seat.seatNumber} is available`}</span>
                        </span>
                    </label>
                )
            }
        });

    } else {
        dataBusLayout = stateBookedSeats.map((seat) => {


            if (seat.isReserved && seat.isBooked && seat.isCheckedIn) {
                return (

                    <label className="container">
                        <input className="seat" type="radio" value={seat.seatNumber} name="TicketCode" ref={register({ required: true })} disabled />
                        <span className="checkmark">
                            <span className="tooltipSeatDetails">
                                {`Seat: ${seat.seatNumber} is already booked`}</span>
                        </span>
                    </label>
                )
            }
            else if (seat.isBooked && seat.isReserved) {
                return (
                    <label className="container">
                        <input className="seat" type="radio" value={seat.seatNumber} name="TicketCode" ref={register({ required: true })} disabled />
                        <span className="checkmark">
                            <span className="tooltipSeatDetails">
                                {`Seat: ${seat.seatNumber} is already booked`}</span>
                        </span>
                    </label>
                )
            }
            else if (seat.isReserved) {
                return (
                    <label className="container-reserved">
                        <input className="seat" type="radio" value={seat.seatNumber} name="TicketCode" ref={register({ required: true })} disabled />
                        <span className="checkmark checkmark-reserved">
                            <span className="seat-number">
                                {seat.seatNumber}

                            </span>
                            <span className="tooltipSeatDetails">
                                {`Seat: ${seat.seatNumber} is reserved`}</span>
                        </span>
                    </label>
                )
            }
            else {

                return (
                    <label className="container">
                        <input
                            onClick={(event) => handleSelectedSeat(event, seat.seatNumber)}
                            className="seat" type="radio" value={seat.seatNumber}
                            name="TicketCode" ref={register({ required: true })} />
                        <span className="checkmark">
                            <span className="seat-number">
                                {seat.seatNumber}

                            </span>
                            <span className="tooltipSeatDetails">
                                {`Seat: ${seat.seatNumber} is available`}</span>
                        </span>
                    </label>
                )
            }
        });


    }







    return (
        <>
            <NavigationBooking
                companyUrl={companyUrl}
            />
            <div className="customer-booking-container">
                <div className="booking-page-title">
                    <h2>Ticket Booking</h2>
                </div>
                {isBookingSubmitted
                    ?
                    <div className="booking-confirmation-container">
                        <div className="booking-confirmation-content">
                            <h2>Thank you for booking with us!</h2>
                            <p>Dear {stateBookingVoucherCustomerName}, make sure you make note of your voucher number, which is <span className="booking-voucher">{stateBookingVoucher}</span>. You will be receiving an email shortly with confirmation of your booking.</p>
                            <p>Make sure you make a payment  within 24 hours with the payment details provided  to secure your seat <span className="seat-number">(Seat number: {stateBookingVoucherSeatNumber})</span>. </p>


                            <div className="user-action-booking">
                                <div className="back-to-home-page">
                                    <Link to={`/${companyUrl}`} className="btn-action">Back to Homepage</Link>
                                </div>
                                <div className="confirm-payment">
                                    <Link to="/portal/payment" className="btn-action">Confirm payment</Link>
                                </div>


                            </div>
                        </div>

                    </div>
                    :
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="booking-form-trip-details">
                            <div className="booking-form">
                                {
                                    resultCreateBookingError && <div className="customer-booking-alert">
                                        <p>There was a problem while processing your request. Please try again.</p>
                                    </div>
                                }

                                {isBookingInProgress &&
                                    <div className="loader-icon-create-booking">

                                        <GridLoader size={15} margin="2" color="#0078d4" />
                                    </div>

                                }

                                <div className="form-content">

                                    <div className="form-left">
                                        <div className="form-control">
                                            <input type="text" name="Name" ref={register({ required: true })}
                                                disabled={isBookingInProgress}
                                            />
                                            <span className="highlight"></span>
                                            <span className="input-undeline"></span>
                                            <label>Name</label>
                                            {errors.Name && <span className="required-field">Please provide a valid name</span>}
                                        </div>
                                        <div className="form-control">
                                            <input type="text" name="Surname" ref={register({ required: true })}
                                                disabled={isBookingInProgress} />
                                            <span className="highlight"></span>
                                            <span className="input-undeline"></span>
                                            <label>Surname</label>
                                            {errors.Surname && <span className="required-field">Please provide a valid surname</span>}
                                        </div>
                                        <div className="form-control">
                                            <input type="text" name="IdNumber" ref={register({ required: true })}
                                                disabled={isBookingInProgress} />
                                            <span className="highlight"></span>
                                            <span className="input-undeline"></span>
                                            <label>Id Number</label>
                                            {errors.IdNumber && <span className="required-field">Please provide a valid id number</span>}
                                        </div>
                                        <div className="form-control">
                                            <input type="date" name="DateOfBirth" ref={register({ required: true })}
                                                disabled={isBookingInProgress} />
                                            <span className="highlight"></span>
                                            <span className="input-undeline"></span>
                                            <label>Date Of Birth</label>
                                            {errors.DateOfBirth && <span className="required-field">Please provide a valid date</span>}
                                        </div>

                                        <div className="form-control">
                                            <input type="text" name="Phonenumber" ref={register({ required: true })}
                                                disabled={isBookingInProgress} />
                                            <span className="highlight"></span>
                                            <span className="input-undeline"></span>
                                            <label>Phone number</label>
                                            {errors.Phonenumber && <span className="required-field">Please provide a valid phone number</span>}
                                        </div>

                                    </div>
                                    <div className="form-right">
                                        <div className="form-control">
                                            <input type="text" name="Email"
                                                ref={register({ required: true, pattern: email_pattern })}
                                                disabled={isBookingInProgress} />
                                            <span className="highlight"></span>
                                            <span className="input-undeline"></span>
                                            <label>Email</label>
                                            {errors.Email && <span className="required-field">Please provide a valid email</span>}
                                        </div>

                                        <div className="form-control">
                                            <select name="CountryID" ref={register({ required: true })}
                                                disabled={isBookingInProgress}
                                                onChange={(event) => handleCountryChange(event)}>
                                                <option></option>
                                                {listCountries}
                                            </select>
                                            {/* <input type="text" name="countryID" ref={register({ required: true })}
                                disabled={isSignUpInProgress} /> */}
                                            <div className="input-undeline"></div>
                                            <label>Country</label>
                                            {errors.CountryID && <span className="required-field">Please provide a valid country</span>}
                                        </div>
                                        <div className="form-control">


                                            <select name="LanguageID" ref={register({ required: true })}
                                                disabled={isBookingInProgress} >
                                                {/* <option></option> */}
                                                {
                                                    listLanguages
                                                }
                                            </select>
                                            {/* <input type="text" name="languageID" ref={register({ required: true })}
disabled={isSignUpInProgress} /> */}
                                            <div className="input-undeline"></div>
                                            <label>Language</label>
                                            {errors.LanguageID && <span className="required-field">Please provide a valid language</span>}
                                        </div>


                                        <div className="form-control">
                                            <select name="GenderID" ref={register({ required: true })}
                                                disabled={isBookingInProgress}>
                                                <option></option>
                                                {listGenders}
                                            </select>

                                            <div className="input-undeline"></div>
                                            <label>Gender</label>
                                            {errors.GenderID && <span className="required-field">Please provide a valid gender</span>}
                                        </div>





                                        <div className="form-control">
                                            <select name="TitleID" ref={register({ required: true })}
                                                disabled={isBookingInProgress}>
                                                <option value=""></option>
                                                {listTitles}
                                            </select>
                                            {/* <input type="text" name="TitleID" ref={register({ required: true })} /> */}
                                            <span className="highlight"></span>
                                            <span className="input-undeline"></span>
                                            <label>Title</label>
                                            {errors.TitleID && <span className="required-field">Please provide a valid title</span>}
                                        </div>


                                    </div>

                                </div>









                            </div>
                            <div className="trip-details">
                                <h2 className="header-trip-details">Selected trip - summary</h2>

                                <EventBookingSummary

                                    origin={stateCustomerBookingDetail?.eventClasses_fromPlaceName!}
                                    destination={stateCustomerBookingDetail?.eventClasses_toPlaceName!}
                                    departureTime={stateCustomerBookingDetail?.event_fromHours!}
                                    departureDate={stateCustomerBookingDetail?.event_fromDate!}
                                    price={stateCustomerBookingDetail?.eventClasses_totalPrice!}
                                    eventClasses_currency_iso={stateCustomerBookingDetail?.eventClasses_currency_iso!}
                                    code={stateCustomerBookingDetail?.eventClasses_code!}
                                    eventClasses_availableNumberOfTickets={stateCustomerBookingDetail?.eventClasses_availableNumberOfTickets!}
                                />

                            </div>

                        </div>

                        <div className="seat-select-payment-options-btn-container">
                            <div className="seat-select-payment-options">
                                <div className="seat-selection">
                                    {/* <BusLayout /> */}
                                    <div className="bus-layout-container">
                                        <div className="bus-layout" >
                                            <h2>Select your seat</h2>

                                            {errors.TicketCode && <span className="required-field">Please provide a valid seat</span>}

                                            <div className="bus">
                                                {/* <div className="driver-section">
                                            <h2>Driver</h2>
                                        </div> */}
                                                <div className="legend-section">
                                                    <div className="legend-booked">
                                                        <div className="legend-text">
                                                            <h3>Booked</h3>

                                                        </div>
                                                        <div className="legend-icon">
                                                            <span className="checkmark"></span>
                                                        </div>

                                                    </div>
                                                    <div className="legend-reserved">
                                                        <div className="legend-text">
                                                            <h3>Reserved</h3>
                                                        </div>
                                                        <div className="legend-icon">

                                                        </div>
                                                    </div>
                                                    <div className="legend-available">
                                                        <div className="legend-text">
                                                            <h3>Available</h3>
                                                        </div>
                                                        <div className="legend-icon">

                                                        </div>
                                                    </div>
                                                </div>
                                                <div

                                                    className={`passenger-section ${isBookingInProgress ? 'passenger-section-disabled' : ''}`}

                                                >

                                                    <div className="bus-row-seats">
                                                        <div className="bus-seats" id="group1" >

                                                            <div className="row-left" >

                                                                {dataBusLayout}


                                                            </div>
                                                            <div className="middle-space">
                                                                <h3>
                                                                    <span>Exit</span>
                                                                </h3>

                                                            </div>
                                                            <div className="row-right">

                                                                {dataBusLayoutRight}

                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                    </div >


                                </div>

                                <div className="trip-fare-summary">
                                    <h2 className="trip-fare-summary-header">Trip fare summary</h2>
                                    <div className="trip-fare-summary-details">

                                        {
                                            stateBookingVoucherSeatNumber >= 1 &&
                                            <div className="selected-seat">
                                                <div className="selected-seat-text">
                                                    <h3>Selected seat:</h3>

                                                </div>
                                                <div className="selected-seat-value">
                                                    <h3> {stateBookingVoucherSeatNumber}</h3>
                                                </div>
                                            </div>
                                        }

                                        <div className="subtotal">
                                            <div className="subtotal-text">
                                                <h3>Subtotal</h3>

                                            </div>
                                            <div className="subtotal-value">
                                                <h3>{




                                                    stateCustomerBookingDetail?.eventClasses_currency_iso + " " + eventPrice

                                                }</h3>
                                            </div>


                                        </div>
                                        <div className="fees">
                                            <div className="fees-text">
                                                <h3>Fees</h3>

                                            </div>
                                            <div className="fees-value">
                                                <h3>{



                                                    stateCustomerBookingDetail?.eventClasses_currency_iso + " " + eventServiceFee


                                                }</h3>
                                            </div>


                                        </div>

                                        <div className="taxes">
                                            <div className="taxes-text">
                                                <h3>Taxes</h3>

                                            </div>
                                            <div className="taxes-value">
                                                <h3>{


                                                    stateCustomerBookingDetail?.eventClasses_currency_iso + " " + 0

                                                }</h3>
                                            </div>


                                        </div>

                                        <div className="total">
                                            <div className="total-text">
                                                <h3>Total</h3>
                                                <h4>Taxes & fees included </h4>


                                            </div>
                                            <div className="total-value">
                                                <h3>{


                                                    stateCustomerBookingDetail?.eventClasses_currency_iso + " " + eventTotalPrice


                                                }</h3>
                                            </div>


                                        </div>


                                    </div>




                                </div>
                                <div className="payment-options">
                                    <h2> Payment Methods</h2>

                                    {
                                        statePaymentMethods ?

                                            statePaymentMethods.paymentMethodName ?
                                                <h3>Payment method: <span>{statePaymentMethods.paymentMethodName}</span></h3>
                                                :
                                                ""
                                            :
                                            ""
                                    }



                                    {
                                        statePaymentMethods ?

                                            statePaymentMethods.bankName ?
                                                <h3>Bank Name: <span>{statePaymentMethods.bankName}</span></h3>
                                                :
                                                ""
                                            :
                                            ""
                                    }











                                    {
                                        statePaymentMethods ?

                                            statePaymentMethods.branchCode ?
                                                <h3>Branch Code: <span>{statePaymentMethods.branchCode}</span></h3>
                                                :
                                                ""
                                            :
                                            ""
                                    }
                                    {
                                        statePaymentMethods ?

                                            statePaymentMethods.accountNumber ?
                                                <h3>Bank Account Number: <span>{statePaymentMethods.accountNumber}</span></h3>
                                                :
                                                ""
                                            :
                                            ""
                                    }


                                    {
                                        statePaymentMethods ?

                                            statePaymentMethods.phoneNumber ?
                                                <h3>Mobile payment: <span>{statePaymentMethods.phoneNumber}</span></h3>
                                                :
                                                ""
                                            :
                                            ""
                                    }





                                    {
                                        statePaymentMethods ?

                                            statePaymentMethods.cardName ?
                                                <h3>Card Name: <span>{statePaymentMethods.cardName}</span></h3>
                                                :
                                                ""
                                            :
                                            ""
                                    }
                                    {
                                        statePaymentMethods ?

                                            statePaymentMethods.cardNumber ?
                                                <h3>Card Number: <span>{statePaymentMethods.cardNumber}</span></h3>
                                                :
                                                ""
                                            :
                                            ""
                                    }



                                </div>

                            </div>


                            {!isBookingInProgress &&
                                <div className="container-btn-book">
                                    <button className="btn-auth" type="submit">Book ticket</button>
                                </div>

                            }


                        </div>

                    </form>

                }

            </div>
            <BackToTopButton />
            <Footer />
        </>

    )
}

export default EventBooking


