import React, { useEffect, useState } from 'react';
import '../../Styles/ViewProduct.scss';
import { useForm } from "react-hook-form";
import {
    GridLoader
} from 'react-spinners';
import TopNavigation from '../Navigation/TopNavigation';
import LeftNavigation from '../Navigation/LeftNavigation';
import axiosInstance from '../../Api/Api';
import ICities from '../../Types/ICities';
import INewProduct from '../../Types/INewProduct';
import IBranches from '../../Types/IBranches';
import ICategories from '../../Types/ICategories';
import ISubCategories from '../../Types/ISubCategories';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import Footer from '../Footer/Footer';
import { useAppSelector } from '../../App/hooks';
import { selectNavigationState } from '../../features/navigation/navigationSlice';
import IProductDetails from '../../Types/IProductDetails';
import IUpdateProduct from '../../Types/IUpdateProduct';
import ILanguages from '../../Types/ILanguages';



const ViewProduct = (props: any) => {
    const { register, handleSubmit, errors } = useForm<IUpdateProduct>();
    const [resultCreateProductError, SetresultCreateProductError] = useState(false);
    const [isUpdateProductInProgress, SetisCreateProductInProgress] = useState(false);
    //const [stateCities, setStateCities] = useState<ICities[]>([]);
    const [stateBranches, setStateBranches] = useState<IBranches[]>([]);
    const [stateLanguages, setStateLanguages] = useState<ILanguages[]>([]);
    const [stateProductCategory, setStateProductCategory] = useState<ICategories[]>([]);
    const [stateProductSubCategory, setStateProductSubCategory] = useState<ISubCategories[]>([]);
    const [stateProductDetails, setstateProductDetails] = useState<IProductDetails>();
    const navState = useAppSelector(selectNavigationState);

    const [stateisProductInEditMode, setstateisProductInEditMode] = useState(false);

    const productID: string = props.match.params.productId;

    const productList = JSON.parse(sessionStorage.getItem('productList') || '{}');




    const onSubmit = (data: IUpdateProduct) => {

        SetisCreateProductInProgress(true);
        //   scroll.scrollToTop();
        let formData = new FormData();






        formData.append("ProductID", String(stateProductDetails?.productID));
        formData.append("Name", data.Name);
        formData.append("Code", data.Code);
        formData.append("Descriptions", data.Descriptions);
        formData.append("SubcategoryID", String(data.subcategoryID));








        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };
        axiosInstance
            .put("product", formData, config)
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

    // const emailPatterns = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // const phoneNumberPatterns = /^\d{10}$/;


    useEffect(() => {
        if (productList) {

            const retrieveProduct = productList.find((product: { productID: string; }) => product.productID === productID);
            setstateProductDetails(retrieveProduct);



        } else {

            props.history.push("/products/list");
        }

    }, [])


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
        //load branches
        axiosInstance
            .get("branch", config)
            .then((response) => {
                setStateBranches(response.data.list);

            })
            .catch((error) => {

            });




    }, []);


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


            })
            .catch((error) => {
            });
    };



    // let listCities;

    // if (stateCities) {
    //     listCities = stateCities.map((city, cityID) => {
    //         return (
    //             <>

    //                 <option key={cityID} value={city.cityID} >
    //                     {city.name}
    //                 </option>
    //             </>
    //         )

    //     });
    // }



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


    let listSubCategories
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




    return (
        <div className="newproduct">


            <div className="newproduct-container">
                <div className={navState ? "page-left-navigation" : "page-left-navigation-hidden"}>
                    <LeftNavigation />
                </div>

                <div className="page-top-right-navigation-page-content">
                    <div className="top-right-navigation">

                        <TopNavigation />
                    </div>
                    <div className="page-content">
                        <div className="new-product">

                            <div className="new-product-form-container">
                                <div className="products-container-header">
                                    <h1 className="page-header-products">View Product</h1>

                                </div>
                                {
                                    resultCreateProductError && <div className="create-product-alert">
                                        <p>There was a problem while creating a new product. Please try again.</p>
                                    </div>
                                }

                                {isUpdateProductInProgress &&
                                    <div className="loader-icon-create-product">

                                        <GridLoader size={15} margin="2" color="#0078d4" />
                                    </div>

                                }
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-new-product">
                                        <div className="form-new-product-left">
                                            <div className="form-control">
                                                <input type="text"
                                                    defaultValue={stateProductDetails?.name}

                                                    name="Name" ref={register({ required: true })}
                                                    disabled={!stateisProductInEditMode} />
                                                <div className="input-undeline"></div>
                                                <label>Name</label>
                                                {errors.Name && <span className="required-field">Please provide a valid name</span>}

                                            </div>


                                            <div className="form-control">
                                                <input type="text"
                                                    defaultValue={stateProductDetails?.code}
                                                    name="Code" ref={register({ required: true })}
                                                    disabled={!stateisProductInEditMode} />
                                                <div className="input-undeline"></div>
                                                <label>Product Code</label>
                                                {errors.Code && <span className="required-field">Please provide a valid code</span>}

                                            </div>
                                            {
                                                !stateisProductInEditMode &&
                                                <div className="form-control">
                                                    <input type="text"
                                                        defaultValue={stateProductDetails?.branchesName}
                                                        name="branchesName" ref={register({ required: true })}
                                                        disabled={isUpdateProductInProgress} />
                                                    <div className="input-undeline"></div>
                                                    <label>Branch name</label>

                                                </div>
                                            }

                                            {/* {
                                                !stateisProductInEditMode &&
                                                <div className="form-control">
                                                    <input type="text"
                                                        defaultValue={stateProductDetails?.fromPlace_Name}
                                                        name="fromPlace_Name" ref={register({ required: true })}
                                                        disabled={isUpdateProductInProgress} />
                                                    <div className="input-undeline"></div>
                                                    <label>Origin</label>

                                                </div>
                                            } */}

                                            {/* {
                                                !stateisProductInEditMode &&
                                                <div className="form-control">
                                                    <input type="text"
                                                        defaultValue={stateProductDetails?.toPlace_Name}
                                                        name="toPlace_Name" ref={register({ required: true })}
                                                        disabled={isUpdateProductInProgress} />
                                                    <div className="input-undeline"></div>
                                                    <label>Destination</label>

                                                </div>
                                            } */}


                                            <div className="form-control-checkbox">
                                                <div className="IsProductActive">


                                                    <input type="checkbox"
                                                        defaultChecked={stateProductDetails?.isActive}
                                                        name="isActive"
                                                        ref={register({ required: true })}
                                                        disabled={isUpdateProductInProgress}

                                                    />
                                                    <span>Is product active?</span>

                                                </div>




                                            </div>

                                            {
                                                stateisProductInEditMode &&
                                                <div className="form-control">
                                                    <select name="BranchID" ref={register({ required: true })}
                                                        disabled={isUpdateProductInProgress}
                                                    >
                                                        <option></option>
                                                        {listBranches}
                                                    </select>

                                                    <div className="input-undeline"></div>
                                                    <label>Branches</label>
                                                    {errors.BranchID && <span className="required-field">Please provide a valid Branch</span>}

                                                </div>
                                            }





                                        </div>



                                        <div className="form-new-product-right">

                                            {/* {
                                                stateisProductInEditMode &&

                                                <div className="form-control">
                                                    <select name="FromPlace" ref={register({ required: true })}
                                                        disabled={isUpdateProductInProgress}
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
                                                stateisProductInEditMode &&
                                                <div className="form-control">
                                                    <select name="ToPlace" ref={register({ required: true })}
                                                        disabled={isUpdateProductInProgress}
                                                    >
                                                        <option></option>
                                                        {listCities}
                                                    </select>
                                  
                                                    <div className="input-undeline"></div>
                                                    <label>Destination</label>
                                                    {errors.ToPlace && <span className="required-field">Please provide a valid city</span>}
                                                </div>
                                            } */}

                                            {/* <div className="form-control">
                                                <input type="text"
                                                    defaultValue={stateProductDetails?.fromAddress}
                                                    name="fromAddress" ref={register({ required: true })}
                                                    disabled={isUpdateProductInProgress}
                                                />
                                                <div className="input-undeline"></div>
                                                <label>From Address</label>
                                                {errors.fromAddress && <span className="required-field">Please provide a valid address</span>}
                                            </div>

                                            <div className="form-control">
                                                <input type="text"
                                                    defaultValue={stateProductDetails?.toAddress}
                                                    name="toAddress" ref={register({ required: true })}
                                                    disabled={isUpdateProductInProgress}
                                                />
                                                <div className="input-undeline"></div>
                                                <label>To address</label>
                                                {errors.toAddress && <span className="required-field">Please provide a valid address</span>}
                                            </div>
 */}
                                            <div className="form-control">
                                                <select name="LanguageID" ref={register({ required: true })}
                                                    disabled={isUpdateProductInProgress} onChange={(event) => handleLanguageChange(event)} >
                                                    <option></option>
                                                    {stateLanguages.map((option) => (
                                                        <option value={option.languageID}>{option.name}</option>
                                                    ))}
                                                </select>
                                                <div className="input-undeline"></div>
                                                <label>Language</label>
                                                {/* {errors.LanguageID && <span className="required-field">Please provide a valid language</span>} */}
                                            </div>


                                            {
                                                stateisProductInEditMode &&
                                                <div className="form-control">
                                                    <select name="categoryID" ref={register({ required: true })}
                                                        disabled={isUpdateProductInProgress}
                                                        onChange={(event) => handleCategoryChange(event)}
                                                    >
                                                        <option></option>
                                                        {listCategories}
                                                    </select>

                                                    <div className="input-undeline"></div>
                                                    <label>Category</label>
                                                    {errors.categoryID && <span className="required-field">Please provide a valid category</span>}

                                                </div>}

                                            {
                                                stateisProductInEditMode &&
                                                <div className="form-control">
                                                    <select name="subcategoryID" ref={register({ required: true })}
                                                        disabled={isUpdateProductInProgress}
                                                    >
                                                        <option></option>
                                                        {listSubCategories}
                                                    </select>

                                                    <div className="input-undeline"></div>
                                                    <label>Sub Category</label>
                                                    {errors.subcategoryID && <span className="required-field">Please provide a valid sub category</span>}

                                                </div>
                                            }




                                            <div className="form-control">
                                                <input type="text"
                                                    defaultValue={stateProductDetails?.descriptions}
                                                    name="Descriptions" ref={register({ required: true })}
                                                    disabled={isUpdateProductInProgress} />
                                                <div className="input-undeline"></div>
                                                <label>Descriptions</label>
                                                {errors.Descriptions && <span className="required-field">Please provide a valid Descriptions</span>}
                                            </div>





                                        </div>
                                    </div>



                                    {
                                        !stateisProductInEditMode && <button className="btn-create-product" onClick={() => setstateisProductInEditMode(true)}>Edit Product</button>


                                    }
                                    {
                                        stateisProductInEditMode && <button className="btn-update-product" type="submit">Update Product</button>

                                    }
                                    {
                                        stateisProductInEditMode && <button className="btn-create-product" onClick={() => setstateisProductInEditMode(false)}>Cancel Edit </button>


                                    }




                                </form>

                            </div>

                        </div>

                    </div>

                </div>


            </div>




            <BackToTopButton />
            <Footer />

        </div>


    )
}

export default ViewProduct

