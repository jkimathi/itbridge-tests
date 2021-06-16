import React, { useState, useEffect } from 'react';
import PaymentOption from './PaymentOption';
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

import IPaymentOptionsList from '../../Types/IPaymentOptionsList';



const PaymentOptions = (props: any) => {
    const [statePaymentOptionIList, setstatePaymentOptionList] = useState<IPaymentOptionsList[]>([]);
    const [stateNavItemOpen, setNavItemOpen] = useState(true);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isPageEmpty, setIsPageEmpty] = useState(false);






    useEffect(() => {

        const selectedItemId: string = props.match.params.itemID;



        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };


        axiosInstance
            .get(`company_payment_method/${selectedItemId}`, config)
            .then((response) => {


                setIsPageLoading(false);

                if (response.data.details.length) {
                    setstatePaymentOptionList(response.data.details);


                } else {
                    setIsPageEmpty(true)

                }

            })
            .catch((error) => {

                setIsPageLoading(false);

            });

    }, []);

    const listPaymentOptionItems = statePaymentOptionIList.map((paymentOption) => {
        return (

            <PaymentOption


                companyPaymentMethodID={paymentOption.companyPaymentMethodID}
                fields={paymentOption.fields}
                itemID={paymentOption.itemID}
                itemName={paymentOption.itemName}
                paymentMethodID={paymentOption.paymentMethodID}
                paymentMethodName={paymentOption.paymentMethodName}




            />
        )

    });
    return (
        <div className="page-layout-payment-options">
            <div className="top-navigation">
                <TopNavigation />
            </div>
            <div className={stateNavItemOpen ? 'left-navigation-dashboard-content ' : 'left-navigation-dashboard-content-toggle '}>


                <div className="left-navigation">
                    <LeftNavigation />
                </div>
                <div className="page-content">
                    <div className="payment-options">

                        <div className="payment-options-container">
                            <div className="payment-options-container-header">
                                <h1 className="page-header-payment-options">Supported Payment options</h1>
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

                                                    <Link className="link-create-payment-option" to="/payments/new"> <AddIcon className="icon-add-payment-option" style={{ fontSize: 18 }} />Create payment option</Link>

                                                </div>


                                            </div>
                                            :
                                            listPaymentOptionItems


                                    }
                                    {/* {
                                        listCompanies ? listCompanies : 'You do not have any companies at the moment'
                                    } */}

                                </div>

                            }



                        </div>

                    </div>
                    <BackToTopButton />
                </div>
            </div>
            <Footer />
        </div>




    )
}

export default PaymentOptions

