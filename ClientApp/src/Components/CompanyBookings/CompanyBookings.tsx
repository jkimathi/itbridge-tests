import React, { useState, useEffect } from 'react';
import '../../Styles/CompanyBookings.scss';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import LeftNavigation from '../Navigation/LeftNavigation';
import TopNavigation from '../Navigation/TopNavigation';
import axiosInstance from "../../Api/Api";
import { GridLoader } from 'react-spinners';
import BlockIcon from '@material-ui/icons/Block';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import Footer from '../Footer/Footer';
import { useAppSelector } from '../../App/hooks';
import { selectNavigationState } from '../../features/navigation/navigationSlice';
import ICompanysBooking from '../../Types/ICompanysBooking';
import CompanyBooking from './CompanyBooking';




const CompanyBookings = (props: any) => {
    const [stateCompanyBookings, setstateCompanyBooking] = useState<ICompanysBooking[]>([]);
    const navState = useAppSelector(selectNavigationState);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [isPageEmpty, setIsPageEmpty] = useState(false);




    const loadEvents = () => {

        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };
        const eventID: string = props.match.params.eventID;


        axiosInstance
            .get(`booking/list/${eventID}`, config)
            .then((response) => {
             
                setIsPageLoading(false);
                if (response.data.list.length) {
                    setstateCompanyBooking(response.data.list);

                } else {

                    setIsPageEmpty(true);

                }
            })
            .catch((error) => {
            
                setIsPageLoading(false);
            });

    };
    const refreshPage = () => {
        loadEvents();
    }
    useEffect(() => {
        loadEvents();

    }, []);









    const listCompanysBooking = stateCompanyBookings.map((booking) => {
        return (
            <CompanyBooking

                booking_data={booking}
                refreshPage={refreshPage}










            />
        )

    });
    return (
        <div className="bookings">

            <div className="bookings-container">
                <div className={navState ? "page-left-navigation" : "page-left-navigation-hidden"}>
                    <LeftNavigation />
                </div>

                <div className="page-top-right-navigation-page-content">
                    <div className="top-right-navigation">

                        <TopNavigation />
                    </div>
                    <div className="page-content">
                        <div className="company-bookings">

                            <div className="company-bookings-container">
                                <div className="company-bookings-container-header">
                                    <h1 className="page-header-company-bookings">Event booking</h1>
                                </div>
                                {isPageLoading ?
                                    <div className="loader-company-bookings">

                                        <GridLoader size={20} margin="2" color="#0078d4" /></div>

                                    :

                                    <div className="company-bookings-list">
                                        {
                                            isPageEmpty ?
                                                <div className="container-no-booking-found">
                                                    <div className="container-no-booking-found-icon">
                                                        <BlockIcon style={{ fontSize: 70 }} />
                                                    </div>
                                                    <div className="container-no-booking-found-text">
                                                        <h2> You do not have any bookings at the moment
                                                        </h2>

                                                    </div>


                                                </div>
                                                :

                                                listCompanysBooking



                                        }


                                    </div>

                                }



                            </div>

                        </div>
                        <BackToTopButton />


                    </div>

                </div>





                <BackToTopButton />

            </div>
            <Footer />

        </div>


    )
}

export default CompanyBookings

