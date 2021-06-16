import React, { useState } from 'react';
import '../../Styles/TopNavigation.scss';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../App/hooks';

import { changenav, selectNavigationState } from '../../features/navigation/navigationSlice';




const TopNavigation = () => {



    let navState = useAppSelector(selectNavigationState);

    const dispatch = useAppDispatch();




    const currentUser = sessionStorage.getItem("userFullName");




    const handleToggleLeftNavbar = () => {

        //TODO: hable togle menu using redux

        dispatch(changenav());

    };
    return (
        <div className="top-navigation">
            <div className="top-nav-content">



                <div className="top-nav-content-action-menu-btn-container">

                    <div className="menu-btn">
                        <MenuIcon className="top-nav-menu-icon" style={{ fontSize: 22 }}

                            onClick={handleToggleLeftNavbar}
                        />  <span></span>



                    </div>


                    <div className="top-nav-content-action">
                        <div className="action-icon">


                        </div>

                        <div className="action-text">
                            <div className="action-icon">
                                <button className="btn-top-action">
                                    <AccountCircleIcon className="top-nav-con" style={{ fontSize: 30 }} /></button>

                            </div>

                            <div className="text">
                                <h2>{currentUser}</h2>
                            </div>
                            <div className="logout-link">

                                <Link to="/logout">
                                    <PowerSettingsNewIcon className="top-nav-icon" style={{ fontSize: 22 }} />
                                </Link>

                            </div>


                        </div>





                    </div>



                </div>


            </div>

        </div>
    )
}

export default TopNavigation
