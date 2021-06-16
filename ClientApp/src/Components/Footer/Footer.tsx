import React from 'react';
import '../../Styles/Footer.scss';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LanguageIcon from '@material-ui/icons/Language';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PhoneIphoneSharpIcon from '@material-ui/icons/PhoneIphoneSharp';
import MailOutlineSharpIcon from '@material-ui/icons/MailOutlineSharp';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <div className="footer">
            <div className="footer__line"></div>
            <div className="footer__top">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-3">
                            <div className="footer__top-content">
                                <div className="footer__logo">
                                <h2><span>IT</span>Bridge</h2>
                                </div>
                                <div className="footer__service-country">
                                    <LanguageIcon className="world-icon" style={{ fontSize: 16 }} />
                                    <select>
                                        <option>Kenya</option>
                                        <option>Congo (DRC)</option>
                                        <option> Malawi</option>
                                    </select>

                                </div>
                                <div className="footer__social-links">
                                    <div className="social-link">
                                        <div className="icon-container">
                                            <FacebookIcon style={{ fontSize: 25 }} className="icons" />
                                        </div>
                                    </div>
                                    <div className="social-link">
                                        <div className="icon-container">
                                            <TwitterIcon style={{ fontSize: 25 }} className="icons" />
                                        </div>
                                    </div>
                                    <div className="social-link">
                                         <div className="icon-container">
                                            <InstagramIcon style={{ fontSize: 25 }} className="icons" />
                                        </div>
                                    </div>
                                    <div className="social-link">
                                         <div className="icon-container">
                                            <LinkedInIcon style={{ fontSize: 25 }} className="icons" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <div className="footer__top-content footer__top-content--second">
                                <h4>Contact</h4>
                                <ul>
                                    <li className="phone"><PhoneIphoneSharpIcon style={{ fontSize: 20 }}/><a href="tel:+27713385948">+27 71 338 5948</a></li>
                                    <li className="phone"><PhoneIphoneSharpIcon style={{ fontSize: 20 }}/><a href="tel:+27762915691">+27 76 291 5691</a></li>
                                    <li className="email"><MailOutlineSharpIcon style={{ fontSize: 20 }}/><a href="mailto:support@itbridge.io">support@itbridge.io</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <div className="footer__top-content">
                                <h4>Quick Links</h4>
                                <ul>
                                    <li>About us</li>
                                    <li>Our Services</li>
                                    <li>Contact us</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <div className="footer__top-content">
                                <h4>Newsroom</h4>
                                <ul>
                                    {/* <li>Testing</li>
                                    <li>Testing</li>
                                    <li>Testing</li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__bottom">
                <div className="container">
                    <div className="copyright-note">
                        Copyright &copy; {year}<span>IT</span>Bridge.
                        <div className="policies"><a href="#">Privacy Policy</a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
