import React, { useState, useEffect } from 'react';

import '../../Styles/ProductClasses.scss';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

import LeftNavigation from '../Navigation/LeftNavigation';
import TopNavigation from '../Navigation/TopNavigation';
import axiosInstance from "../../Api/Api";

import { GridLoader } from 'react-spinners';
import BlockIcon from '@material-ui/icons/Block';
import BackToTopButton from '../BackToTopButton/BackToTopButton';

import Footer from '../Footer/Footer';
import IProductClasses from '../../Types/IProductClasses';
import ProductClass from './ProductClass';
import { useAppSelector } from '../../App/hooks';
import { selectNavigationState } from '../../features/navigation/navigationSlice';



const ProductClasses = (props: any) => {
    const [stateProductClass, setstateProductClass] = useState<IProductClasses[]>([]);
    const [stateNavItemOpen, setNavItemOpen] = useState(true);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isPageEmpty, setIsPageEmpty] = useState(false);
    const navState = useAppSelector(selectNavigationState);







    //load companies
    useEffect(() => {
        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };
        const productId: string = props.match.params.productID;

        axiosInstance
            .get(`class/list/${productId}`, config)
            .then((response) => {
                setIsPageLoading(false);


                if (response.data.list.length) {
                    setstateProductClass(response.data.list);
                    sessionStorage.setItem("productclassesList", JSON.stringify(response.data.list));



                } else {


                    setIsPageEmpty(true)


                }
            })
            .catch((error) => {

                setIsPageLoading(false);
            });
    }, []);

    const listProducts = stateProductClass.map((productClass) => {
        return (

            <ProductClass

                classes_fromPlace={productClass.classes_fromPlace}
                classes_fromPlaceName={productClass.classes_fromPlaceName}
                classes_toPlace={productClass.classes_toPlace}
                classes_toPlaceName={productClass.classes_toPlaceName}
                classes_activatedBy={productClass.classes_activatedBy}
                classes_activatedDate={productClass.classes_activatedDate}
                classes_classID={productClass.classes_classID}
                classes_code={productClass.classes_code}
                classes_createdBy={productClass.classes_createdBy}
                classes_createdDate={productClass.classes_createdDate}
                classes_deactivatedBy={productClass.classes_deactivatedBy}
                classes_deactivatedDate={productClass.classes_deactivatedDate}
                classes_descriptions={productClass.classes_descriptions}
                classes_editedBy={productClass.classes_editedBy}
                classes_editedDate={productClass.classes_editedDate}
                classes_isActive={productClass.classes_isActive}
                classes_name={productClass.classes_name}
                classes_price={productClass.classes_price}
                classes_productID={productClass.classes_productID}
                classes_ticketsRangedFrom={productClass.classes_ticketsRangedFrom}
                classes_ticketsRangedTo={productClass.classes_ticketsRangedTo}
                classes_totalNumberOfTickets={productClass.classes_totalNumberOfTickets}
                products_branchID={productClass.products_branchID}
                products_code={productClass.products_code}
                products_descriptions={productClass.products_descriptions}
                products_fromPlace={productClass.products_fromPlace}
                products_isActive={productClass.products_isActive}
                products_name={productClass.products_name}
                products_productID={productClass.products_productID}
                products_subcategoryID={productClass.products_subcategoryID}
                products_toPlace={productClass.products_toPlace}






            />
        )

    });
    return (
        <div className="product-classes">


            <div className="product-classes-container">
                <div className={navState ? "page-left-navigation" : "page-left-navigation-hidden"}>
                    <LeftNavigation />
                </div>

                <div className="page-top-right-navigation-page-content">
                    <div className="top-right-navigation">

                        <TopNavigation />
                    </div>
                    <div className="page-content">
                        <div className="product-classes">

                            <div className="product-classes-container">
                                <div className="product-classes-container-header">
                                    <h1 className="page-header-product-classes">Product Classes</h1>
                                    <Link className="link-create-product" to="/classes/new"> <AddIcon className="icon-add-product" style={{ fontSize: 18 }} />Create product classes</Link>

                                </div>

                                {isPageLoading ?

                                    <div className="loader-product-classes">

                                        <GridLoader size={20} margin={2} color="#0078d4" />

                                    </div>
                                    :

                                    <div className="product-classes-list">
                                        {
                                            isPageEmpty ?
                                                <div className="container-no-product-found">
                                                    <div className="container-no-product-found-icon">
                                                        <BlockIcon style={{ fontSize: 70 }} />
                                                    </div>
                                                    <div className="container-no-product-found-text">
                                                        <h2> You do not have any classes at the moment
                                                        </h2>

                                                        <Link className="link-create-product" to="/classes/new"> <AddIcon className="icon-add-product" style={{ fontSize: 18 }} />Create product class</Link>

                                                    </div>


                                                </div>
                                                :
                                                listProducts


                                        }


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
        // <div className="page-layout-product-classes">
        //     <div className="top-navigation">
        //         <TopNavigation />
        //     </div>
        //     <div className={stateNavItemOpen ? 'left-navigation-dashboard-content ' : 'left-navigation-dashboard-content-toggle '}>


        //         <div className="left-navigation">
        //             <LeftNavigation />
        //         </div>
        //         <div className="page-content">
        //             <BackToTopButton />
        //         </div>
        //     </div>
        //     <Footer />
        // </div>




    )
}

export default ProductClasses
