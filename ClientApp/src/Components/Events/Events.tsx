import React, { useState, useEffect } from 'react';
import '../../Styles/Events.scss';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

import LeftNavigation from '../Navigation/LeftNavigation';
import TopNavigation from '../Navigation/TopNavigation';
import axiosInstance from "../../Api/Api";
import ICompanies from '../../Types/ICompanies';
import { GridLoader, RiseLoader } from 'react-spinners';
import BlockIcon from '@material-ui/icons/Block';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import Footer from '../Footer/Footer';
import IEvents from '../../Types/IEvents';
import Event from './Event';
import { useAppSelector } from '../../App/hooks';
import { selectNavigationState } from '../../features/navigation/navigationSlice';



const Events = () => {
    const [stateEvents, setstateEvents] = useState<IEvents[]>([]);
    const navState = useAppSelector(selectNavigationState);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isPageEmpty, setIsPageEmpty] = useState(false);






    //load events
    useEffect(() => {
        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };

        axiosInstance
            .get("event", config)
            .then((response) => {
                
                setIsPageLoading(false);
                if (response.data.list.length) {
                    setstateEvents(response.data.list);
                    sessionStorage.setItem("eventList", JSON.stringify(response.data.list));

                } else {

                    setIsPageEmpty(true);

                }
            })
            .catch((error) => {
             
                setIsPageLoading(false);
            });
    }, []);

    const listevents = stateEvents.map((event) => {
        return (
            <Event



                availableTickets={event.availableTickets}
                bookedTickets={event.bookedTickets}
                branchID={event.branchID}
                code={event.code}

                createdDate={event.createdDate}
                eventID={event.eventID}
                expectedCash={event.expectedCash}
                expensesCash={event.expensesCash}
                fromDate={event.fromDate}
                fromHours={event.fromHours}
                fromPlace={event.fromPlace}
                fromPlace_Name={event.fromPlace_Name}
                isActive={event.isActive}
                lostCash={event.lostCash}
                name={event.name}
                productID={event.productID}
                receivedCash={event.receivedCash}
                subcategoryID={event.subcategoryID}
                toDate={event.toDate}
                toHours={event.toHours}
                toPlace={event.toPlace}
                toPlace_Name={event.toPlace_Name}
                totalTickets={event.totalTickets}




            />
        )

    });
    return (
        <div className="events">

            <div className="events-container">
                <div className={navState ? "page-left-navigation" : "page-left-navigation-hidden"}>
                    <LeftNavigation />
                </div>

                <div className="page-top-right-navigation-page-content">
                    <div className="top-right-navigation">

                        <TopNavigation />
                    </div>
                    <div className="page-content">
                        <div className="events">

                            <div className="events-container">
                                <div className="events-container-header">


                                    <h1 className="page-header-events">My Events</h1>
                                    <Link className="link-create-company" to="/events/new"> <AddIcon className="icon-add-company" style={{ fontSize: 18 }} />Create Event</Link>

                                </div>
                                {isPageLoading ?
                                    <div className="loader-events">

                                        <GridLoader size={20} margin="2" color="#0078d4" /></div>

                                    :

                                    <div className="events-list">
                                        {
                                            isPageEmpty ?
                                                <div className="container-no-company-found">
                                                    <div className="container-no-company-found-icon">
                                                        <BlockIcon style={{ fontSize: 70 }} />
                                                    </div>
                                                    <div className="container-no-company-found-text">


                                                        <h2> You do not have any events at the moment
                                                        </h2>

                                                        <Link className="link-create-company" to="/events/new"> <AddIcon className="icon-add-company" style={{ fontSize: 18 }} />Create Event</Link>


                                                    </div>


                                                </div>
                                                :
                                                listevents


                                        }

                                    </div>

                                }



                            </div>

                        </div>
                        <BackToTopButton />


                    </div>

                </div>


            </div>


            <Footer />

        </div>







    )
}

export default Events
