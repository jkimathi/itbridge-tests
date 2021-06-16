import React, { useState, useEffect } from 'react';
import Product from './Product';
import '../../Styles/Products.scss';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

import LeftNavigation from '../Navigation/LeftNavigation';
import TopNavigation from '../Navigation/TopNavigation';
import axiosInstance from "../../Api/Api";

import { GridLoader } from 'react-spinners';
import BlockIcon from '@material-ui/icons/Block';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import IProduct from '../../Types/IProduct';
import Footer from '../Footer/Footer';
import { useAppSelector } from '../../App/hooks';
import { selectNavigationState } from '../../features/navigation/navigationSlice';



const Products = () => {
    const [stateProducts, setstateProducts] = useState<IProduct[]>([]);

    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isPageEmpty, setIsPageEmpty] = useState(false);
    const navState = useAppSelector(selectNavigationState);






    //load companies
    useEffect(() => {
        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };

        axiosInstance
            .get("product", config)
            .then((response) => {
                setIsPageLoading(false);

                if (response.data.list.length) {
                    setstateProducts(response.data.list);
                    sessionStorage.setItem("productList", JSON.stringify(response.data.list));


                } else {

                    setIsPageEmpty(true)

                }
            })
            .catch((error) => {

                setIsPageLoading(false);
            });
    }, []);

    const listProducts = stateProducts.map((product) => {
        return (

            <Product
                branchID={product.branchID}
                branchesEmail={product.branchesEmail}
                branchesName={product.branchesName}
                branchesPhonenumber={product.branchesPhonenumber}
                code={product.code}
                createdBy={product.createdBy}
                createdDate={product.createdDate}
                deactivatedDate={product.deactivatedDate}
                descriptions={product.descriptions}

                isActive={product.isActive}
                name={product.name}
                ProductID={product.ProductID}
                subcategoryID={product.subcategoryID}

                productID={product.productID}





            />
        )

    });
    return (
        <div className="products">


            <div className="products-container">
                <div className={navState ? "page-left-navigation" : "page-left-navigation-hidden"}>
                    <LeftNavigation />
                </div>

                <div className="page-top-right-navigation-page-content">
                    <div className="top-right-navigation">

                        <TopNavigation />
                    </div>
                    <div className="page-content">
                        <div className="products">

                            <div className="products-container">
                                <div className="products-container-header">
                                    <h1 className="page-header-products">Products</h1>
                                    <Link className="link-create-product" to="/products/new"> <AddIcon className="icon-add-product" style={{ fontSize: 18 }} />Create product</Link>

                                </div>

                                {isPageLoading ?

                                    <div className="loader-products">

                                        <GridLoader size={20} margin={2} color="#0078d4" />

                                    </div>
                                    :

                                    <div className="products-list">
                                        {
                                            isPageEmpty ?
                                                <div className="container-no-product-found">
                                                    <div className="container-no-product-found-icon">
                                                        <BlockIcon style={{ fontSize: 70 }} />
                                                    </div>
                                                    <div className="container-no-product-found-text">
                                                        <h2> You do not have any products at the moment
                                                        </h2>

                                                        <Link className="link-create-product" to="/products/new"> <AddIcon className="icon-add-product" style={{ fontSize: 18 }} />Create product</Link>

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





    )
}

export default Products
