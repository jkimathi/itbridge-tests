import React, { useEffect, useState } from 'react';
import '../../Styles/MainSearchPage.scss';
import NavigationSearchhPage from '../Navigation/NavigationSearchhPage';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import axiosInstance from '../../Api/Api';
import ICities from '../../Types/ICities';
import Footer from '../Footer/Footer';
import SearchPageResults from '../SearchPageResults/SearchPageResults';

import { useForm } from 'react-hook-form';
import IEventSearch from '../../Types/IEventSearch';
import { animateScroll as scroll } from 'react-scroll';
import { GridLoader } from 'react-spinners';
import ISearchEventClassesResults from '../../Types/ISearchEventClassesResults';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import ICitySearch from '../../Types/ICitySearch';
import MainSearchCitiesForm from './MainSearchCitiesForm/MainSearchCitiesForm';
import accountResourceService from '../../core/Services/account-resource-service';

const MainSearchPage = () => {

    //Services
    const _services = new accountResourceService();

    const [state_events_data, setState_events_data] = useState<ISearchEventClassesResults[]>([]);
    const [stateIsSearchInProgress, setStateIsSearchInProgress] = useState(false);
    const [stateIsSearchResultEmpty, setStateIsSearchResultEmpty] = useState(false);
    const [stateIsPageLoading, setstateIsPageLoading] = useState(true);
    const [stateIsPageLoadingError, setstateIsPageLoadingError] = useState(false);
    const [stateCountryName, setstateCountryName] = useState("");


    async function getCountryCodeIso3() {
        const data = await _services.getCountryCode();
        setstateCountryName(data.country_name.toString())
    }


    useEffect(() => {
        getCountryCodeIso3();
    }, []);

    return (
        <div className="search-page">
            <NavigationSearchhPage />
            <section className="search-page-form-container hero search-page__hero">
                <div className="container">
                    <div className="search-page-form search-page__hero-content">
                        <h1>Welcome to ITBridge {stateCountryName}</h1>
                        <h2>Book your next trip</h2>
                        <div className="search-page__hero-form">
                            <MainSearchCitiesForm
                                setState_events_data={setState_events_data}
                                setStateIsSearchInProgress={setStateIsSearchInProgress}
                                setStateIsSearchResultEmpty={setStateIsSearchResultEmpty}
                            />
                        </div>
                    </div>
                </div>
            </section>
            {

                <div className="search-indicator-results">
                    {stateIsSearchInProgress
                        ?

                        <div className="loader-icon-search-event">

                            <GridLoader size={15} margin="2" color="#0078d4" />
                        </div>

                        :
                        stateIsSearchResultEmpty
                            ?
                            <div className="search-result-not-found">
                                <div className="icon">
                                    <DirectionsBusIcon className="company-icon-image" style={{ fontSize: 150 }} />

                                </div>
                                <div className="text">

                                    <h2> Bus not found, please try again.</h2>
                                </div>
                            </div>
                            :
                            <SearchPageResults
                                companys_events_data={state_events_data}
                            />
                    }

                </div>


            }


            <BackToTopButton />
            <Footer />
        </div>
    )
}

export default MainSearchPage
