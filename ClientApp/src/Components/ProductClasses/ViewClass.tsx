import React, { useEffect, useRef, useState } from 'react';
import '../../Styles/NewClass.scss';
import { useForm } from "react-hook-form";
import {
    PropagateLoader,
    RiseLoader
} from 'react-spinners';
import TopNavigation from '../Navigation/TopNavigation';
import LeftNavigation from '../Navigation/LeftNavigation';
import axiosInstance from '../../Api/Api';
import ICities from '../../Types/ICities';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import Footer from '../Footer/Footer';
import INewClass from '../../Types/INewClass';
import IProduct from '../../Types/IProduct';
import LocationOnIcon from '@material-ui/icons/LocationOn';


import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { GridLoader } from 'react-spinners';
import BlockIcon from '@material-ui/icons/Block';
import { useAppSelector } from '../../App/hooks';
import { selectNavigationState } from '../../features/navigation/navigationSlice';
import IViewProductClass from '../../Types/IViewProductClass';
import IUpdateProductClass from '../../Types/IUpdateProductClass';
import IResultCitySearch from '../../Types/IResultCitySearch';





const ViewClass = (props: any) => {
    const { register, handleSubmit, errors } = useForm<IUpdateProductClass>();
    const [resultCreateProductError, SetresultCreateProductError] = useState(false);
    const [isCreateProductInProgress, SetisCreateProductInProgress] = useState(false);
    const [isProductListEmpty, SetisProductListEmpty] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [stateCities, setStateCities] = useState<ICities[]>([]);
    const [stateProducts, setstateProducts] = useState<IProduct[]>([]);
    const navState = useAppSelector(selectNavigationState);
    const [stateProductClass, setstateProductClass] = useState<IViewProductClass>();
    const productClassId: string = props.match.params.productClassId;
    const [stateisProductClassInEditMode, setstateisProductClassInEditMode] = useState(false);
    const numberPatterns = /^[0-9]*$/;

    const productClassesList = JSON.parse(sessionStorage.getItem('productclassesList') || '{}');
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




    const onSubmit = (data: IUpdateProductClass) => {


        SetisCreateProductInProgress(true);
        //   scroll.scrollToTop();
        let formData = new FormData();



        formData.append("ProductID", String(stateProductClass?.products_productID));
        formData.append("SubcategoryID", String(stateProductClass?.products_subcategoryID));
        formData.append("Name", data.Name);
        formData.append("Code", data.Code);
        formData.append("FromPlace", data.FromPlace);
        formData.append("ToPlace", data.ToPlace);
        formData.append("FromAddress", data.FromAddress);
        formData.append("ToAddress", data.ToAddress);

        formData.append("Descriptions", data.Descriptions);



        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };
        axiosInstance
            .put("class", formData, config)
            .then((response) => {





                if (response.data.results) {

                    props.history.push("/products/list");
                } else {

                    SetisCreateProductInProgress(false);
                    SetresultCreateProductError(true)
                }


            })
            .catch((error) => {
                SetisCreateProductInProgress(false);
                SetresultCreateProductError(true)

            });




    };

    //class details

    useEffect(() => {


        if (productClassesList) {

            const retrieveProductClass = productClassesList.find((productClass: { classes_classID: string; }) => productClass.classes_classID === productClassId);
            setstateProductClass(retrieveProductClass);





        } else {

            props.history.push("/classes/list");
        }

    }, [])



    //load destinations
    useEffect(() => {
        //auth/cities
        axiosInstance
            .get(`auth/cities`)
            .then((response) => {

                if (response.data) {
                    setStateCities(response.data.cities);


                }

            })
            .catch((error) => {




            });
        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };
        axiosInstance
            .get("product", config)
            .then((response) => {
                setIsPageLoading(false);

                if (response.data.list.length) {

                    const productList = response.data.list;
                    setstateProducts(productList);

                } else {

                    SetisProductListEmpty(true);

                }
            })
            .catch((error) => {

                setIsPageLoading(false);
            });


        axiosInstance
            .get("company_payment_method", config)
            .then((response) => {

                console.table(response.data.list);

            })
            .catch((error) => {


            });

    }, []);


    let listCities;

    if (stateCities) {
        listCities = stateCities.map((city, cityID) => {
            return (
                <>

                    <option key={cityID} value={city.cityID} >
                        {city.name}
                    </option>
                </>
            )

        });

    }


    let listProducts;


    if (stateProducts) {
        listProducts = stateProducts.map((product, productID) => {
            return (
                <>

                    <option key={productID} value={product.ProductID} >
                        {product.name}
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
        <div className="new-classes">


            <div className="new-classes-container">
                <div className={navState ? "page-left-navigation" : "page-left-navigation-hidden"}>
                    <LeftNavigation />
                </div>

                <div className="page-top-right-navigation-page-content">
                    <div className="top-right-navigation">

                        <TopNavigation />
                    </div>
                    <div className="page-content">
                        <div className="new-class">

                            <div className="new-class-form-container">
                                <div className="new-class-container-header">
                                    <h1 className="page-header-new-class">View Class</h1>

                                </div>
                                {
                                    resultCreateProductError && <div className="create-class-alert">
                                        <p>There was a problem while creating a new product class. Please try again.</p>
                                    </div>
                                }

                                {isCreateProductInProgress &&
                                    <div className="loader-icon-create-class">

                                        <RiseLoader size={15} margin="2" color="#0078d4" />
                                    </div>

                                }
                                {
                                    isPageLoading
                                        ?

                                        <div className="loader-icon-create-class">

                                            <GridLoader size={20} margin={2} color="#0078d4" />

                                        </div>

                                        :


                                        isProductListEmpty
                                            ?
                                            <div className="container-no-class-found">
                                                <div className="container-no-class-found-icon">
                                                    <BlockIcon style={{ fontSize: 70 }} />
                                                </div>
                                                <div className="container-no-class-found-text">
                                                    <h2> You do not have any products at the moment, you need to have at least one product to create a class.
                                                    </h2>

                                                    <Link className="link-create-class" to="/products/new"> <AddIcon className="icon-add-class" style={{ fontSize: 18 }} />Create product</Link>

                                                </div>


                                            </div>

                                            :
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="form-new-class">
                                                    <div className="form-new-class-left">


                                                        {
                                                            stateisProductClassInEditMode &&
                                                            <div className="form-control">
                                                                <select name="ProductID" ref={register({ required: true })}
                                                                >
                                                                    <option></option>
                                                                    {listProducts}
                                                                </select>

                                                                <div className="input-undeline"></div>
                                                                <label>Product</label>
                                                                {errors.ProductID && <span className="required-field">Please select a product</span>}
                                                            </div>
                                                        }



                                                        <div className="form-control">
                                                            <input type="text" name="Name"
                                                                defaultValue={stateProductClass?.classes_name}
                                                                ref={register({ required: true })}
                                                                readOnly={!stateisProductClassInEditMode} />
                                                            <div className="input-undeline"></div>
                                                            <label>Name</label>
                                                            {errors.Name && <span className="required-field">Please provide a valid name</span>}

                                                        </div>




                                                        <div className="form-control">
                                                            <input type="text"
                                                                defaultValue={stateProductClass?.classes_code}
                                                                name="Code" ref={register({ required: true })}
                                                                readOnly={!stateisProductClassInEditMode} />
                                                            <div className="input-undeline"></div>
                                                            <label>Class Code</label>
                                                            {errors.Code && <span className="required-field">Please provide a valid code</span>}

                                                        </div>
                                                        {
                                                            !stateisProductClassInEditMode &&
                                                            <div className="form-control">
                                                                <input type="text" name="classes_fromPlaceName"
                                                                    defaultValue={stateProductClass?.classes_fromPlaceName}
                                                                    ref={register({ required: true })}
                                                                    readOnly={!stateisProductClassInEditMode} />
                                                                <div className="input-undeline"></div>
                                                                <label>Origin</label>
                                                                {errors.classes_fromPlaceName && <span className="required-field">Please provide a valid name</span>}

                                                            </div>

                                                        }

                                                        {
                                                            !stateisProductClassInEditMode &&
                                                            <div className="form-control">
                                                                <input type="text"
                                                                    defaultValue={stateProductClass?.classes_toPlaceName}
                                                                    name="classes_toPlaceName" ref={register({ required: true })}
                                                                    readOnly={!stateisProductClassInEditMode} />
                                                                <div className="input-undeline"></div>
                                                                <label>Destination</label>
                                                                {errors.classes_toPlaceName && <span className="required-field">Please provide a valid code</span>}

                                                            </div>
                                                        }
                                                        <div className="form-control">
                                                            <input type="text"
                                                                defaultValue={stateProductClass?.classes_fromAddress}
                                                                name="FromAddress" ref={register({ required: true })}
                                                                readOnly={!stateisProductClassInEditMode} />
                                                            <div className="input-undeline"></div>
                                                            <label>From Address</label>
                                                            {errors.FromAddress && <span className="required-field">Please provide a valid code</span>}

                                                        </div>
                                                        <div className="form-control">
                                                            <input type="text"
                                                                defaultValue={stateProductClass?.classes_toAddress}
                                                                name="ToAddress" ref={register({ required: true })}
                                                                readOnly={!stateisProductClassInEditMode} />
                                                            <div className="input-undeline"></div>
                                                            <label>To Address</label>
                                                            {errors.ToAddress && <span className="required-field">Please provide a valid code</span>}

                                                        </div>
                                                        <div className="form-control">
                                                            <input type="text"
                                                                defaultValue={stateProductClass?.classes_price}
                                                                name="Price" ref={register({ required: true, pattern: numberPatterns })}
                                                                readOnly={!stateisProductClassInEditMode} />
                                                            <div className="input-undeline"></div>
                                                            <label>Price</label>
                                                            {errors.Price && <span className="required-field">Please provide a valid Price</span>}

                                                        </div>




                                                    </div>



                                                    <div className="form-new-class-right ">


                                                        <div className="form-control">
                                                            <input type="text"
                                                                defaultValue={stateProductClass?.classes_totalNumberOfTickets}
                                                                name="TotalNumberOfTickets" ref={register({ required: true, pattern: numberPatterns })}
                                                                readOnly={!stateisProductClassInEditMode} />
                                                            <div className="input-undeline"></div>
                                                            <label>Total Number Of Tickets</label>
                                                            {errors.TotalNumberOfTickets && <span className="required-field">Please provide a valid Price</span>}

                                                        </div>







                                                        <div className="form-control">
                                                            <input type="text"
                                                                defaultValue={stateProductClass?.classes_ticketsRangedFrom}
                                                                name="TicketsRangedFrom"
                                                                ref={register({ required: true, pattern: numberPatterns, min: 1 })}
                                                                readOnly={!stateisProductClassInEditMode} />
                                                            <div className="input-undeline"></div>
                                                            <label> Tickets Ranged From</label>
                                                            {errors.TicketsRangedFrom && <span className="required-field">Please provide a valid range</span>}

                                                        </div>

                                                        <div className="form-control">
                                                            <input type="text"
                                                                name="TicketsRangedTo"
                                                                defaultValue={stateProductClass?.classes_ticketsRangedTo}
                                                                ref={register({ required: true, pattern: numberPatterns, min: 1 })}

                                                                readOnly={!stateisProductClassInEditMode} />
                                                            <div className="input-undeline"></div>
                                                            <label>Tickets Ranged To</label>
                                                            {errors.TicketsRangedTo && <span className="required-field">Please provide a valid range</span>}

                                                        </div>

                                                        {/* {
                                                            stateisProductClassInEditMode &&

                                                            <div className="form-control">
                                                                <select name="FromPlace" ref={register({ required: true })}

                                                                >
                                                                    <option></option>
                                                                    {listCities}
                                                                </select>
                                    
                                                                <div className="input-undeline"></div>
                                                                <label>Origin</label>
                                                                {errors.FromPlace && <span className="required-field">Please provide a valid city</span>}
                                                            </div>
                                                        } */}

                                                        {/* {
                                                            stateisProductClassInEditMode &&
                                                            <div className="form-control">
                                                                <select name="ToPlace" ref={register({ required: true })}

                                                                >
                                                                    <option></option>
                                                                    {listCities}
                                                                </select>
                                      
                                                                <div className="input-undeline"></div>
                                                                <label>Destination</label>
                                                                {errors.ToPlace && <span className="required-field">Please provide a valid city</span>}
                                                            </div>
                                                        } */}





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
                                                                defaultValue={stateProductClass?.classes_descriptions}
                                                                name="Descriptions" ref={register({ required: true })}
                                                                readOnly={!stateisProductClassInEditMode} />
                                                            <div className="input-undeline"></div>
                                                            <label>Descriptions</label>
                                                            {errors.Descriptions && <span className="required-field">Please provide a valid Descriptions</span>}
                                                        </div>




                                                    </div>
                                                </div>


                                                {
                                                    !stateisProductClassInEditMode && <button className="btn-create-class" onClick={() => setstateisProductClassInEditMode(true)}>Edit Product Class</button>


                                                }
                                                {
                                                    stateisProductClassInEditMode && <button className="btn-update-class" type="submit">Update Product Class</button>

                                                }
                                                {
                                                    stateisProductClassInEditMode && <button className="btn-create-class" onClick={() => setstateisProductClassInEditMode(false)}>Cancel Edit </button>


                                                }





                                            </form>



                                }



                            </div>

                        </div>
                        <BackToTopButton />

                    </div>

                </div>


            </div>




            <BackToTopButton />
            <Footer />

        </div>


    )
}

export default ViewClass

