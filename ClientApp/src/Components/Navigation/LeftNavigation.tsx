import React, { useState } from 'react';
import '../../Styles/LeftNavigation.scss';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import GroupIcon from '@material-ui/icons/Group';
import PaymentIcon from '@material-ui/icons/Payment';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import { Link } from 'react-router-dom';
import { ChevronLeft } from '@material-ui/icons';
import DateRangeIcon from '@material-ui/icons/DateRange';

enum NavItemTitle {
    Home = "Home",
    Companies = "Companies",
    Branches = "Branches",
    Products = "Products",
    Classes = "Classes",
    Payments = "Payments",
    Users = "Users",
    Events = "Events",
    Bookings = "Bookings"
}
const LeftNavigation = () => {
    const [stateNavItemOpen, setNavItemOpen] = useState(true);
    const [activeNavItem, setActiveNavItem] = useState(NavItemTitle.Home);



    const defaultCompany = sessionStorage.getItem("defaultCompany");
    const handleActiveNavItem = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, navItem: NavItemTitle) => {
        e.preventDefault();
        setActiveNavItem(navItem);


    }
    return (
        <div className="left-navigation ">
            {
                stateNavItemOpen ?
                    <>
                        <div className="top-nav-brand">
                            <div className="top-nav-brand">
                                <Link to="/dashboard">
                                    <h2>{defaultCompany ? defaultCompany : "Company Not set"}</h2>
                                </Link>

                            </div>


                        </div>
                        <ul className="left-navigation-items">
                            <li>
                                <Link to="/dashboard" className={activeNavItem === NavItemTitle.Home ? "active-nav-item" : ""}
                                    onClick={(event) => handleActiveNavItem(event, NavItemTitle.Home)}>

                                    <HomeIcon className="top-nav-icon" style={{ fontSize: 18 }} />
                                    <span>{NavItemTitle.Home}</span>



                                    {
                                        activeNavItem === NavItemTitle.Home ?
                                            <ExpandMoreIcon className="top-nav-right-arrow-icon" style={{ fontSize: 18 }} />

                                            :

                                            <ChevronRightIcon className="top-nav-right-arrow-icon" style={{ fontSize: 18 }} />
                                    }
                                </Link>


                            </li>
                            <li>
                                <Link to="#" className={activeNavItem === NavItemTitle.Companies ? "active-nav-item" : ""}
                                    onClick={(event) => handleActiveNavItem(event, NavItemTitle.Companies)}>
                                    <CardTravelIcon className="top-nav-icon" style={{ fontSize: 18 }} />
                                    <span>{NavItemTitle.Companies}</span>

                                    {
                                        activeNavItem === NavItemTitle.Companies ?

                                            <ExpandMoreIcon className="top-nav-right-arrow-icon" style={{ fontSize: 18 }} />
                                            :
                                            <ChevronRightIcon className="top-nav-right-arrow-icon" style={{ fontSize: 18 }} />


                                    }
                                </Link>
                                {
                                    activeNavItem === NavItemTitle.Companies ?
                                        <ul>
                                            <li>
                                                <Link to="/companies/list">My companies</Link>
                                            </li>
                                            <li>
                                                <Link to="/companies/new">Add new Company</Link>
                                            </li>
                                        </ul>
                                        :
                                        ""
                                }

                            </li>

                            <li>
                                <Link to="#" className={activeNavItem === NavItemTitle.Branches ? "active-nav-item" : ""}
                                    onClick={(event) => handleActiveNavItem(event, NavItemTitle.Branches)}>

                                    <CardTravelIcon className="top-nav-icon" style={{ fontSize: 18 }} />
                                    <span>{NavItemTitle.Branches}</span>
                                    {
                                        activeNavItem === NavItemTitle.Branches ?

                                            <ExpandMoreIcon className="top-nav-right-arrow-icon" style={{ fontSize: 18 }} />
                                            :
                                            <ChevronRightIcon className="top-nav-right-arrow-icon" style={{ fontSize: 18 }} />



                                    }

                                </Link>


                                {
                                    activeNavItem === NavItemTitle.Branches ?
                                        <ul>
                                            <li>
                                                <Link to="/branches/list">    My Branches</Link>
                                            </li>
                                            <li>
                                                <Link to="/branches/new">  Add new Branch</Link>
                                            </li>
                                        </ul>
                                        :
                                        ""
                                }
                            </li>
                            <li>

                                <Link to="#" className={activeNavItem === NavItemTitle.Products ? "active-nav-item" : ""}
                                    onClick={(event) => handleActiveNavItem(event, NavItemTitle.Products)}>
                                    <PaymentIcon className="top-nav-icon" style={{ fontSize: 18 }} />
                                    <span>{NavItemTitle.Products}</span>

                                    {
                                        activeNavItem === NavItemTitle.Products ?

                                            <ExpandMoreIcon className="top-nav-right-arrow-icon" style={{ fontSize: 18 }} />
                                            :
                                            <ChevronRightIcon className="top-nav-right-arrow-icon" style={{ fontSize: 18 }} />


                                    }
                                </Link>


                                {
                                    activeNavItem === NavItemTitle.Products ?
                                        <ul>
                                            <li>
                                                <Link to="/products/list"> My Products</Link>
                                            </li>
                                            <li>
                                                <Link to="/products/new"> New Products</Link>
                                            </li>
                                        </ul>
                                        :
                                        ""
                                }
                            </li>
                            <li>
                                <ul>

                                    <Link to="#" className={activeNavItem === NavItemTitle.Classes ? "active-nav-item" : ""}
                                        onClick={(event) => handleActiveNavItem(event, NavItemTitle.Classes)}>
                                        <PaymentIcon className="top-nav-icon" style={{ fontSize: 18 }} />
                                        <span>{NavItemTitle.Classes}</span>


                                        {
                                            activeNavItem === NavItemTitle.Classes ?

                                                <ExpandMoreIcon className="top-nav-right-arrow-icon" style={{ fontSize: 18 }} />
                                                :
                                                <ChevronRightIcon className="top-nav-right-arrow-icon" style={{ fontSize: 18 }} />


                                        }
                                    </Link>

                                </ul>

                                {
                                    activeNavItem === NavItemTitle.Classes ?
                                        <ul>
                                            {/* <li>
                                                <Link to="/classes/list">My Classes</Link>
                                            </li> */}
                                            <li>
                                                <Link

                                                    to="/classes/new/">Add new Classes</Link>
                                            </li></ul>
                                        :
                                        ""
                                }
                            </li>
                            <li>

                                <Link to="#" className={activeNavItem === NavItemTitle.Events ? "active-nav-item" : ""}
                                    onClick={(event) => handleActiveNavItem(event, NavItemTitle.Events)}>
                                    <DateRangeIcon className="top-nav-icon" style={{ fontSize: 18 }} />
                                    <span>{NavItemTitle.Events}</span>

                                    {
                                        activeNavItem === NavItemTitle.Events ?

                                            <ExpandMoreIcon className="top-nav-right-arrow-icon" style={{ fontSize: 18 }} />
                                            :
                                            <ChevronRightIcon className="top-nav-right-arrow-icon" style={{ fontSize: 18 }} />


                                    }
                                </Link>


                                {
                                    activeNavItem === NavItemTitle.Events ?
                                        <ul>
                                            <li>
                                                <Link to="/events/list"> My Events</Link>
                                            </li>
                                            <li>
                                                <Link to="/events/new"> New Event</Link>
                                            </li>
                                        </ul>
                                        :
                                        ""
                                }
                            </li>

                            <li>

                                <Link to="#" className={activeNavItem === NavItemTitle.Payments ? "active-nav-item" : ""}
                                    onClick={(event) => handleActiveNavItem(event, NavItemTitle.Payments)}>
                                    <MonetizationOnIcon className="top-nav-icon" style={{ fontSize: 18 }} />
                                    <span>{NavItemTitle.Payments}</span>


                                    {
                                        activeNavItem === NavItemTitle.Payments ?

                                            <ExpandMoreIcon className="top-nav-right-arrow-icon" style={{ fontSize: 18 }} />
                                            :
                                            <ChevronRightIcon className="top-nav-right-arrow-icon" style={{ fontSize: 18 }} />


                                    }
                                </Link>



                                {
                                    activeNavItem === NavItemTitle.Payments ?
                                        <ul>
                                            <li>
                                                <Link to="/payments/list"> My Payment Options</Link>
                                            </li>
                                            <li>
                                                <Link to="/payments/new">  New Payment Option</Link>
                                            </li>
                                        </ul>
                                        :
                                        ""
                                }
                            </li>


                        </ul>
                        <div className="left-navigation-support">
                            <div className="left-navigation-support-container">
                                <ContactSupportIcon className="left-nav-support-icon" style={{ fontSize: 40 }} />
                                <h2>Need Help?</h2>
                                <p>Contact our support team for any help needed</p>
                                <button className="btn-support-team">Contact us</button>

                            </div>
                        </div>
                    </>
                    :

                    <ul className="left-navigation-items-small">
                        <li>
                            <a><HomeIcon className="top-nav-small-icon" style={{ fontSize: 35 }} /> </a>
                            {/* <ul>
                    <li>My Payment Options</li>
                    <li>New Payment Options</li>
                </ul> */}
                        </li>
                        <li>
                            <a> <CardTravelIcon className="top-nav-small-icon" style={{ fontSize: 35 }} /> </a>
                            {/* <ul>
                    <li>My companies</li>
                    <li>New Company</li>
                </ul> */}
                        </li>

                        <li>
                            <a> <CardTravelIcon className="top-nav-small-icon" style={{ fontSize: 35 }} /> </a>
                            {/* <ul>
                    <li>My Depratment</li>
                    <li>New Depratment</li>
                </ul> */}
                        </li>
                        <li>
                            <a><PaymentIcon className="top-nav-small-icon" style={{ fontSize: 35 }} /> </a>
                            {/* <ul>
                    <li>My Products</li>
                    <li>New Products</li>
                </ul> */}
                        </li>
                        <li>
                            <ul>
                                <a>
                                    <PaymentIcon className="top-nav-small-icon" style={{ fontSize: 35 }} /> </a>
                                {/* <ul> <li>My Classes</li>
                        <li>New Classes</li></ul> */}
                            </ul>
                        </li>
                        <li>
                            <a><MonetizationOnIcon className="top-nav-small-icon" style={{ fontSize: 35 }} /> </a>
                            {/* <ul>
                    <li>My Payment Options</li>
                    <li>New Payment Options</li>
                </ul> */}
                        </li>
                        <li>
                            <a><GroupIcon className="top-nav-small-icon" style={{ fontSize: 35 }} /> </a>
                            {/* <ul>
                    <li>My Payment Options</li>
                    <li>New Payment Options</li>
                </ul> */}
                        </li>
                    </ul>

            }
        </div>
    )
}

export default LeftNavigation

