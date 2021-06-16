import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import axiosInstance from '../../../../Api/Api';
import { useForm } from 'react-hook-form';
import IEventSearch from '../../../../Types/IEventSearch';
import IResultCitySearch from '../../../../Types/IResultCitySearch';
import { animateScroll as scroll } from 'react-scroll';

import { PropagateLoader } from 'react-spinners';
import ISearchEventClassesResults from '../../../../Types/ISearchEventClassesResults';

interface ISearchCityProps {
    setState_events_data: Dispatch<SetStateAction<ISearchEventClassesResults[]>>;
    setStateIsSearchInProgress: Dispatch<SetStateAction<boolean>>;

    setStateIsSearchResultEmpty: Dispatch<SetStateAction<boolean>>;
    comapnys_details_data_url?: string;

}


const CustomerPortalSearchEventForm = ({ setState_events_data, setStateIsSearchInProgress, setStateIsSearchResultEmpty, comapnys_details_data_url }: ISearchCityProps) => {
    const { register, handleSubmit, errors } = useForm<IEventSearch>();

    //city search origin state
    const [stateOriginAutocompleteLoading, setstateOriginAutocompleteLoading] = useState(false);
    const [stateOriginAucompleteNotFound, setstateOriginAucompleteNotFound] = useState(false);
    const [stateOriginResultVisibility, setstateOriginResultVisibility] = useState(false);
    const wrapperOriginRefCities = useRef<HTMLDivElement>(null);
    const [stateSelectedOrigin, setstateSelectedOrigin] = useState("");
    const [stateSelectedOriginCityID, setstateSelectedOriginCityID] = useState("");
    const [stateResultSearchCitiesOrigin, setstateResultSearchCitiesOrigin] = useState<IResultCitySearch[]>([])


    //city search destination state
    const [stateDestinationAutocompleteLoading, setstateDestinationAutocompleteLoading] = useState(false);
    const [stateDestinationAucompleteNotFound, setstateDestinationAucompleteNotFound] = useState(false);
    const [stateDestinationResultVisibility, setstateDestinationResultVisibility] = useState(false);
    const wrapperDestinationRefCities = useRef<HTMLDivElement>(null);
    const [stateSelectedDestination, setstateSelectedDestination] = useState("");
    const [stateSelectedDestinationCityID, setstateSelectedDestinationCityID] = useState("");
    const [stateResultSearchCitiesDestination, setstateResultSearchCitiesDestination] = useState<IResultCitySearch[]>([])


    const handleOriginInputClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {

        setstateOriginResultVisibility(!stateOriginResultVisibility);
        setstateSelectedOrigin("");
        setstateSelectedOriginCityID("");
        setstateResultSearchCitiesOrigin([]);
        setstateOriginAutocompleteLoading(false);
        setstateOriginAucompleteNotFound(false);
        setStateIsSearchResultEmpty(false);
        setState_events_data([]);
    };

    useEffect(() => {
        window.addEventListener("mousedown", handleOriginSeachCitiesClickAway);

        return () => {
            window.removeEventListener("mousedown", handleOriginSeachCitiesClickAway)
        }

    }, []);


    const handleOriginSeachCitiesClickAway = (event: { target: any; }) => {
        const { current: wrap } = wrapperOriginRefCities;
        if (wrap && !wrap.contains(event.target)) {
            setstateOriginResultVisibility(false);
        }
    }


    //select city from the list
    const handleOriginSelectedCityFromList = (event: React.MouseEvent<HTMLElement, MouseEvent>, cityOriginDetails: IResultCitySearch) => {


        setstateSelectedOrigin(cityOriginDetails.cityName);
        setstateSelectedOriginCityID(cityOriginDetails.cityID);
        setstateOriginResultVisibility(!stateOriginResultVisibility);



    };

    //search origin cities
    const searchOriginCities = async (event: React.ChangeEvent<HTMLInputElement>) => {


        const searchQuery = event.target.value;
        setstateSelectedOrigin(searchQuery);
        setstateOriginAutocompleteLoading(false);
        setstateOriginAucompleteNotFound(false);

        if (searchQuery.length >= 3) {



            setstateOriginAutocompleteLoading(true);

            try {


                const response = await axiosInstance.get(`auth/search/cities/${searchQuery}`);


                if (response.data.cities.length) {
                    setstateOriginAutocompleteLoading(false);
                    setstateOriginResultVisibility(true);
                    setstateResultSearchCitiesOrigin(response.data.cities);
                } else {
                    setstateOriginAutocompleteLoading(false);


                    setstateOriginAucompleteNotFound(true);

                }

               



            } catch (error) {

            }



        }




    };



    //destination input click
    const handleDestinationInputClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        setstateDestinationResultVisibility(!stateDestinationResultVisibility);
        setstateSelectedDestination("");
        setstateSelectedDestinationCityID("");
        setstateResultSearchCitiesDestination([]);
        setstateDestinationAutocompleteLoading(false);
        setstateDestinationAucompleteNotFound(false);
        setStateIsSearchResultEmpty(false);
        setState_events_data([]);

    };

    useEffect(() => {
        window.addEventListener("mousedown", handleDestinationSeachCitiesClickAway);

        return () => {
            window.removeEventListener("mousedown", handleDestinationSeachCitiesClickAway)
        }

    }, []);


    const handleDestinationSeachCitiesClickAway = (event: { target: any; }) => {
        const { current: wrap } = wrapperDestinationRefCities;
        if (wrap && !wrap.contains(event.target)) {

            setstateDestinationResultVisibility(false);
        }
    }


    //select city from list
    const handleDestinationSelectedCityFromList = (event: React.MouseEvent<HTMLElement, MouseEvent>, cityDetails: IResultCitySearch) => {



        setstateSelectedDestination(cityDetails.cityName);
        setstateSelectedDestinationCityID(cityDetails.cityID);
        setstateDestinationResultVisibility(!stateDestinationResultVisibility);
    };
    //search destination cities
    const searchDestinationCities = async (event: React.ChangeEvent<HTMLInputElement>) => {


        const searchQuery = event.target.value;
        setstateSelectedDestination(searchQuery);
        setstateDestinationAutocompleteLoading(false);
        setstateDestinationAucompleteNotFound(false);
        if (searchQuery.length >= 3) {


            setstateDestinationAutocompleteLoading(true);



            try {


                const response = await axiosInstance.get(`auth/search/cities/${searchQuery}`);


                if (response.data.cities.length) {
                    setstateDestinationAutocompleteLoading(false);
                    setstateDestinationResultVisibility(true);

                    setstateResultSearchCitiesDestination(response.data.cities);



                } else {
                    setstateDestinationAutocompleteLoading(false);


                    setstateDestinationAucompleteNotFound(true);

                }




            } catch (error) {

            }
        }




    };

    //submit search
    const onSubmit = (data: IEventSearch) => {

        setStateIsSearchInProgress(true);
        setStateIsSearchResultEmpty(false);


        scroll.scrollTo(640);
        let formData = new FormData();

        const FromPlace = stateSelectedOriginCityID;
        const ToPlace = stateSelectedDestinationCityID;
        formData.append("FromPlace", FromPlace);
        formData.append("ToPlace", ToPlace);
        formData.append("CompanyCode", String(comapnys_details_data_url));
        if (data.FromDate) {
            formData.append("FromDate", data.FromDate);
        }



        axiosInstance
            .post("auth/search/events/classes", formData)
            .then((response) => {

                if (response.status === 201 && response.data.eventClasses.length) {
                    setStateIsSearchInProgress(false);
                    setState_events_data(response.data.eventClasses)


                } else {
                    setStateIsSearchInProgress(false);
                    setStateIsSearchResultEmpty(true);
                }
            })
            .catch((error) => {

                setStateIsSearchInProgress(false);
             
            });
    }



    //render results cities origin
    let resultOriginCities;
    {
        if (stateResultSearchCitiesOrigin) {
            resultOriginCities = stateResultSearchCitiesOrigin.map((result) => {
                return (
                    <>

                        <li key={result.cityID}
                            onClick={(event) => handleOriginSelectedCityFromList(event, result)}
                        ><LocationOnIcon className="icon" style={{ fontSize: 20 }} />
                            <div className="city-data">
                                <div className="city">
                                    <span>{result.cityName}</span>
                                </div>
                                <div className="country">
                                    <span>{result.countryName}</span>
                                </div>



                            </div>

                        </li>
                    </>
                )

            });

        }
    }
    //render results cities destination
    let resultDestinationCities;
    {
        if (stateResultSearchCitiesDestination) {
            resultDestinationCities = stateResultSearchCitiesDestination.map((result) => {
                return (
                    <>

                        <li key={result.cityID}
                            onClick={(event) => handleDestinationSelectedCityFromList(event, result)}
                        ><LocationOnIcon className="icon" style={{ fontSize: 20 }} />
                            <div className="city-data">
                                <div className="city">
                                    <span>{result.cityName}</span>
                                </div>
                                <div className="country">
                                    <span>{result.countryName}</span>
                                </div>



                            </div>

                        </li>
                    </>
                )

            });

        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} >

            <div className="booking-form">
                <div className="booking-form-content">
                    <div className={stateOriginResultVisibility ? "booking-form-origin booking-form-origin-visible" : "booking-form-origin booking-form-origin-not-visible"}>
                        <div className="search-controls">

                            <LocationOnIcon className="icon" style={{ fontSize: 16 }} />
                            <input className="booking-select" type="search"
                                autoComplete="off"
                                name="FromPlace" ref={register({ required: true })}
                                value={stateSelectedOrigin}
                                onClick={(event) => handleOriginInputClick(event)}
                                placeholder="Enter an origin"
                                onChange={(event) => searchOriginCities(event)} />


                        </div>


                        <div ref={wrapperOriginRefCities} className="result-search-suggestion">
                            {
                                errors.FromPlace && <p className="error-search-message"> Origin city required</p>
                            }

                            {
                                stateOriginResultVisibility &&
                                <div className="result-search-suggestion-items">
                                    <ul>
                                        {resultOriginCities}

                                    </ul>
                                </div>


                            }

                            {

                                stateOriginAutocompleteLoading &&
                                <div className="result-search-loader">
                                    <PropagateLoader size={12} color="#0078d4" />

                                </div>
                            }
                            {

                                stateOriginAucompleteNotFound && <div className="result-search-error-text">

                                    <h3>City not found, please try again.</h3>
                                </div>

                            }






                        </div>

                    </div>



                    <div className={stateDestinationResultVisibility ? "booking-form-destination booking-form-destination-visible" : "booking-form-destination booking-form-destination-not-visible"}>
                        <div className="search-controls">
                            <LocationOnIcon className="icon" style={{ fontSize: 16 }} />
                            <input className="booking-select" type="search"
                                autoComplete="off"
                                name="ToPlace" ref={register({ required: true })}
                                value={stateSelectedDestination}
                                onClick={(event) => handleDestinationInputClick(event)}
                                placeholder="Enter a destination"
                                onChange={(event) => searchDestinationCities(event)}



                            />

                        </div>


                        <div ref={wrapperDestinationRefCities} className="result-search-suggestion">
                            {
                                errors.ToPlace && <p className="error-search-message">Destination city required</p>
                            }

                            {
                                stateDestinationResultVisibility &&
                                <div className="result-search-suggestion-items">
                                    <ul>
                                        {resultDestinationCities}

                                    </ul>
                                </div>


                            }

                            {

                                stateDestinationAutocompleteLoading &&
                                <div className="result-search-loader">
                                    <PropagateLoader size={12} color="#0078d4" />

                                </div>
                            }
                            {

                                stateDestinationAucompleteNotFound && <div className="result-search-error-text">

                                    <h3>City not found, please try again.</h3>
                                </div>

                            }






                        </div>

                    </div>

                    <div className="booking-form-start">

                        <input className="booking-input"
                            type="date" name="FromDate" ref={register()}

                        />


                    </div>

                    <div className="booking-form-btn">

                        <button className="btn-book-now" type="submit"> Search</button>
                    </div>

                </div>
            </div>
        </form>
    )
}

export default CustomerPortalSearchEventForm

