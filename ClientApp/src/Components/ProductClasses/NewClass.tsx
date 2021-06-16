import React, { useEffect, useRef, useState } from 'react';
import '../../Styles/NewClass.scss';
import { useForm } from "react-hook-form";

import TopNavigation from '../Navigation/TopNavigation';
import LeftNavigation from '../Navigation/LeftNavigation';
import axiosInstance from '../../Api/Api';
import ICities from '../../Types/ICities';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import Footer from '../Footer/Footer';
import INewClass from '../../Types/INewClass';
import IProduct from '../../Types/IProduct';



import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { GridLoader, PropagateLoader } from 'react-spinners';
import BlockIcon from '@material-ui/icons/Block';
import { useAppSelector } from '../../App/hooks';
import { selectNavigationState } from '../../features/navigation/navigationSlice';
import ICategories from '../../Types/ICategories';
import ISubCategories from '../../Types/ISubCategories';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import IResultCitySearch from '../../Types/IResultCitySearch';
import ILanguages from '../../Types/ILanguages';




const NewClass = (props: any) => {
    const { register, handleSubmit, errors } = useForm<INewClass>();
    const [resultCreateProductError, SetresultCreateProductError] = useState(false);
    const [isCreateProductInProgress, SetisCreateProductInProgress] = useState(false);
    const [isProductListEmpty, SetisProductListEmpty] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    //const [stateCities, setStateCities] = useState<ICities[]>([]);
    const [stateProducts, setstateProducts] = useState<IProduct[]>([]);
    const navState = useAppSelector(selectNavigationState);
    const [stateLanguages, setStateLanguages] = useState<ILanguages[]>([]);
    const [stateProductCategory, setStateProductCategory] = useState<ICategories[]>([]);
    const [stateProductSubCategory, setStateProductSubCategory] = useState<ISubCategories[]>([]);
    const [stateNavItemOpen, setNavItemOpen] = useState(true);
    const [stateIsSingleClassProduct, setstateIsSingleClassProduct] = useState(false);
    //const numberPatterns = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const numberPatterns = /^[0-9]*$/;
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
        // setstateResultSearchCitiesOrigin([]);
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
        }
    }

    //select origin from  the list
    const handleOriginSelectedCityFromList = (event: React.MouseEvent<HTMLElement, MouseEvent>, cityOriginDetails: IResultCitySearch) => {


        setstateSelectedOrigin(cityOriginDetails.cityName);
        setstateSelectedOriginCityID(cityOriginDetails.cityID);
        // setstateSelectedOrigin(cityOriginDetails);
        // setstateSelectedOriginCityID(cityOriginDetails);
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
        // setstateResultSearchCitiesDestination([]);
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
        }
    }


    //event: React.MouseEvent<HTMLLIElement, MouseEvent>
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

    }




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



    const onSubmit = (data: INewClass) => {

        SetisCreateProductInProgress(true);
        //   scroll.scrollToTop();
        let formData = new FormData();
        const ticketRangeFrom = data.TicketsRangedFrom | 1;



        const TotalNumberOfTickets = data.TicketsRangedTo - ticketRangeFrom;


        formData.append("ProductID", data.ProductID);
        formData.append("Name", data.Name);
        formData.append("Code", data.Code);
        formData.append("Price", data.Price);
        formData.append("FromPlace", stateSelectedOriginCityID);
        formData.append("ToPlace", stateSelectedDestinationCityID);
        formData.append("FromAddress", data.FromAddress);
        formData.append("ToAddress", data.ToAddress);
        formData.append("SubcategoryID", data.SubcategoryID);
        formData.append("TicketsRangedFrom", String(ticketRangeFrom));
        formData.append("TicketsRangedTo", String(data.TicketsRangedTo));
        formData.append("TotalNumberOfTickets", String(TotalNumberOfTickets));
        formData.append("Descriptions", data.Descriptions);


        formData.append("FromDate", data.FromDate);
        formData.append("ToDate", data.ToDate);
        formData.append("FromHours", data.FromHours);
        formData.append("ToHours", data.ToHours);








        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };
        axiosInstance
            .post("class", formData, config)
            .then((response) => {

                if (response.status === 201) {

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


    //handle cat change
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        //load subcategories for selected category
        //retrive product categories



        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };
        let categogyId = Number(e.target.value);
        if (categogyId === 1) {
            setstateIsSingleClassProduct(true);
        } else {
            setstateIsSingleClassProduct(false);
        }


        axiosInstance
            .get(`mst/subcategories/${categogyId}`, config)
            .then((response) => {

                setStateProductSubCategory(response.data.list);
                // console.table(response.data.list);

            })
            .catch((error) => {


            });
    };


    //load destinations
    useEffect(() => {
        //languages 

        axiosInstance
            .get(`auth/languages`)
            .then((response) => {

                if (response.data) {
                    setStateLanguages(response.data.languages);
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
                    setstateProducts(response.data.list);


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






    let listProducts;
    if (stateProducts) {
        listProducts = stateProducts.map((product) => {


            return (
                <>

                    <option key={product.productID} value={product.productID} >
                        {product.name}
                    </option>
                </>
            )

        });
    }




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
                                    <h1 className="page-header-new-class">Create Product Class</h1>

                                </div>
                                {
                                    resultCreateProductError && <div className="create-class-alert">
                                        <p>There was a problem while creating a new product class. Please try again.</p>
                                    </div>
                                }

                                {isCreateProductInProgress &&
                                    <div className="loader-icon-create-class">

                                        <GridLoader size={15} margin="2" color="#0078d4" />
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
                                                        <div className="form-control">
                                                            <select name="ProductID" ref={register({ required: true })}
                                                                disabled={isCreateProductInProgress}
                                                            >
                                                                <option></option>
                                                                {listProducts}
                                                            </select>

                                                            <div className="input-undeline"></div>
                                                            <label>Product</label>
                                                            {errors.ProductID && <span className="required-field">Please select a product</span>}
                                                        </div>


                                                        <div className="form-control">
                                                            <input type="text" name="Name" ref={register({ required: true })}
                                                                disabled={isCreateProductInProgress} />
                                                            <div className="input-undeline"></div>
                                                            <label>Name</label>
                                                            {errors.Name && <span className="required-field">Please provide a valid name</span>}

                                                        </div>




                                                        {/* <div className="form-control">
                        <input type="text" name="BranchID" ref={register({ required: true })}
                            disabled={isCreateProductInProgress} />
                        <div className="input-undeline"></div>
                        <label>Branch name</label>
                        {errors.BranchID && <span className="required-field">Please provide a valid name</span>}

                    </div> */}
                                                        <div className="form-control">
                                                            <input type="text" name="Code" ref={register({ required: true })}
                                                                disabled={isCreateProductInProgress} />
                                                            <div className="input-undeline"></div>
                                                            <label>Class Code</label>
                                                            {errors.Code && <span className="required-field">Please provide a valid code</span>}

                                                        </div>
                                                        <div className="form-control">
                                                            <input type="text" name="Price" ref={register({ required: true, pattern: numberPatterns })}
                                                                disabled={isCreateProductInProgress} />
                                                            <div className="input-undeline"></div>
                                                            <label>Class Price</label>
                                                            {errors.Price && <span className="required-field">Please provide a valid Price</span>}

                                                        </div>
                                                        <div className="form-control">
                                                            <select name="LanguageID" ref={register({ required: true })}
                                                                disabled={isCreateProductInProgress} onChange={(event) => handleLanguageChange(event)} >
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
                                                                disabled={isCreateProductInProgress}
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
                                                            <select name="subcategoryID" ref={register({ required: true })}
                                                                disabled={isCreateProductInProgress}
                                                            >
                                                                <option></option>
                                                                {listSubCategories}
                                                            </select>

                                                            <div className="input-undeline"></div>
                                                            <label>Sub Category</label>
                                                            {errors.SubcategoryID && <span className="required-field">Please provide a valid sub category</span>}

                                                        </div>

                                                        {
                                                            !stateIsSingleClassProduct &&
                                                            <>
                                                                <div className="form-control">
                                                                    <input type="text" name="TicketsRangedFrom"
                                                                        ref={register({ required: true, pattern: numberPatterns, min: 1 })}
                                                                        disabled={isCreateProductInProgress} />
                                                                    <div className="input-undeline"></div>
                                                                    <label> Tickets Ranged From</label>
                                                                    {errors.TicketsRangedFrom && <span className="required-field">Please provide a valid range</span>}

                                                                </div>


                                                            </>
                                                        }

                                                        {
                                                            stateIsSingleClassProduct &&
                                                            <>


                                                                <div className="form-control">
                                                                    <select
                                                                        name="TicketsRangedTo"
                                                                        ref={register({ required: true })}
                                                                        disabled={isCreateProductInProgress}
                                                                    >
                                                                        <option></option>
                                                                        <option value="37">36 Seats bus</option>
                                                                        <option value="51">50 Seats bus</option>
                                                                        <option value="61">60 Seats bus</option>
                                                                        <option value="63">62 Seats bus</option>
                                                                        <div className="input-undeline"></div>



                                                                    </select>
                                                                    <div className="input-undeline"></div>
                                                                    <label>Select number of seats</label>
                                                                    {errors.TicketsRangedTo && <span className="required-field">Please provide a valid range</span>}

                                                                    {/* <input type="text"
                                                                        name="TicketsRangedTo"
                                                                        ref={register({ required: true, pattern: numberPatterns, min: 1 })}
                                                                        disabled={isCreateProductInProgress} />
                                                                    <div className="input-undeline"></div>
                                                                    <label>Tickets Ranged To</label>
                                                                    {errors.TicketsRangedTo && <span className="required-field">Please provide a valid range</span>} */}

                                                                </div>
                                                            </>
                                                        }






                                                        {
                                                            !stateIsSingleClassProduct &&
                                                            <>


                                                                <div className="form-control">
                                                                    <input type="text"
                                                                        name="TicketsRangedTo"
                                                                        ref={register({ required: true, pattern: numberPatterns, min: 1 })}
                                                                        disabled={isCreateProductInProgress} />
                                                                    <div className="input-undeline"></div>
                                                                    <label>Tickets Ranged To</label>
                                                                    {errors.TicketsRangedTo && <span className="required-field">Please provide a valid range</span>}

                                                                </div>
                                                            </>
                                                        }



                                                        {/* <div className="form-control">
                                                            <select name="FromPlace" ref={register({ required: true })}
                                                                disabled={isCreateProductInProgress}
                                                            >
                                                                <option></option>
                                                                {listCities}
                                                            </select>
                                            
                                                            <div className="input-undeline"></div>
                                                            <label>Origin</label>
                                                            {errors.FromPlace && <span className="required-field">Please provide a valid city</span>}
                                                        </div> */}


                                                        <div className="form-control-auto-complete">
                                                            <input type="text"


                                                                name="FromPlace" ref={register({ required: true })}
                                                                autoComplete="off"
                                                                value={stateSelectedOrigin}
                                                                onClick={(event) => handleOriginInputClick(event)}
                                                                placeholder="Enter an origin"
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



                                                    </div>



                                                    <div className="form-new-class-right ">



                                                        <div className="form-control-auto-complete">
                                                            <input type="text"


                                                                name="ToPlace" ref={register({ required: true })}
                                                                autoComplete="off"
                                                                value={stateSelectedDestination}
                                                                onClick={(event) => handleDestinationInputClick(event)}
                                                                placeholder="Enter a destination"
                                                                onChange={(event) => searchDestinationCities(event)}
                                                            />
                                                            <div className="input-undeline"></div>
                                                            <label>Destination</label>
                                                        </div>
                                                        <div ref={wrapperDestinationRefCities} className="result-search-suggestion">
                                                            {
                                                                errors.FromPlace && <p className="error-search-message"> Origin city required</p>
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


                                                        <div className="form-control">
                                                            <input type="text"
                                                                name="FromAddress" ref={register({ required: true })}
                                                                disabled={isCreateProductInProgress}
                                                            />
                                                            <div className="input-undeline"></div>
                                                            <label>From Address</label>
                                                            {errors.FromAddress && <span className="required-field">Please provide a valid address</span>}
                                                        </div>

                                                        <div className="form-control">
                                                            <input type="text"
                                                                name="ToAddress" ref={register({ required: true })}
                                                                disabled={isCreateProductInProgress}
                                                            />
                                                            <div className="input-undeline"></div>
                                                            <label>To address</label>
                                                            {errors.ToAddress && <span className="required-field">Please provide a valid address</span>}
                                                        </div>







                                                        <div className="form-control">
                                                            <input type="text" name="Descriptions" ref={register({ required: true })}
                                                                disabled={isCreateProductInProgress} />
                                                            <div className="input-undeline"></div>
                                                            <label>Descriptions</label>
                                                            {errors.Descriptions && <span className="required-field">Please provide a valid Descriptions</span>}
                                                        </div>


                                                        <div className="form-control">
                                                            <input type="date"
                                                                name="FromDate" ref={register({ required: true })}
                                                                disabled={isCreateProductInProgress}
                                                            />
                                                            <div className="input-undeline"></div>
                                                            <label>From Date</label>
                                                            {errors.FromDate && <span className="required-field">Please provide a valid date</span>}
                                                        </div>
                                                        <div className="form-control">
                                                            <input type="date"
                                                                name="ToDate" ref={register({ required: true })}
                                                                disabled={isCreateProductInProgress}
                                                            />
                                                            <div className="input-undeline"></div>
                                                            <label>To Date</label>
                                                            {errors.ToDate && <span className="required-field">Please provide a valid date</span>}
                                                        </div>

                                                        <div className="form-control">
                                                            <input type="time"
                                                                name="FromHours" ref={register({ required: true })}
                                                                disabled={isCreateProductInProgress}
                                                            />
                                                            <div className="input-undeline"></div>
                                                            <label>Start Time</label>
                                                            {errors.FromHours && <span className="required-field">Please provide a valid time</span>}
                                                        </div>

                                                        <div className="form-control">
                                                            <input type="time"
                                                                name="ToHours" ref={register({ required: true })}
                                                                disabled={isCreateProductInProgress}
                                                            />
                                                            <div className="input-undeline"></div>
                                                            <label>End Time</label>
                                                            {errors.ToHours && <span className="required-field">Please provide a valid time</span>}
                                                        </div>









                                                    </div>
                                                </div>

                                                {
                                                    !isCreateProductInProgress && <button className="btn-create-class" type="submit">Create product class</button>

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


export default NewClass
