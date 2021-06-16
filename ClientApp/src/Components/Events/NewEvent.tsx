import React, { useEffect, useRef, useState } from 'react';
import '../../Styles/NewEvent.scss';
import { useForm } from "react-hook-form";
import {
    PropagateLoader,
    RiseLoader
} from 'react-spinners';
import TopNavigation from '../Navigation/TopNavigation';
import LeftNavigation from '../Navigation/LeftNavigation';
import axiosInstance from '../../Api/Api';
import Footer from '../Footer/Footer';
import IProduct from '../../Types/IProduct';
import INewEvent from '../../Types/INewEvents';
import IBranches from '../../Types/IBranches';
import ICategories from '../../Types/ICategories';
import ISubCategories from '../../Types/ISubCategories';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import { useAppSelector } from '../../App/hooks';
import { selectNavigationState } from '../../features/navigation/navigationSlice';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import IResultCitySearch from '../../Types/IResultCitySearch';
import BlockIcon from '@material-ui/icons/Block';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import ILanguages from '../../Types/ILanguages';


const NewEvent = (props: any) => {
    const { register, handleSubmit, errors } = useForm<INewEvent>();
    const [resultCreateCompanyError, SetresultCreateCompanyError] = useState(false);
    const [isCreateEventInProgress, SetIsCreateEventInProgress] = useState(false);
    const [stateProducts, setstateProducts] = useState<IProduct[]>([]);
    const [stateBranches, setStateBranches] = useState<IBranches[]>([]);
    const [stateIsPaymentOptionsFound, setstateIsPaymentOptionsFound] = useState(false);
    const [stateIsProductFound, statesetIsProductFound] = useState(false);

    const [stateLanguages, setStateLanguages] = useState<ILanguages[]>([]);
    const [stateProductCategory, setStateProductCategory] = useState<ICategories[]>([]);
    const [stateProductSubCategory, setStateProductSubCategory] = useState<ISubCategories[]>([]);
    const navState = useAppSelector(selectNavigationState);

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
            setstateOriginAucompleteNotFound(false);

        }
    }

    //select origin from  the list
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
            setstateDestinationAucompleteNotFound(false);

        }
    }



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
    //handle laguage change
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const languageId = parseInt(e.target.value);
        //retrive product categories
        //
        axiosInstance
            .get(`auth/categories/${languageId}`)
            .then((response) => {
                setStateProductCategory(response.data.list);

            })

            .catch((error) => {


            });


    }



    //handle cat change
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        //load subcategories for selected category
        //retrive product categories



        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };
        let categogyId = e.target.value;

        axiosInstance
            .get(`mst/subcategories/${categogyId}`, config)
            .then((response) => {

                setStateProductSubCategory(response.data.list);
                // console.table(response.data.list);

            })
            .catch((error) => {


            });
    };

    const config = {
        headers: { Authorization: sessionStorage.getItem("token") },
    };
    const onSubmit = (data: INewEvent) => {


        SetIsCreateEventInProgress(true);
        //   scroll.scrollToTop();
        let formData = new FormData();


        formData.append("ProductID", data.ProductID);

        formData.append("Name", data.Name);
        formData.append("Code", data.Code);
        formData.append("FromPlace", stateSelectedOriginCityID);
        formData.append("ToPlace", stateSelectedDestinationCityID);
        formData.append("FromAddress", data.FromAddress);
        formData.append("ToAddress", data.ToAddress);
        formData.append("FromDate", data.FromDate);
        formData.append("ToDate", data.ToDate);
        formData.append("FromHours", data.FromHours);
        formData.append("ToHours", data.ToHours);
        formData.append("Descriptions", data.Descriptions);





        axiosInstance
            .post("event", formData, config)
            .then((response) => {


                if (response.status === 201) {

                    props.history.push("/events/list");
                } else {

                    SetIsCreateEventInProgress(false);
                    SetresultCreateCompanyError(true)
                }


            })
            .catch((error) => {
                SetIsCreateEventInProgress(false);
                SetresultCreateCompanyError(true)

            });




    };




    useEffect(() => {



        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };
        //load products

        axiosInstance
            .get("product", config)
            .then((response) => {
                // setIsPageLoading(false);

                if (response.data.list.length) {
                    setstateProducts(response.data.list);
                    statesetIsProductFound(true);



                }
            })
            .catch((error) => {

                // setIsPageLoading(false);
            });


        //retrieve payment options
        axiosInstance
            .get(`company_payment_method`, config)
            .then((response) => {


                if (response.data.list.length) {
                    setstateIsPaymentOptionsFound(true);



                } else {
                    setstateIsPaymentOptionsFound(false);





                }

            })
            .catch((error) => {
                setstateIsPaymentOptionsFound(false);



            });



        //load branches
        axiosInstance
            .get("branch", config)
            .then((response) => {
                setStateBranches(response.data.list);
                console.table(response.data);
            })
            .catch((error) => {


            });


        axiosInstance
            .get(`auth/languages`)
            .then((response) => {

                if (response.data) {
                    setStateLanguages(response.data.languages);
                }

            })
            .catch((error) => {

            });


    }, []);



    //render product list for dropdown display

    let listProducts;
    if (stateProducts) {
        listProducts = stateProducts.map((product, productID) => {
            return (
                <>

                    <option key={productID} value={product.productID} >
                        {product.name}
                    </option>
                </>
            )

        });
    }


    //render branches list for dropdown display

    let listBranches;

    if (stateBranches) {

        listBranches = stateBranches.map((branch, branchID) => {
            return (
                <>

                    <option key={branchID} value={branch.branchID} >
                        {branch.name}
                    </option>
                </>
            )

        });
    }





    //render categories list for dropdown display

    let listCategories;

    if (stateProductCategory) {
        listCategories = stateProductCategory.map((category, categoryID) => {
            return (
                <>

                    <option key={categoryID} value={category.categoryID} >
                        {category.name}
                    </option>
                </>
            )

        });
    }

    //render sub cat list for dropdown display

    let listSubCategories;
    if (stateProductSubCategory) {
        listSubCategories = stateProductSubCategory.map((subCategory, subcategoryID) => {
            return (
                <>

                    <option key={subcategoryID} value={subCategory.subcategoryID} >
                        {subCategory.name}
                    </option>
                </>
            )

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
                                <div className="new-event-container-header">
                                    <h1 className="page-header-new-event">Create Event</h1>

                                </div>
                                {
                                    resultCreateCompanyError && <div className="create-event-alert">
                                        <p>There was a problem while creating a new event. Please try again.</p>
                                    </div>
                                }

                                {isCreateEventInProgress &&
                                    <div className="loader-icon-create-event">

                                        <RiseLoader size={15} margin="2" color="#0078d4" />
                                    </div>

                                }


                                {stateIsPaymentOptionsFound && stateIsProductFound ?


                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-new-event">
                                            <div className="form-new-event-left">
                                                <div className="form-control">
                                                    <select name="ProductID" ref={register({ required: true })}
                                                        disabled={isCreateEventInProgress}
                                                    >
                                                        <option></option>
                                                        {listProducts}
                                                    </select>

                                                    <div className="input-undeline"></div>
                                                    <label>Product</label>
                                                    {errors.ProductID && <span className="required-field">Please select a product</span>}

                                                </div>
                                                <div className="form-control">
                                                    <select name="LanguageID" ref={register({ required: true })}
                                                        disabled={isCreateEventInProgress} onChange={(event) => handleLanguageChange(event)} >
                                                        <option></option>
                                                        {stateLanguages.map((option) => (
                                                            <option value={option.languageID}>{option.name}</option>
                                                        ))}
                                                    </select>
                                                    <div className="input-undeline"></div>
                                                    <label>Language</label>
                                                    {/* {errors.LanguageID && <span className="required-field">Please provide a valid language</span>} */}
                                                </div>



                                                <div className="form-control">
                                                    <select name="categoryID" ref={register({ required: true })}
                                                        disabled={isCreateEventInProgress}
                                                        onChange={(event) => handleCategoryChange(event)}
                                                    >
                                                        <option></option>
                                                        {listCategories}
                                                    </select>

                                                    <div className="input-undeline"></div>
                                                    <label>Category</label>
                                                    {errors.categoryID && <span className="required-field">Please provide a valid category</span>}

                                                </div>



                                                <div className="form-control">
                                                    <input type="text" name="Name" ref={register({ required: true })}
                                                        disabled={isCreateEventInProgress} />
                                                    <div className="input-undeline"></div>
                                                    <label>Name</label>
                                                    {errors.Name && <span className="required-field">Please provide a valid name</span>}

                                                </div>
                                                <div className="form-control">
                                                    <input type="text" name="Code" ref={register({ required: true })}
                                                        disabled={isCreateEventInProgress} />
                                                    <div className="input-undeline"></div>
                                                    <label>Event Code</label>
                                                    {errors.Code && <span className="required-field">Please provide a valid event code</span>}

                                                </div>


                                                <div className="form-control-auto-complete">
                                                    <input type="text"

                                                        autoComplete="off"
                                                        name="FromPlace" ref={register({ required: true })}
                                                        value={stateSelectedOrigin}
                                                        onClick={(event) => handleOriginInputClick(event)}

                                                        onChange={(event) => searchOriginCities(event)}
                                                    />
                                                    <div className="input-undeline"></div>
                                                    <label>Origin</label>
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



                                                <div className="form-control-auto-complete">
                                                    <input type="text"
                                                        autoComplete="off"

                                                        name="ToPlace" ref={register({ required: true })}
                                                        value={stateSelectedDestination}
                                                        onClick={(event) => handleDestinationInputClick(event)}

                                                        onChange={(event) => searchDestinationCities(event)}
                                                    />
                                                    <div className="input-undeline"></div>
                                                    <label>Destination</label>
                                                </div>
                                                <div ref={wrapperDestinationRefCities} className="result-search-suggestion">
                                                    {
                                                        errors.ToPlace && <p className="error-search-message"> Origin city required</p>
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


                                                <div className="form-control">
                                                    <input type="text"
                                                        name="FromAddress" ref={register({ required: true })}
                                                        disabled={isCreateEventInProgress}
                                                    />
                                                    <div className="input-undeline"></div>
                                                    <label>From Address</label>
                                                    {errors.FromAddress && <span className="required-field">Please provide a valid address</span>}
                                                </div>


                                            </div>



                                            <div className="form-new-event-right">


                                                <div className="form-control">
                                                    <input type="text"
                                                        name="ToAddress" ref={register({ required: true })}
                                                        disabled={isCreateEventInProgress}
                                                    />
                                                    <div className="input-undeline"></div>
                                                    <label>To address</label>
                                                    {errors.ToAddress && <span className="required-field">Please provide a valid address</span>}
                                                </div>
                                                <div className="form-control">
                                                    <input type="date"
                                                        name="FromDate" ref={register({ required: true })}
                                                        disabled={isCreateEventInProgress}
                                                    />
                                                    <div className="input-undeline"></div>
                                                    <label>From Date</label>
                                                    {errors.FromDate && <span className="required-field">Please provide a valid date</span>}
                                                </div>
                                                <div className="form-control">
                                                    <input type="date"
                                                        name="ToDate" ref={register({ required: true })}
                                                        disabled={isCreateEventInProgress}
                                                    />
                                                    <div className="input-undeline"></div>
                                                    <label>To Date</label>
                                                    {errors.ToDate && <span className="required-field">Please provide a valid date</span>}
                                                </div>

                                                <div className="form-control">
                                                    <input type="time"
                                                        name="FromHours" ref={register({ required: true })}
                                                        disabled={isCreateEventInProgress}
                                                    />
                                                    <div className="input-undeline"></div>
                                                    <label>Start Time</label>
                                                    {errors.FromHours && <span className="required-field">Please provide a valid time</span>}
                                                </div>

                                                <div className="form-control">
                                                    <input type="time"
                                                        name="ToHours" ref={register({ required: true })}
                                                        disabled={isCreateEventInProgress}
                                                    />
                                                    <div className="input-undeline"></div>
                                                    <label>End Time</label>
                                                    {errors.ToHours && <span className="required-field">Please provide a valid time</span>}
                                                </div>




                                                <div className="form-control">
                                                    <input type="text" name="Descriptions" ref={register({ required: true })}
                                                        disabled={isCreateEventInProgress} />
                                                    <div className="input-undeline"></div>
                                                    <label>Descriptions</label>
                                                    {errors.Descriptions && <span className="required-field">Please provide a valid Descriptions</span>}
                                                </div>






                                            </div>
                                        </div>

                                        {
                                            !isCreateEventInProgress && <button className="btn-create-event" type="submit">Create event</button>

                                        }




                                    </form>
                                    :
                                    !stateIsProductFound ?
                                        <div className="container-payment-option-not-found">
                                            <div className="payment-option-not-found">
                                                <div className="container-no-payment-option-found-icon">
                                                    <BlockIcon style={{ fontSize: 70 }} />
                                                </div>
                                                <div className="container-no-payment-option-found-text">
                                                    <h2> You do not have any products  at the moment, you need to have at least one product to create an event.
                                                    </h2>

                                                    <Link className="link-create-payment-option" to="/products/new"> <AddIcon className="icon-add-payment-option" style={{ fontSize: 18 }} />Create product </Link>

                                                </div>
                                            </div>
                                        </div>
                                        :
                                        !stateIsPaymentOptionsFound ?
                                            <div className="container-payment-option-not-found">
                                                <div className="payment-option-not-found">
                                                    <div className="container-no-payment-option-found-icon">
                                                        <BlockIcon style={{ fontSize: 70 }} />
                                                    </div>
                                                    <div className="container-no-payment-option-found-text">
                                                        <h2> You do not have any payment options at the moment, you need at least one payment option to create a product.
                                                        </h2>

                                                        <Link className="link-create-payment-option" to="/payments/new"> <AddIcon className="icon-add-payment-option" style={{ fontSize: 18 }} />Create payment option</Link>

                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            ""


                                }



                            </div>

                        </div>


                    </div>

                </div>


            </div >




            <BackToTopButton />
            <Footer />

        </div >


    )
}

export default NewEvent
