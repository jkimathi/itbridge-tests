import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Company.scss';

import PublicIcon from '@material-ui/icons/Public';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PageviewIcon from '@material-ui/icons/Pageview';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ICompanies from '../../Types/ICompanies';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import IEvents from '../../Types/IEvents';



const Event = (
    {
        availableTickets, bookedTickets, branchID, code,
        createdDate, eventID, expectedCash, expensesCash,
        fromDate, fromHours, fromPlace, fromPlace_Name, isActive,
        lostCash, name, productID, receivedCash,
        subcategoryID,
        toDate,
        toHours,
        toPlace,
        toPlace_Name,
        totalTickets,
    }: IEvents
) => {


    
    return (
        <div className="company-card">
            <div className="company-name">
                <h2>Event name: <span>{name}</span></h2>

            </div>
            <div className="company-name">
                <h2>Event code: <span>{code}</span></h2>

            </div>
            <div className="company-name">
                <h2>Event total Tickets: <span>{totalTickets}</span></h2>

            </div>
            <div className="company-name">
                <h2>Event available Tickets: <span>{availableTickets}</span></h2>

            </div>
            <div className="company-name">
                <h2>Event booked Tickets: <span>{bookedTickets}</span></h2>

            </div>

          



            <div className="company-action-status">
                <div className="company-action-view">
                    <Link to={`/events/view/${eventID}`}><PageviewIcon className="icon-company-action" style={{ fontSize: 20 }} />View</Link>


                </div>
                <div className="company-action-view">
                    <Link to={`/bookings/list/${eventID}`}><FormatListBulletedIcon className="icon-company-action" style={{ fontSize: 20 }} />Bookings</Link>


                </div>
               
                <button className="company-action-delete" >
                  
                    <DeleteForeverIcon className="icon-company-action-delete" style={{ fontSize: 20 }} />Delete


                </button>


            </div>

        </div >
    )
}

export default Event
