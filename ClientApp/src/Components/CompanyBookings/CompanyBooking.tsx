import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/CompanyBooking.scss';

import PublicIcon from '@material-ui/icons/Public';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PageviewIcon from '@material-ui/icons/Pageview';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ICompanyBookingCard from '../../Types/ICompanyBookingCard';
import AirlineSeatReclineExtraIcon from '@material-ui/icons/AirlineSeatReclineExtra';
import axiosInstance from '../../Api/Api';
import ICompanysBooking from '../../Types/ICompanysBooking';


interface IPropsCompanyBooking {
    booking_data: ICompanysBooking,
    refreshPage(): void
};



const CompanyBooking = (
    {


        booking_data,
        refreshPage


    }: IPropsCompanyBooking
    ,

) => {


    const MySwal = withReactContent(Swal);

    //process set booking
    const completeSeatBookingCheckin = (formData: FormData) => {
        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };




        axiosInstance
            .put("booking", formData, config)
            .then((response) => {

                if (response.data.results) {

                    MySwal.fire(
                        'Updated!',
                        'Seat successfully booked.',
                        'success'
                    )
                    refreshPage();

                } else {

                    MySwal.fire(
                        'Error!',
                        'Error please try again.',
                        'error'
                    )


                }





            })
            .catch((error) => {

            });





    };

    //book client seat
    const BookInCheckInSeat = (booking: boolean, checkingIn: boolean) => {



        let formData = new FormData();

        //FIXME: some event have a null payment method id
        const paymentMeth_id = booking_data.bookings_paymentMethodID | 1;



        formData.append("Name", booking_data.clients_name);
        formData.append("Surname", booking_data.clients_surname);
        formData.append("IdNumber", booking_data.clients_idNumber);
        formData.append("Phonenumber", booking_data.clients_phonenumber);
        formData.append("Email", booking_data.clients_email);
        formData.append("GenderID", String(booking_data.clients_genderID));
        formData.append("DateOfBirth", booking_data.clients_dateOfBirth);
        formData.append("TitleID", String(booking_data.clients_titleID));
        formData.append("TicketCode", String(booking_data.bookings_ticketCode));
        formData.append("EventClassID", booking_data.eventsClasses_eventClassID);
        formData.append("BookingID", booking_data.bookings_bookingID);
        formData.append("AmountPaid", String(booking_data.eventsClasses_price));
        formData.append("IsBooked", String(booking));
        formData.append("IsCheckedIn", String(checkingIn));
        formData.append("PaymentMethodID", String(paymentMeth_id));

        completeSeatBookingCheckin(formData);






    };



    //check in method
    const handleCompanyCheckIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        if (!booking_data.bookings_isBooked) {


            MySwal.fire(
                'CheckIn!',
                'Booking required before check-in.',
                'error'
            )


        } else if (booking_data.bookings_isCheckedIn) {


            MySwal.fire(
                'CheckIn!',
                'Customer already checked-in.',
                'info'
            )


        }
        else {

            MySwal.fire({
                title: 'Are you sure?',
                text: `You are about to checkin the following   customer ${booking_data.clients_name + " " + booking_data.clients_surname} . You won't be able to revert this!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Checkin !',
                allowOutsideClick: false


            }).then((result) => {
                if (result.isConfirmed) {

                    BookInCheckInSeat(true, true);


                }
            });

        }

    }
    //delete company React.MouseEvent<HTMLButtonElement, MouseEvent>
    const handleCompanyBooking = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (booking_data.bookings_isBooked) {
            MySwal.fire(
                'Booking!',
                'Seat Already booked.',
                'info'
            )

        } else {

            MySwal.fire({
                title: 'Are you sure?',
                text: `You are about to book a seat for  the ${booking_data.clients_name + " " + booking_data.clients_surname} . You won't be able to revert this!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Book seat!',

            }).then((result) => {
                if (result.isConfirmed) {

                    BookInCheckInSeat(true, false);


                }
            });


        }



    };

    return (
        <div className="company-booking-card">

            <div className="customer-full-name">
                <h2>Full name: <span>{booking_data.clients_name + " " + booking_data.clients_surname}</span></h2>
            </div>

            <div className="customer-id-number">
                <h2>Id number: <span>{booking_data.clients_idNumber}</span></h2>
            </div>
            <div className="voucher-ref-number">
                <div className="voucher">
                    <h2>Voucher: <span>{booking_data.bookings_voucher}</span></h2>
                </div>
                <div className="ref-number">
                    <h2>Ref: <span>{booking_data.bookings_reference}</span></h2>
                </div>
            </div>
            <div className="phone-number-seat-number">
                <div className="phone-number">
                    <h2>P number: <span>{booking_data.clients_phonenumber}</span></h2>
                </div>
                <div className="seat-number">
                    <h2>Seat: <span>{booking_data.bookings_ticketCode}</span></h2>
                </div>

            </div>

            <div className="price-amount-paid">
                <div className="price">
                    <h2>Price: <span>
                        {


                            new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "KES",
                            }).format(booking_data.eventsClasses_price)
                        }</span></h2>
                </div>
                <div className="amount-paid">
                    <h2>Due: <span>{


                        new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "KES",
                        }).format(booking_data.bookings_amountPaid)

                    }</span></h2>
                </div>
            </div>
            <div className="seat-status">

                <div className="seat-reserved">
                    <h2>Reserved: <span>
                        {
                            booking_data.bookings_isReserved ?
                                <CheckCircleOutlineIcon className="icon-company-seat-status completed" style={{ fontSize: 20 }} />
                                :
                                <HighlightOffIcon className="icon-company-seat-status uncompleted" style={{ fontSize: 20 }} />



                        }
                    </span></h2>


                </div>

                <div className="seat-booked">
                    <h2>Booked: <span>
                        {
                            booking_data.bookings_isBooked ?
                                <CheckCircleOutlineIcon className="icon-company-seat-status completed" style={{ fontSize: 20 }} />
                                :
                                <HighlightOffIcon className="icon-company-seat-status uncompleted" style={{ fontSize: 20 }} />



                        }
                    </span></h2>



                </div>

                <div className="seat-checked-in">
                    <h2>Checked-in: <span>
                        {
                            booking_data.bookings_isCheckedIn ?
                                <CheckCircleOutlineIcon className="icon-company-seat-status completed" style={{ fontSize: 20 }} />
                                :
                                <HighlightOffIcon className="icon-company-seat-status uncompleted" style={{ fontSize: 20 }} />



                        }
                    </span></h2>


                </div>
            </div>
            <div className="booking-action">
                {/* <div className="action-view">


                    <Link to=""><PageviewIcon className="icon-company-action" style={{ fontSize: 20 }} />View</Link>


                </div> */}

                <button className="action-book" onClick={(event) => handleCompanyBooking(event)}>
                    <CheckIcon className="icon-company-action" style={{ fontSize: 20 }} />Book
                </button>
                {/* <Link to=""><CheckIcon className="icon-company-action" style={{ fontSize: 20 }} />Book</Link>
 */}

                <button className="action-checkin" onClick={(event) => handleCompanyCheckIn(event)}>
                    <ListAltIcon className="icon-company-action" style={{ fontSize: 20 }} />Check in
                </button>

                {/* <div className="action-checkin">
                    <Link to="">
                        <ListAltIcon className="icon-company-action" style={{ fontSize: 20 }} />Check in
                        </Link>


                </div> */}
            </div>




        </div >
    )
}

export default CompanyBooking







