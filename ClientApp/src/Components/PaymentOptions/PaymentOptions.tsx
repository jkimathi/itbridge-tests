import React, { useState, useEffect } from 'react';
import PaymentOptionItem from './PaymentOptionItem';
import '../../Styles/PaymentOptions.scss';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

import LeftNavigation from '../Navigation/LeftNavigation';
import TopNavigation from '../Navigation/TopNavigation';
import axiosInstance from "../../Api/Api";

import { GridLoader, RiseLoader } from 'react-spinners';
import BlockIcon from '@material-ui/icons/Block';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import Footer from '../Footer/Footer';
import IPaymentOptionItem from '../../Types/IPaymentOptionItem';
import { selectNavigationState } from '../../features/navigation/navigationSlice';
import { useAppSelector } from '../../App/hooks';



const PaymentOptions = () => {
    const [statePaymentOptionItems, setstatePaymentOptionItems] = useState<IPaymentOptionItem[]>([]);
    const [stateNavItemOpen, setNavItemOpen] = useState(true);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isPageEmpty, setIsPageEmpty] = useState(false);
    const navState = useAppSelector(selectNavigationState);






    useEffect(() => {

        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };



        axiosInstance
            .get(`company_payment_method`, config)
            .then((response) => {


                setIsPageLoading(false);
                if (response.data.list.length) {
                    setstatePaymentOptionItems(response.data.list);

                } else {
                    setIsPageEmpty(true)

                }

            })
            .catch((error) => {

                setIsPageLoading(false);

            });

    }, []);

    const listPaymentOptionItems = statePaymentOptionItems.map((paymentOptionItem) => {
        return (

            <PaymentOptionItem


                itemName={paymentOptionItem.itemName}
                itemID={paymentOptionItem.itemID}




            />
        )

    });
    return (
        // <div className="page-layout-payment-options">
        //     <div className="top-navigation">
        //         <TopNavigation />
        //     </div>
        //     <div className={stateNavItemOpen ? 'left-navigation-dashboard-content ' : 'left-navigation-dashboard-content-toggle '}>


        //         <div className="left-navigation">
        //             <LeftNavigation />
        //         </div>
        //         <div className="page-content">
        //                             <BackToTopButton />
        //         </div>
        //     </div>
        //     <Footer />
        // </div>

        <div className="payments">


            <div className="payments-container">
                <div className={navState ? "page-left-navigation" : "page-left-navigation-hidden"}>
                    <LeftNavigation />
                </div>

                <div className="page-top-right-navigation-page-content">
                    <div className="top-right-navigation">

                        <TopNavigation />
                    </div>
                    <div className="page-content">
                        <div className="payment-options">

                            <div className="payment-options-container">
                                <div className="payment-options-container-header">
                                    <h1 className="page-header-payment-options">Payment options</h1>
                                    <Link className="link-create-payment-option" to="/payments/new"> <AddIcon className="icon-add-payment-option" style={{ fontSize: 18 }} />Create payment option</Link>

                                </div>
                                {isPageLoading ?
                                    <div className="loader-payment-options">

                                        <GridLoader size={20} margin="2" color="#0078d4" /></div>

                                    :

                                    <div className="payment-options-list">
                                        {
                                            isPageEmpty ?
                                                <div className="container-no-payment-option-found">
                                                    <div className="container-no-payment-option-found-icon">
                                                        <BlockIcon style={{ fontSize: 70 }} />
                                                    </div>
                                                    <div className="container-no-payment-option-found-text">
                                                        <h2> You do not have any payment options at the moment
                                                        </h2>

                                                        <Link className="link-create-payment-option" to="/paymentoptions/new"> <AddIcon className="icon-add-payment-option" style={{ fontSize: 18 }} />Create payment option</Link>

                                                    </div>


                                                </div>
                                                :
                                                listPaymentOptionItems


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

export default PaymentOptions

