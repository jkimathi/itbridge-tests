import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../App/hooks';
import { changenavSearchPage, selectNavigationSearchPageState } from '../../features/navigation/navigationSlice';
import '../../Styles/NavigationSearchhPage.scss';



const NavigationSearchhPage = () => {
    let navState = useAppSelector(selectNavigationSearchPageState);
    const dispatch = useAppDispatch();
    const handleToggleNavBar = () => {
        dispatch(changenavSearchPage());
    }

    return (
        <header className="navigation-search-page header">
            <div className="container">
                <nav className="navbar navbar-expand-md">
                    <a className="navbar-brand" href="/">
                        <span>it</span>Bridge
                    </a>
                    <button className="navbar-toggler" onClick={handleToggleNavBar}>
                        <div id="hamburger-menu" className={navState ? "open " : ""}><span></span><span></span><span></span></div>
                    </button>
                    <div className={`collapse navbar-collapse show ${navState ? 'active' : ''}`} id="navbarNav">
                        <ul className="navbar-nav">
                            <li onClick={handleToggleNavBar}><Link to="/">Home</Link></li>
                            <li onClick={handleToggleNavBar}> <Link to="#">Services</Link></li>
                            <li onClick={handleToggleNavBar}> <Link to="#">About us</Link></li>
                            <li onClick={handleToggleNavBar}> <Link to="#">Contact</Link></li>
                            <li onClick={handleToggleNavBar} className="navbar-nav__login"> <Link to="/login">Login</Link></li>
                            <li onClick={handleToggleNavBar} className="navbar-nav__register"><Link to="/signup">Register</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default NavigationSearchhPage
