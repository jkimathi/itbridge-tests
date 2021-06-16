
import React, { useState } from 'react';
import '../../Styles/PaymentConfirmation.scss';

import NavigationSearchhPage from '../Navigation/NavigationSearchhPage';

import BackToTopButton from '../BackToTopButton/BackToTopButton';
import Footer from '../Footer/Footer';
import { useForm } from 'react-hook-form';
import IPaymentConfirmation from '../../Types/IPaymentConfirmation';
import { GridLoader } from 'react-spinners';
import axiosInstance from '../../Api/Api';


//FIXME: pattern
const numberPatterns = /[a-z\d]+/;
const PaymentConfirmation = () => {
    const { register, handleSubmit, watch, reset, errors } = useForm<IPaymentConfirmation>();
    const [stateErrorSubmit, setstateErrorSubmit] = useState(false);
    const [stateIsLoading, setstateIsLoading] = useState(false);
    const [stateIsSubmitted, setstateIsSubmitted] = useState(false);


    const onSubmit = (data: IPaymentConfirmation) => {

        setstateIsLoading(true);
        setstateErrorSubmit(false);
        setstateIsSubmitted(false);



        let formData = new FormData();


        formData.append("Voucher", data.Voucher);
        formData.append("Reference", data.Reference);




        axiosInstance
            .put("auth/submit/reference", formData)
            .then((response) => {

                if (response.data.results) {
                    setstateIsLoading(false);
                    setstateIsSubmitted(true);
                    reset();


                } else {
                    setstateIsLoading(false);

                    setstateErrorSubmit(true);
                }


            })
            .catch((error) => {

                setstateIsLoading(false);

                setstateErrorSubmit(true);

            });

    };

    return (
        <div className="payment-reference">
            <NavigationSearchhPage />
            <div className="payment-reference-container">
                <div className="payment-reference-header">

                    <div className="payment-reference-header-content">
                        <h2 className="payment-reference-header-title">Welcome to IT Bridge</h2>


                        <h2 className="payment-reference-sub-header-title">Submit your payment Reference</h2>


                    </div>




                </div>
            </div>

            <div className="payment-refence-form-container">
                <div className="payment-refence-form">
                    {stateIsLoading &&
                        <div className="loader-icon">
                            <GridLoader size={15} margin="2" color="#0078d4" />

                        </div>

                    }

                    {
                        stateErrorSubmit &&
                        <div className="error-message">
                            <p>
                                Request not successful, Please try again.
                            </p>

                        </div>
                    }

                    {
                        stateIsSubmitted &&
                        <div className="submit-success-message">
                            <p>
                                Information successfully submitted.
                            </p>
                        </div>
                    }

                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="payment-refence-form-control">
                            <div className="form-control">
                                <input type="text" name="Voucher" ref={register({ required: true, pattern: numberPatterns, minLength: 10, maxLength: 10 })}
                                    disabled={stateIsLoading} />
                                <div className="input-undeline"></div>
                                <label>Voucher</label>
                                {errors.Voucher && <span className="required-field">Please provide a voucher </span>}
                                {errors.Voucher && errors.Voucher.type === "pattern" && <span className="required-field">Please provide a valid voucher</span>}
                                {errors.Voucher && errors.Voucher.type === "minLength" && <span className="required-field">Please provide a valid voucher</span>}
                                {errors.Voucher && errors.Voucher.type === "maxLength" && <span className="required-field">Please provide a valid voucher</span>}

                            </div>
                            <div className="form-control">
                                <input type="text" name="Reference" ref={register({ required: true })}
                                    disabled={stateIsLoading}

                                />
                                <div className="input-undeline"></div>
                                <label>Reference</label>
                                {errors.Reference && <span className="required-field">Please provide a valid reference</span>}
                            </div>



                            {
                                !stateIsLoading &&
                                <div className="form-control">

                                    <button className="btn-submit-ref" type="submit">Submit</button>

                                </div>
                            }




                        </div>
                    </form>

                </div>

            </div>




            <BackToTopButton />

            <Footer />


        </div>
    )
}

export default PaymentConfirmation
