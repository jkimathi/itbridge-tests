import React, { useEffect, useState } from 'react';
import '../../Styles/NewPaymentOption.scss';
import { useForm } from "react-hook-form";
import TopNavigation from '../Navigation/TopNavigation';
import LeftNavigation from '../Navigation/LeftNavigation';
import axiosInstance from '../../Api/Api';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import Footer from '../Footer/Footer';
import IProduct from '../../Types/IProduct';



import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { GridLoader } from 'react-spinners';
import BlockIcon from '@material-ui/icons/Block';
import IPaymentOptions from '../../Types/IPaymentMethod';
import INewPaymentOption from '../../Types/INewPaymentOption';
import { selectNavigationState } from '../../features/navigation/navigationSlice';
import { useAppSelector } from '../../App/hooks';


enum PaymentMethodEnum {

    BankTransfer = "Bank Transfer",
    CreditCard = "Credit Card",
    VisaCard = "Visa Card",
    MPesa = "M-Pesa",
    AirtelMoney = "Airtel Money"


};
interface IBankPaymentJson {
    bankName: string;
    accountNumber: string;
    branchCode: string;

};
interface IMobilePaymentJson {
    phoneNumber: string;
    refenceNumber: string;


};
const NewPaymentOption = (props: any) => {
    const { register, handleSubmit, errors } = useForm<INewPaymentOption>();
    const [resultCreateProductError, SetresultCreateProductError] = useState(false);
    const [isCreateProductInProgress, SetisCreateProductInProgress] = useState(false);
    const [isProductListEmpty, SetisProductListEmpty] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);

    const [stateProducts, setstateProducts] = useState<IProduct[]>([]);

    const [statePaymentMethod, setstatePaymentMethod] = useState<IPaymentOptions[]>([]);
    const [selectedPaymentOptions, setSelectedPaymentOptions] = useState(PaymentMethodEnum.AirtelMoney);



    const navState = useAppSelector(selectNavigationState);


    const [stateNavItemOpen, setNavItemOpen] = useState(true);
    //const numberPatterns = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const numberPatterns = /^[0-9]*$/;

    const handleChangeSelectedPaymentOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const optionId = Number(event.target.value);



        // 0: { paymentMethodID: 1, languageID: 1, name: "Bank Transfer" }
        // 1: { paymentMethodID: 2, languageID: 1, name: "Credit Card" }
        // 2: { paymentMethodID: 3, languageID: 1, name: "Visa Card" }
        // 3: { paymentMethodID: 11, languageID: 1, name: "M-Pesa" }
        // 4: { paymentMethodID: 12, languageID: 1, name: "Airtel Money" }


        if (optionId === 1) {
            setSelectedPaymentOptions(PaymentMethodEnum.BankTransfer);

        } else if (optionId === 2) {
            setSelectedPaymentOptions(PaymentMethodEnum.CreditCard);
        } else if (optionId === 3) {
            setSelectedPaymentOptions(PaymentMethodEnum.VisaCard);
        } else if (optionId === 12) {
            setSelectedPaymentOptions(PaymentMethodEnum.AirtelMoney);
        }

        else if (optionId === 11) {
            setSelectedPaymentOptions(PaymentMethodEnum.MPesa);
        }



    }

    //




    const onSubmit = (data: INewPaymentOption) => {

        SetisCreateProductInProgress(true);
        //   scroll.scrollToTop();
        let formData = new FormData();
        let fieldData: string = "";


        if (selectedPaymentOptions === PaymentMethodEnum.AirtelMoney || selectedPaymentOptions === PaymentMethodEnum.MPesa) {

            fieldData = `{"paymentMethodName": "${selectedPaymentOptions}","phoneNumber": "${data.phoneNumber}"}`;

        } else if (selectedPaymentOptions === PaymentMethodEnum.CreditCard || selectedPaymentOptions === PaymentMethodEnum.VisaCard) {

            fieldData = `{"paymentMethodName": "${selectedPaymentOptions}","cardName": "${data.CardName}", "cardNumber": "${data.CardNumber}"}`;



        } else if (selectedPaymentOptions === PaymentMethodEnum.BankTransfer) {

            fieldData = `"paymentMethodName": "${selectedPaymentOptions}",{"bankName": "${data.BankName}", "accountNumber": "${data.BranchCode}", "branchCode": "${data.AccountNumber}"}`;

        }




        formData.append("ProductID", data.ProductID);
        formData.append("PaymentMethodID", String(data.PaymentMethodID));
        formData.append("Fields", fieldData);







        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };
        axiosInstance
            .post("company_payment_method", formData, config)
            .then((response) => {

                if (response.status === 201) {

                    props.history.push("/payments/list");
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



    //load destinations
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


                } else {

                    SetisProductListEmpty(true);

                }
            })
            .catch((error) => {

                setIsPageLoading(false);
            });


        axiosInstance
            .get("mst/payment_methods", config)
            .then((response) => {


                setstatePaymentMethod(response.data.list);


            })
            .catch((error) => {


            });

    }, []);




    const listPaymentMethods = statePaymentMethod.map((paymentMethod, paymentID) => {
        return (
            <>

                <option key={paymentID} value={paymentMethod.paymentMethodID} >
                    {paymentMethod.name}
                </option>
            </>
        )

    });

    const listProducts = stateProducts.map((product, productID) => {
        return (
            <>

                <option key={productID} value={product.productID} >
                    {product.name}
                </option>
            </>
        )

    });








    return (
        // <div className="page-layout-new-payment-option">
        //     <div className="top-navigation">
        //         <TopNavigation />
        //     </div>
        //     <div className={stateNavItemOpen ? 'left-navigation-dashboard-content ' : 'left-navigation-dashboard-content-toggle '}>
        //         <div className="left-navigation">
        //             <LeftNavigation />
        //         </div>
        //         <div className="page-content">
        //                          <BackToTopButton />

        //         </div>
        //     </div>
        //     <Footer />
        // </div>

        <div className="newpayment">


            <div className="newpayment-container">
                <div className={navState ? "page-left-navigation" : "page-left-navigation-hidden"}>
                    <LeftNavigation />
                </div>

                <div className="page-top-right-navigation-page-content">
                    <div className="top-right-navigation">

                        <TopNavigation />
                    </div>
                    <div className="page-content">

                        <div className="new-payment-option">

                            <div className="new-payment-option-form-container">
                                <div className="new-payment-option-container-header">
                                    <h1 className="page-header-new-payment-option">New Payment option</h1>

                                </div>
                                {
                                    resultCreateProductError && <div className="create-payment-option-alert">
                                        <p>There was a problem while creating a new product class. Please try again.</p>
                                    </div>
                                }

                                {isCreateProductInProgress &&
                                    <div className="loader-icon-create-payment-option">

                                        <GridLoader size={20} margin={2} color="#0078d4" />
                                    </div>

                                }
                                {
                                    isPageLoading
                                        ?

                                        <div className="loader-icon-create-payment-option">

                                            <GridLoader size={20} margin={2} color="#0078d4" />

                                        </div>

                                        :


                                        isProductListEmpty
                                            ?
                                            <div className="container-no-payment-option-found">
                                                <div className="container-no-payment-option-found-icon">
                                                    <BlockIcon style={{ fontSize: 70 }} />
                                                </div>
                                                <div className="container-no-payment-option-found-text">
                                                    <h2> You do not have any products at the moment, you need to have at least one product to create a class.
                                                    </h2>

                                                    <Link className="link-create-payment-option" to="/products/new"> <AddIcon className="icon-add-payment-option" style={{ fontSize: 18 }} />Create product</Link>

                                                </div>


                                            </div>

                                            :
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="form-new-payment-option">
                                                    <div className="form-new-payment-option-left">
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
                                                            <select name="PaymentMethodID" ref={register({ required: true })}
                                                                disabled={isCreateProductInProgress}
                                                                onChange={(event) => handleChangeSelectedPaymentOption(event)}
                                                            >
                                                                <option></option>
                                                                {listPaymentMethods}
                                                            </select>
                                                            {/* <input type="text" name="countryID" ref={register({ required: true })}
            disabled={isSignUpInProgress} /> */}
                                                            <div className="input-undeline"></div>
                                                            <label>Payment method</label>
                                                            {errors.PaymentMethodID && <span className="required-field">Please provide a valid payment method</span>}
                                                        </div>
                                                        {
                                                            selectedPaymentOptions === PaymentMethodEnum.BankTransfer
                                                                ?

                                                                <div className="form-control">
                                                                    <input type="text" name="BankName" ref={register({ required: true })}
                                                                        disabled={isCreateProductInProgress} />
                                                                    <div className="input-undeline"></div>
                                                                    <label>Bank Name</label>


                                                                    {errors.BankName && <span className="required-field">Please provide a valid bank name</span>}
                                                                </div>



                                                                :
                                                                ""







                                                        }






                                                        {/* <div className="form-control">
                        <input type="text" name="BranchID" ref={register({ required: true })}
                            disabled={isCreateProductInProgress} />
                        <div className="input-undeline"></div>
                        <label>Branch name</label>
                        {errors.BranchID && <span className="required-field">Please provide a valid name</span>}

                    </div> */}

                                                        {/* <div className="form-control">
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

                            </div> */}







                                                        {/* <div className="form-control">
                                <input type="text" name="TicketsRangedFrom"
                                    ref={register({ required: true, pattern: numberPatterns, min: 1 })}
                                    disabled={isCreateProductInProgress} />
                                <div className="input-undeline"></div>
                                <label> Tickets Ranged From</label>
                                {errors.TicketsRangedFrom && <span className="required-field">Please provide a valid range</span>}

                            </div> */}

                                                        {/* <div className="form-control">
                                <input type="text"
                                    name="TicketsRangedTo"
                                    ref={register({ required: true, pattern: numberPatterns, min: 1 })}
                                    onBlur={(event) => handleComputeTotalNumberOfTicket(event)}
                                    disabled={isCreateProductInProgress} />
                                <div className="input-undeline"></div>
                                <label>Tickets Ranged To</label>
                                {errors.TicketsRangedTo && <span className="required-field">Please provide a valid range</span>}

                            </div> */}


















                                                    </div>



                                                    <div className="form-new-payment-option-right ">
                                                        {
                                                            selectedPaymentOptions === PaymentMethodEnum.AirtelMoney
                                                                ?
                                                                <>
                                                                    <div className="form-control">
                                                                        <input type="text" name="phoneNumber" ref={register({ required: true })}
                                                                            disabled={isCreateProductInProgress} />
                                                                        <div className="input-undeline"></div>
                                                                        <label>Phone number</label>


                                                                        {errors.phoneNumber && <span className="required-field">Please provide a valid phone number</span>}
                                                                    </div>
                                                                    {/* <div className="form-control">
                                            <input type="text" name="ReferenceNumber" ref={register({ required: true })}
                                                disabled={isCreateProductInProgress} />
                                            <div className="input-undeline"></div>
                                            <label>Reference number</label>


                                            {errors.ReferenceNumber && <span className="required-field">Please provide a valid refence number</span>}
                                        </div> */}
                                                                </>

                                                                :

                                                                ""





                                                        }
                                                        {
                                                            selectedPaymentOptions === PaymentMethodEnum.MPesa
                                                                ?
                                                                <>
                                                                    <div className="form-control">
                                                                        <input type="text" name="phoneNumber" ref={register({ required: true })}
                                                                            disabled={isCreateProductInProgress} />
                                                                        <div className="input-undeline"></div>
                                                                        <label>Phone number</label>


                                                                        {errors.phoneNumber && <span className="required-field">Please provide a valid phone number</span>}
                                                                    </div>
                                                                    {/* <div className="form-control">
                                            <input type="text" name="ReferenceNumber" ref={register({ required: true })}
                                                disabled={isCreateProductInProgress} />
                                            <div className="input-undeline"></div>
                                            <label>Reference number</label>


                                            {errors.ReferenceNumber && <span className="required-field">Please provide a valid refence number</span>}
                                        </div> */}
                                                                </>

                                                                :

                                                                ""





                                                        }

                                                        {/* {
                                selectedPaymentOptions === PaymentMethodEnum.AirtelMoney
                                    ?
                                    <>

                                        <div className="form-control">
                                            <input type="text" name="ReferenceNumber" ref={register({ required: true })}
                                                disabled={isCreateProductInProgress} />
                                            <div className="input-undeline"></div>
                                            <label>Reference number</label>


                                            {errors.ReferenceNumber && <span className="required-field">Please provide a valid refence number</span>}
                                        </div>
                                    </>

                                    :

                                    ""





                            } */}

                                                        {/* {
                                selectedPaymentOptions === PaymentMethodEnum.MPesa
                                    ?
                                    <>

                                        <div className="form-control">
                                            <input type="text" name="ReferenceNumber" ref={register({ required: true })}
                                                disabled={isCreateProductInProgress} />
                                            <div className="input-undeline"></div>
                                            <label>Reference number</label>


                                            {errors.ReferenceNumber && <span className="required-field">Please provide a valid refence number</span>}
                                        </div>
                                    </>

                                    :

                                    ""





                            } */}





                                                        {
                                                            selectedPaymentOptions === PaymentMethodEnum.BankTransfer
                                                                ?

                                                                <div className="form-control">
                                                                    <input type="text" name="BranchCode" ref={register({ required: true })}
                                                                        disabled={isCreateProductInProgress} />
                                                                    <div className="input-undeline"></div>
                                                                    <label>Branch code</label>


                                                                    {errors.BranchCode && <span className="required-field">Please provide a valid branch code</span>}
                                                                </div>



                                                                :
                                                                ""

                                                        }

                                                        {
                                                            selectedPaymentOptions === PaymentMethodEnum.BankTransfer
                                                                ?

                                                                <div className="form-control">
                                                                    <input type="text" name="AccountNumber" ref={register({ required: true })}
                                                                        disabled={isCreateProductInProgress} />
                                                                    <div className="input-undeline"></div>
                                                                    <label>Account  number</label>


                                                                    {errors.AccountNumber && <span className="required-field">Please provide a valid account number</span>}
                                                                </div>

                                                                :
                                                                ""

                                                        }

                                                        {
                                                            selectedPaymentOptions === PaymentMethodEnum.CreditCard
                                                                ?

                                                                <div className="form-control">
                                                                    <input type="text" name="CardName" ref={register({ required: true })}
                                                                        disabled={isCreateProductInProgress} />
                                                                    <div className="input-undeline"></div>
                                                                    <label>Card  Name</label>


                                                                    {errors.CardName && <span className="required-field">Please provide a valid card name</span>}
                                                                </div>

                                                                :
                                                                ""

                                                        }

                                                        {
                                                            selectedPaymentOptions === PaymentMethodEnum.CreditCard
                                                                ?

                                                                <div className="form-control">
                                                                    <input type="text" name="CardNumber" ref={register({ required: true, pattern: numberPatterns })}
                                                                        disabled={isCreateProductInProgress} />
                                                                    <div className="input-undeline"></div>
                                                                    <label>Card  number</label>


                                                                    {errors.CardNumber && <span className="required-field">Please provide a valid card number</span>}
                                                                </div>

                                                                :
                                                                ""

                                                        }


                                                        {
                                                            selectedPaymentOptions === PaymentMethodEnum.VisaCard
                                                                ?

                                                                <div className="form-control">
                                                                    <input type="text" name="CardName" ref={register({ required: true })}
                                                                        disabled={isCreateProductInProgress} />
                                                                    <div className="input-undeline"></div>
                                                                    <label>Card  Name</label>


                                                                    {errors.CardName && <span className="required-field">Please provide a valid card name</span>}
                                                                </div>

                                                                :
                                                                ""

                                                        }

                                                        {
                                                            selectedPaymentOptions === PaymentMethodEnum.VisaCard
                                                                ?

                                                                <div className="form-control">
                                                                    <input type="text" name="CardNumber" ref={register({ required: true, pattern: numberPatterns })}
                                                                        disabled={isCreateProductInProgress} />
                                                                    <div className="input-undeline"></div>
                                                                    <label>Card  number</label>


                                                                    {errors.CardNumber && <span className="required-field">Please provide a valid card number</span>}
                                                                </div>

                                                                :
                                                                ""

                                                        }




                                                        {/* <div className="form-control">
                                <input type="text" name="Fields" ref={register({ required: true })}
                                    disabled={isCreateProductInProgress} />
                                <div className="input-undeline"></div>
                                <label>Fields</label>
                                {errors.Fields && <span className="required-field">Please provide a valid fields</span>}

                            </div> */}

                                                        {/* {
                                selectedPaymentOptions === PaymentMethodEnum.MobileMoney
                                    ?
                                    <>
                                        <div className="form-control">
                                            <input type="text" name="phoneNumber" ref={register({ required: true })}
                                                disabled={isCreateProductInProgress} />
                                            <div className="input-undeline"></div>
                                            <label>Phone number</label>


                                            {errors.phoneNumber && <span className="required-field">Please provide a valid phone number</span>}
                                        </div>
                                        <div className="form-control">
                                            <input type="text" name="ReferenceNumber" ref={register({ required: true })}
                                                disabled={isCreateProductInProgress} />
                                            <div className="input-undeline"></div>
                                            <label>Reference number</label>


                                            {errors.ReferenceNumber && <span className="required-field">Please provide a valid refence number</span>}
                                        </div>
                                    </>

                                    :

                                    <>
                                        <div className="form-control">
                                            <input type="text" name="BankName" ref={register({ required: true })}
                                                disabled={isCreateProductInProgress} />
                                            <div className="input-undeline"></div>
                                            <label>Bank Name</label>


                                            {errors.BankName && <span className="required-field">Please provide a valid bank name</span>}
                                        </div>
                                        <div className="form-control">
                                            <input type="text" name="BranchCode" ref={register({ required: true })}
                                                disabled={isCreateProductInProgress} />
                                            <div className="input-undeline"></div>
                                            <label>Branch code</label>


                                            {errors.BranchCode && <span className="required-field">Please provide a valid branch code</span>}
                                        </div>
                                        <div className="form-control">
                                            <input type="text" name="AccountNumber" ref={register({ required: true })}
                                                disabled={isCreateProductInProgress} />
                                            <div className="input-undeline"></div>
                                            <label>Account  number</label>


                                            {errors.AccountNumber && <span className="required-field">Please provide a valid account number</span>}
                                        </div>

                                    </>


                            } */}

                                                        {/* <div className="form-control">
                        <input type="text"
                            name="TotalNumberOfTickets" ref={register({ required: true, pattern: numberPatterns })}

                            disabled={isCreateProductInProgress} />
                        <div className="input-undeline"></div>
                        <label>Total Number Of Tickets</label>
                        {errors.TotalNumberOfTickets && <span className="required-field">Please provide a valid number</span>}

                    </div> */}



                                                        {/* <div className="form-control">
                                <select name="ToPlace" ref={register({ required: true })}
                                    disabled={isCreateProductInProgress}
                                >
                                    <option></option>
                                    {listCities}
                                </select>
                         
                                <div className="input-undeline"></div>
                                <label>Destination</label>
                                {errors.ToPlace && <span className="required-field">Please provide a valid city</span>}
                            </div> */}







                                                        {/* 
                            <div className="form-control">
                                <input type="text" name="Descriptions" ref={register({ required: true })}
                                    disabled={isCreateProductInProgress} />
                                <div className="input-undeline"></div>
                                <label>Descriptions</label>
                                {errors.Descriptions && <span className="required-field">Please provide a valid Descriptions</span>}
                            </div> */}




                                                    </div>
                                                </div>

                                                {
                                                    !isCreateProductInProgress && <button className="btn-create-payment-option" type="submit">Create new payment</button>

                                                }




                                            </form>



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

export default NewPaymentOption


