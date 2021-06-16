import React, { useEffect, useState } from 'react';
import '../../Styles/ViewEvent.scss';
import { useForm } from "react-hook-form";
import {
    RiseLoader
} from 'react-spinners';
import TopNavigation from '../Navigation/TopNavigation';
import LeftNavigation from '../Navigation/LeftNavigation';
import axiosInstance from '../../Api/Api';
import Footer from '../Footer/Footer';
import IProduct from '../../Types/IProduct';
import INewEvent from '../../Types/INewEvents';

import BackToTopButton from '../BackToTopButton/BackToTopButton';
import { useAppSelector } from '../../App/hooks';
import { selectNavigationState } from '../../features/navigation/navigationSlice';
import IEvents from '../../Types/IEvents';
import PieChartTicketsSummary from '../Charts/PieChartTicketsSummary';
import PieChartCashSummary from '../Charts/PieChartCashSummary';
import IEventView from '../../Types/IEventView';
import { Link } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';


const ViewEvent = (props: any) => {
    const { register, handleSubmit, errors } = useForm<INewEvent>();
    const [resultCreateCompanyError, SetresultCreateCompanyError] = useState(false);


    const navState = useAppSelector(selectNavigationState);
    const [stateEventDetails, setstateEventDetails] = useState<IEventView>();
    const [isEventInViewMode, SetIsEventInViewMode] = useState(true);


    const eventID: string = props.match.params.eventID;

    //retrieve events
    const eventsList = JSON.parse(sessionStorage.getItem('eventList') || '{}');







    //load events
    useEffect(() => {
        if (eventsList) {

            const retrieveEvent = eventsList.find((event: { eventID: string; }) => event.eventID === eventID);
            setstateEventDetails(retrieveEvent);


        } else {

            props.history.push("/events/list");
        }

    }, [])










    return (
        <div className="newevent">


            <div className="newevent-container">
                <div className={navState ? "page-left-navigation" : "page-left-navigation-hidden"}>
                    <LeftNavigation />
                </div>

                <div className="page-top-right-navigation-page-content">
                    <div className="top-right-navigation">

                        <TopNavigation />
                    </div>
                    <div className="page-content">
                        <div className="new-event">

                            <div className="new-event-form-container">
                                <div className="event-summary">
                                    <div className="header">
                                        <h2>Event Summary</h2>

                                    </div>
                                    <div className="charts-stat">
                                        <div className="chart-tickets">
                                            <PieChartTicketsSummary



                                                availableTickets={stateEventDetails?.availableTickets!}
                                                bookedTickets={stateEventDetails?.bookedTickets!}
                                                totalTickets={stateEventDetails?.totalTickets!}

                                            />

                                        </div>
                                        <div className="chart-cash">


                                            <PieChartCashSummary



                                                companyExpectedCash={stateEventDetails?.totalExpectedCash!}
                                                companyReceivedCash={stateEventDetails?.totalReceivedCash!}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="new-event-container-header">
                                    <h1 className="page-header-new-event">Event Details</h1>

                                </div>


                                <form >
                                    <div className="form-new-event">
                                        <div className="form-new-event-left">




                                            <div className="form-control">
                                                <input type="text" name="Name"
                                                    defaultValue={stateEventDetails?.name}
                                                    ref={register({ required: true })}
                                                    readOnly={isEventInViewMode} />
                                                <div className="input-undeline"></div>
                                                <label>Name</label>

                                            </div>
                                            <div className="form-control">
                                                <input type="text" name="Code"
                                                    defaultValue={stateEventDetails?.code}
                                                    ref={register({ required: true })}
                                                    readOnly={isEventInViewMode} />
                                                <div className="input-undeline"></div>
                                                <label>Event Code</label>

                                            </div>

                                            <div className="form-control">
                                                <input type="text" name="Code"
                                                    defaultValue={stateEventDetails?.descriptions}
                                                    ref={register({ required: true })}
                                                    readOnly={isEventInViewMode} />
                                                <div className="input-undeline"></div>
                                                <label>Event Description</label>

                                            </div>

                                            <div className="form-control">
                                                <input type="text" name="fromPlace_Name"
                                                    defaultValue={stateEventDetails?.fromPlace_Name}
                                                    ref={register({ required: true })}
                                                    readOnly={isEventInViewMode} />
                                                <div className="input-undeline"></div>
                                                <label>Event Origin</label>

                                            </div>
                                            <div className="form-control">
                                                <input type="text" name="fromAddress"
                                                    defaultValue={stateEventDetails?.fromAddress}
                                                    ref={register({ required: true })}
                                                    readOnly={isEventInViewMode} />
                                                <div className="input-undeline"></div>
                                                <label>Event Station</label>

                                            </div>

                                            <div className="form-control">
                                                <input type="text" name="fromDate"
                                                    defaultValue={stateEventDetails?.fromDate}
                                                    ref={register({ required: true })}
                                                    readOnly={isEventInViewMode} />
                                                <div className="input-undeline"></div>
                                                <label>Event Start Date</label>

                                            </div>

                                            <div className="form-control">
                                                <input type="text" name="fromHours"
                                                    defaultValue={stateEventDetails?.fromHours}
                                                    ref={register({ required: true })}
                                                    readOnly={isEventInViewMode} />
                                                <div className="input-undeline"></div>
                                                <label>Event Start time</label>

                                            </div>
                                            <div className="form-control">
                                                <input type="text" name="toDate"
                                                    defaultValue={stateEventDetails?.toDate}
                                                    ref={register({ required: true })}
                                                    readOnly={isEventInViewMode} />
                                                <div className="input-undeline"></div>
                                                <label>Event end Date</label>

                                            </div>

                                            <div className="form-control">
                                                <input type="text" name="toHours"
                                                    defaultValue={stateEventDetails?.toHours}
                                                    ref={register({ required: true })}
                                                    readOnly={isEventInViewMode} />
                                                <div className="input-undeline"></div>
                                                <label>Event end time</label>

                                            </div>

















                                        </div>



                                        <div className="form-new-event-right">

                                            <div className="form-control">
                                                {
                                                    stateEventDetails?.isActive ? <h2>Event's Status: <span className="status-active"><LockOpenIcon className="icon-company-status" style={{ fontSize: 20 }} /> Active</span></h2>
                                                        :
                                                        <h2>Event's Status: <span className="status-not-active"><LockIcon className="icon-company-status" style={{ fontSize: 20 }} />Not Active</span></h2>

                                                }

                                            </div>
                                            <div className="form-control">
                                                {
                                                    stateEventDetails?.isCashPaidToItBridge ? <h2>Event Payment collection: <span className="status-active"><LockOpenIcon className="icon-company-status" style={{ fontSize: 20 }} /> Active</span></h2>
                                                        :
                                                        <h2>Event Payment collection: <span className="status-not-active"><LockIcon className="icon-company-status" style={{ fontSize: 20 }} />Not Active</span></h2>

                                                }

                                            </div>


                                            <div className="form-control">
                                                <input type="text" name="itBridgeReceivedCash"
                                                    defaultValue={


                                                        stateEventDetails?.totalExpectedCash}
                                                    ref={register({ required: true })}
                                                    readOnly={isEventInViewMode} />
                                                <div className="input-undeline"></div>
                                                <label>Expected revenue</label>

                                            </div>

                                            <div className="form-control">
                                                <input type="text" name="itBridgeReceivedCash"
                                                    defaultValue={stateEventDetails?.totalReceivedCash}
                                                    ref={register({ required: true })}
                                                    readOnly={isEventInViewMode} />
                                                <div className="input-undeline"></div>
                                                <label>Collected revenue</label>

                                            </div>


                                            <div className="form-control">
                                                <input type="text" name="itBridgeExpectedCash"
                                                    defaultValue={stateEventDetails?.itBridgeExpectedCash}
                                                    ref={register({ required: true })}
                                                    readOnly={isEventInViewMode} />
                                                <div className="input-undeline"></div>
                                                <label>Total Service fee</label>

                                            </div>

                                            <div className="form-control">
                                                <input type="text" name="itBridgeReceivedCash"
                                                    defaultValue={stateEventDetails?.itBridgeReceivedCash}
                                                    ref={register({ required: true })}
                                                    readOnly={isEventInViewMode} />
                                                <div className="input-undeline"></div>
                                                <label>Service fee Due</label>

                                            </div>


                                            <div className="form-control">
                                                <input type="text" name="totalTickets"
                                                    defaultValue={stateEventDetails?.totalTickets}
                                                    ref={register({ required: true })}
                                                    readOnly={isEventInViewMode} />
                                                <div className="input-undeline"></div>
                                                <label>Total number of tickets</label>

                                            </div>

                                            <div className="form-control">
                                                <input type="text" name="bookedTickets"
                                                    defaultValue={stateEventDetails?.bookedTickets}
                                                    ref={register({ required: true })}
                                                    readOnly={isEventInViewMode} />
                                                <div className="input-undeline"></div>
                                                <label>Total number of booked tickets</label>

                                            </div>

                                            <div className="form-control">
                                                <input type="text" name="availableTickets"
                                                    defaultValue={stateEventDetails?.availableTickets}
                                                    ref={register({ required: true })}
                                                    readOnly={isEventInViewMode} />
                                                <div className="input-undeline"></div>
                                                <label>Total number of available tickets</label>

                                            </div>





                                        </div>
                                    </div>




                                    <Link className="btn-create-event" to="/events/list">Back to event</Link>







                                </form>

                            </div>

                        </div>


                    </div>

                </div>


            </div>




            <BackToTopButton />
            <Footer />

        </div>



    )
}

export default ViewEvent


