import React, { useEffect, useState } from 'react';
import '../../Styles/CompanyProfile.scss';

import CompanyLogo from '../../Assets/company.png';
import axiosInstance from "../../Api/Api";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailIcon from '@material-ui/icons/Mail';
import SettingsPhoneIcon from '@material-ui/icons/SettingsPhone';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import CustomerPortalSearchBooking from './CustomerPortalSearchBooking/CustomerPortalSearchBooking';
import { Link as LinkScroll } from 'react-scroll';
import { Link } from 'react-router-dom';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { animateScroll as scroll } from 'react-scroll';
import CompanyOwner from './CompanyOwner/CompanyOwner';
import CompanyDetails from './CompanyDetails/CompanyDetails';
import ICompanyDetails from '../../Types/ICompanyDetails';
import IEventsClasses from '../../Types/IEventClasses';



enum NavTabItems {
  Home = "Home",
  Profile = "Profile",
  Owner = "Owner",
  Anouncements = "Anouncements"
};


const CustomersPortal = (props: any) => {
  const [backToTopVisibility, setbackToTopVisibility] = useState(false);
  //set active navigation
  const [activeNavItem, setActiveNavItem] = useState(NavTabItems.Home);
  const [comapny_details_data, setComapny_details_data] = useState<ICompanyDetails>();
  const [comapny_events_data, setComapny_events_data] = useState<IEventsClasses[]>([]);



  const app_image_url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`;






  const companyLinkID: string = props.match.params.companyLink;
  const handleBookingBtn = () => {
    setActiveNavItem(NavTabItems.Home);
    scroll.scrollTo(150);
  };

  const handlePageScroll = () => {
    if (window.scrollY >= 80) {
      setbackToTopVisibility(true);
    } else {
      setbackToTopVisibility(false);
    }
  };

  window.addEventListener('scroll', handlePageScroll);
  const handleBacToTop = () => {

    scroll.scrollToTop();


  };


  const date = new Date();
  const year = date.getFullYear();

  useEffect(() => {

    axiosInstance
      .get(`auth/company/${companyLinkID}`)
      .then((response) => {
        if (response.data.companyDetails) {
          sessionStorage.setItem("events", JSON.stringify(response.data.eventsClasses))  // store the events in the session. 
          setComapny_details_data(response.data.companyDetails);
          setComapny_events_data(response.data.eventsClasses);



        } else {

          props.history.push(`/`);
        }

      })
      .catch((error) => {

      });

  }, []);


  //handle tab clicks 
  const handleTabNavClicks = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, selectedTabItem: NavTabItems) => {
    e.preventDefault();

    setActiveNavItem(selectedTabItem);

  };

  return (
    <div className="company-profile">


      <div className="company-profile-header" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${app_image_url}${comapny_details_data?.companies_customerPortalImagePath.replaceAll('\\', '/')})` }}>

        <div className="company-profile-header-content">
          <h2 className="company-name">{comapny_details_data?.company_name}</h2>
          <h3 className="company-page-title">Customer portal</h3>

          <div className="user-action-container">
            <div className="btn-booking">
              <LinkScroll className="btn-book-now" spy={true} smooth={true} to="search-booking" onClick={handleBookingBtn}   >Book Now </LinkScroll>
            </div>
            <div className="btn-confirm-payment">
              <Link className="btn-book-now" to="/portal/payment" onClick={handleBookingBtn}   >Confirm Payment</Link>
            </div>
          </div>
        </div>


      </div>
      <div className={`BacktoTop  ${backToTopVisibility ? 'showBackToTop' : ''}`}>

        <ArrowUpwardIcon style={{ fontSize: 45 }} className="icon " onClick={handleBacToTop} />

      </div>
      <div className="company-profile-info">

        <div className="company-profile-info-name">
          <div className="logo">

            <img src={`${app_image_url}${comapny_details_data?.companies_logoPath}`} alt="Company log" />
          </div>
          <div className="name">
            <h5>{comapny_details_data?.company_name}</h5>
            <a>{comapny_details_data?.company_email}</a>
          </div>
        </div>
        <div className="company-profile-info-details">

          <div className="company-profile-info-details-content">
            <div className="company-profile-info-details-content-left">
              <h5><span className="icon"> <HomeIcon style={{ fontSize: 20 }} /> </span> Homepage</h5>
              <h5><span className="icon"> <MailIcon style={{ fontSize: 20 }} /> </span> {comapny_details_data?.company_email}</h5>
              <h5><span className="icon"> <SettingsPhoneIcon style={{ fontSize: 20 }} /> </span> {comapny_details_data?.company_phonenumber}</h5>

            </div>
            <div className="company-profile-info-details-content-right">
              <h5><span className="icon"> <LocationOnIcon style={{ fontSize: 20 }} /> </span>{comapny_details_data?.company_physicalAddress}</h5>
            </div>
          </div>
          <div className="company-profile-info-details-navigation">
            <div onClick={(event) => handleTabNavClicks(event, NavTabItems.Home)} className={activeNavItem === NavTabItems.Home ? 'navigation-content-active' : 'navigation-content'}>
              <h3 ><span className="icon"> <HomeIcon style={{ fontSize: 20 }} /> </span> {NavTabItems.Home}</h3>
            </div>
            <div onClick={(event) => handleTabNavClicks(event, NavTabItems.Profile)} className={activeNavItem === NavTabItems.Profile ? 'navigation-content-active' : 'navigation-content'}>
              <h3><span className="icon"> <PersonIcon style={{ fontSize: 20 }} /> </span> {NavTabItems.Profile}</h3>
            </div>
            <div onClick={(event) => handleTabNavClicks(event, NavTabItems.Owner)} className={activeNavItem === NavTabItems.Owner ? 'navigation-content-active' : 'navigation-content'}>
              <h3><span className="icon"> <PermContactCalendarIcon style={{ fontSize: 20 }} /> </span>{NavTabItems.Owner}</h3>
            </div>
            <div onClick={(event) => handleTabNavClicks(event, NavTabItems.Anouncements)} className={activeNavItem === NavTabItems.Anouncements ? 'navigation-content-active' : 'navigation-content'}>
              <h3><span className="icon"> <AnnouncementIcon style={{ fontSize: 20 }} /> </span>{NavTabItems.Anouncements}</h3>
            </div>

          </div>



        </div>
      </div>

      <div className="company-profile-page-content">
        <div className={activeNavItem === NavTabItems.Anouncements ? 'company-profile-message page-section-shown' : 'page-section-hidden'}>
          <div className="company-profile-message-content">
            <h2 className="header-message">Message</h2>
            <h2 className="message">{comapny_details_data?.company_advertMessage}</h2>

          </div>


        </div>
        <div className={activeNavItem === NavTabItems.Home ? 'page-section-shown' : 'page-section-hidden'}>
          <CustomerPortalSearchBooking
            companys_events_data={comapny_events_data}
            comapnys_details_data_name={comapny_details_data?.company_name}
            comapnys_details_data_url={comapny_details_data?.company_websiteUrlLink}

          />
        </div>
        <div className={activeNavItem === NavTabItems.Owner ? 'page-section-shown' : 'page-section-hidden'}>


          <CompanyOwner
            owners_userID={comapny_details_data?.owner_userID}
            owners_token={comapny_details_data?.owner_token}
            owners_name={comapny_details_data?.owner_name}
            owners_surname={comapny_details_data?.owner_surname}
            owners_dateOfBirth={comapny_details_data?.owner_dateOfBirth}
            owners_imageLink={comapny_details_data?.owner_imageLink}
            owners_genderID={comapny_details_data?.owner_genderID}
            owners_titleID={comapny_details_data?.owner_titleID}
            owners_languageID={comapny_details_data?.owner_languageID}
            owners_countryID={comapny_details_data?.owner_countryID}
            owners_createdBy={comapny_details_data?.owner_createdBy}
            owners_createdDate={comapny_details_data?.owner_createdDate}
          />
        </div>
        <div className={activeNavItem === NavTabItems.Profile ? 'page-section-shown' : 'page-section-hidden'}>
          <CompanyDetails
            companys_companyID={comapny_details_data?.company_companyID}
            companys_name={comapny_details_data?.company_name}
            companys_uniqueCode={comapny_details_data?.company_uniqueCode}
            companys_phonenumber={comapny_details_data?.company_phonenumber}
            companys_email={comapny_details_data?.company_email}
            companys_isPremium={comapny_details_data?.company_isPremium}
            companys_isPaymentOnProductLevel={comapny_details_data?.company_isPaymentOnProductLevel}
            companys_isActive={comapny_details_data?.company_isActive}
            companys_activatedBy={comapny_details_data?.company_activatedBy}
            companys_activatedDate={comapny_details_data?.company_activatedDate}
            companys_deactivatedBy={comapny_details_data?.company_deactivatedBy}
            companys_deactivatedDate={comapny_details_data?.company_deactivatedDate}
            companys_websiteUrlLink={comapny_details_data?.company_websiteUrlLink}
            companys_advertMessage={comapny_details_data?.company_advertMessage}
            companys_imagesLink={comapny_details_data?.company_imagesLink}
            companys_documentsLink={comapny_details_data?.company_documentsLink}
            companys_physicalAddress={comapny_details_data?.company_physicalAddress}
            companys_createdBy={comapny_details_data?.company_createdBy}
            companys_createdDate={comapny_details_data?.company_createdDate}
            companys_editedBy={comapny_details_data?.company_editedBy}

          />
        </div>



      </div>



      <div className="footer">
        <div className="footer-content">
          <div className="copy-right">
            Copyright &copy; {year}  {comapny_details_data?.company_name}. All Rights Reserved.
          </div>
        </div>

      </div>


    </div>
  )
}

export default CustomersPortal
