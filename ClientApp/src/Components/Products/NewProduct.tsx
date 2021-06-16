import React, { useEffect, useState } from "react";
import "../../Styles/NewProduct.scss";
import { useForm } from "react-hook-form";
import { GridLoader } from "react-spinners";
import TopNavigation from "../Navigation/TopNavigation";
import LeftNavigation from "../Navigation/LeftNavigation";
import axiosInstance from "../../Api/Api";
import ICities from "../../Types/ICities";
import INewProduct from "../../Types/INewProduct";
import IBranches from "../../Types/IBranches";
import BackToTopButton from "../BackToTopButton/BackToTopButton";
import Footer from "../Footer/Footer";
import { useAppSelector } from "../../App/hooks";
import { selectNavigationState } from "../../features/navigation/navigationSlice";
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import BlockIcon from '@material-ui/icons/Block';

const NewProduct = (props: any) => {
    const { register, handleSubmit, errors } = useForm<INewProduct>();
    const [resultCreateProductError, SetresultCreateProductError] =
        useState(false);
    const [isCreateProductInProgress, SetisCreateProductInProgress] =
        useState(false);
    // const [stateCities, setStateCities] = useState<ICities[]>([]);
    const [stateBranches, setStateBranches] = useState<IBranches[]>([]);
    const [statebranchNotFound, setstatebranchNotFound] = useState(false);



    const navState = useAppSelector(selectNavigationState);
    const onSubmit = (data: INewProduct) => {
        SetisCreateProductInProgress(true);
        //   scroll.scrollToTop();
        let formData = new FormData();

        formData.append("Name", data.Name);
        formData.append("BranchID", data.BranchID);
        formData.append("Code", data.Code);
        formData.append("Descriptions", data.Descriptions);

        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };
        axiosInstance
            .post("product", formData, config)
            .then((response) => {
                if (response.status === 201) {
                    props.history.push("/products/list");
                } else {
                    SetisCreateProductInProgress(false);
                    SetresultCreateProductError(true);
                }
            })
            .catch((error) => {
                SetisCreateProductInProgress(false);
                SetresultCreateProductError(true);
            });
    };

    //load destinations
    useEffect(() => {


        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };
        //load branches
        axiosInstance
            .get("branch", config)
            .then((response) => {

                if (response.data.list.length) {
                    setStateBranches(response.data.list);
                    setstatebranchNotFound(true);
                }

            })
            .catch((error) => { });


    }, []);



    let listBranches;
    if (stateBranches) {
        listBranches = stateBranches.map((branch, branchID) => {
            return (
                <>
                    <option key={branchID} value={branch.branchID}>
                        {branch.name}
                    </option>
                </>
            );
        });
    }



    return (
        <div className="newproduct">
            <div className="newproduct-container">
                <div
                    className={
                        navState ? "page-left-navigation" : "page-left-navigation-hidden"
                    }
                >
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
                                    <h1 className="page-header-products">Create Product</h1>
                                </div>
                                {resultCreateProductError && (
                                    <div className="create-product-alert">
                                        <p>
                                            There was a problem while creating a new product. Please
                                            try again.
                                        </p>
                                    </div>
                                )}

                                {isCreateProductInProgress && (
                                    <div className="loader-icon-create-product">
                                        <GridLoader size={15} margin="2" color="#0078d4" />
                                    </div>
                                )}

                                {
                                    statebranchNotFound ?


                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form-new-product">
                                                <div className="form-new-product-left">
                                                    <div className="form-control">
                                                        <input
                                                            type="text"
                                                            name="Name"
                                                            ref={register({ required: true })}
                                                            disabled={isCreateProductInProgress}
                                                        />
                                                        <div className="input-undeline"></div>
                                                        <label>Name</label>
                                                        {errors.Name && (
                                                            <span className="required-field">
                                                                Please provide a valid name
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="form-control">
                                                        <input
                                                            type="text"
                                                            name="Code"
                                                            ref={register({ required: true })}
                                                            disabled={isCreateProductInProgress}
                                                        />
                                                        <div className="input-undeline"></div>
                                                        <label>Product Code</label>
                                                        {errors.Code && (
                                                            <span className="required-field">
                                                                Please provide a valid code
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="form-control">
                                                        <select
                                                            name="BranchID"
                                                            ref={register({ required: true })}
                                                            disabled={isCreateProductInProgress}
                                                        >
                                                            <option></option>
                                                            {listBranches}
                                                        </select>

                                                        <div className="input-undeline"></div>
                                                        <label>Branches</label>
                                                        {errors.BranchID && (
                                                            <span className="required-field">
                                                                Please provide a valid Branch
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="form-new-product-right">

                                                    <div className="form-control">
                                                        <input
                                                            type="text"
                                                            name="Descriptions"
                                                            ref={register({ required: true })}
                                                            disabled={isCreateProductInProgress}
                                                        />
                                                        <div className="input-undeline"></div>
                                                        <label>Descriptions</label>
                                                        {errors.Descriptions && (
                                                            <span className="required-field">
                                                                Please provide a valid Descriptions
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {!isCreateProductInProgress && (
                                                <button className="btn-create-product" type="submit">
                                                    Create product
                                                </button>
                                            )}
                                        </form>

                                        :
                                        <div className="container-no-product-found">
                                            <div className="container-no-product-found-icon">
                                                <BlockIcon style={{ fontSize: 70 }} />
                                            </div>
                                            <div className="container-no-product-found-text">
                                                <h2> You do not have any branches at the moment. You need at least one branch to create a product.
                                                </h2>

                                                <Link className="link-create-product" to="/branches/new"> <AddIcon className="icon-add-product" style={{ fontSize: 18 }} />Create branch</Link>

                                            </div>


                                        </div>



                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BackToTopButton />
            <Footer />
        </div>
    );
};

export default NewProduct;
