import React, { useEffect, useState } from 'react';
import '../../Styles/NewCompany.scss';
import { useForm } from "react-hook-form";
import {
    GridLoader
} from 'react-spinners';
import TopNavigation from '../Navigation/TopNavigation';
import LeftNavigation from '../Navigation/LeftNavigation';
import axiosInstance from '../../Api/Api';
import Footer from '../Footer/Footer';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import { useAppSelector } from '../../App/hooks';
import { selectNavigationState } from '../../features/navigation/navigationSlice';
import ICompanyViewEdit from '../../Types/ICompanyViewEdit';
import ICompanies from '../../Types/ICompanies';
import { animateScroll as scroll } from 'react-scroll';



const ViewCompany = (props: any) => {
    const { register, handleSubmit, errors } = useForm<ICompanyViewEdit>();
    const [resultUpdateCompanyError, SetresultUpdateCompanyError] = useState(false);
    const [isUpdateCompanyInProgress, SetIsUpdateCompanyInProgress] = useState(false);
    const [isCompanyInEditMode, SetIsCompanyInEditMode] = useState(false);
    const [stateCompanyDetails, setstateCompanyDetails] = useState<ICompanies>();
    const companyId: string = props.match.params.companyId;

    const emailPatterns = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phoneNumberPatterns = /^\d{10}$/;
    const navState = useAppSelector(selectNavigationState);
    const companies = JSON.parse(sessionStorage.getItem('companiesList') || '{}');
    const onSubmit = (data: ICompanyViewEdit) => {


        SetIsUpdateCompanyInProgress(true);
        SetresultUpdateCompanyError(false);
        scroll.scrollToTop();
        let formData = new FormData();




        formData.append("CompanyID", companyId);
        formData.append("Name", data.Name);
        formData.append("Email", data.Email);
        formData.append("Phonenumber", data.Phonenumber);
        formData.append("PhysicalAddress", data.PhysicalAddress);
        formData.append("AdvertMessage", data.AdvertMessage);
        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };
        axiosInstance
            .put("company", formData, config)
            .then((response) => {

                if (response.status === 200) {

                    props.history.push("/companies/list");
                } else {

                    SetIsUpdateCompanyInProgress(false);
                    SetresultUpdateCompanyError(true)
                }


            })
            .catch((error) => {
                SetIsUpdateCompanyInProgress(false);
                SetresultUpdateCompanyError(true)

            });




    };

    useEffect(() => {


        if (companies) {

            const retrieveCompany = companies.find((company: { companies_companyID: string; }) => company.companies_companyID === companyId);
            setstateCompanyDetails(retrieveCompany);

        } else {

            props.history.push("/companies/list");
        }



    }, [])






    return (
        <div className="newcompany">


            <div className="newcompany-container">
                <div className={navState ? "page-left-navigation" : "page-left-navigation-hidden"}>
                    <LeftNavigation />
                </div>

                <div className="page-top-right-navigation-page-content">
                    <div className="top-right-navigation">

                        <TopNavigation />
                    </div>
                    <div className="page-content">
                        <div className="new-company">

                            <div className="new-company-form-container">
                                <div className="companies-container-header">
                                    <h1 className="page-header-companies">View  Company</h1>

                                </div>
                                {
                                    resultUpdateCompanyError && <div className="create-company-alert">
                                        <p>There was a problem while updating this company. Please try again.</p>
                                    </div>
                                }

                                {isUpdateCompanyInProgress &&
                                    <div className="loader-icon-create-company">

                                        <GridLoader size={15} margin="2" color="#0078d4" />
                                    </div>

                                }

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-new-company">
                                        <div className="form-new-company-left">
                                            <div className="form-control">
                                                <input type="text" name="Name"
                                                    defaultValue={stateCompanyDetails?.companies_name}
                                                    ref={register({ required: true })}
                                                    disabled={!isCompanyInEditMode} />
                                                <div className="input-undeline"></div>
                                                <label>Name</label>
                                                {errors.Name && <span className="required-field">Please provide a valid name</span>}

                                            </div>
                                            <div className="form-control">
                                                <input type="tel" name="Phonenumber"
                                                    defaultValue={stateCompanyDetails?.companies_phonenumber}
                                                    ref={register({ required: true, pattern: phoneNumberPatterns })}
                                                    disabled={!isCompanyInEditMode} />
                                                <div className="input-undeline"></div>
                                                <label>Phone number</label>
                                                {errors.Phonenumber && <span className="required-field">Please provide a valid phone number with a minimun of 10 digits</span>}
                                            </div>



                                            <div className="form-control">
                                                <input type="text"
                                                    defaultValue={stateCompanyDetails?.companies_email}
                                                    name="Email" ref={register({ required: true, pattern: emailPatterns })}
                                                    disabled={!isCompanyInEditMode}
                                                />
                                                <div className="input-undeline"></div>
                                                <label>Email</label>
                                                {errors.Email && <span className="required-field">Please provide a valid email</span>}
                                            </div>
                                            <div className="form-control">
                                                <input type="text" name="AdvertMessage"
                                                    defaultValue={stateCompanyDetails?.companies_advertMessage}
                                                    ref={register({ required: true })}
                                                    disabled={!isCompanyInEditMode} />
                                                <div className="input-undeline"></div>
                                                <label>Advert Message</label>
                                                {errors.AdvertMessage && <span className="required-field">Please provide a valid Advert Message</span>}
                                            </div>


                                        </div>



                                        <div className="form-new-company-right">


                                            <div className="form-control">

                                                <textarea name="PhysicalAddress" rows={3}
                                                    defaultValue={stateCompanyDetails?.companies_physicalAddress}
                                                    ref={register({ required: true })}
                                                    disabled={!isCompanyInEditMode}></textarea>
                                                <div className="input-undeline"></div>
                                                <label>Physical Address</label>
                                                {errors.PhysicalAddress && <span className="required-field">Please provide a valid Advert Message</span>}
                                            </div>



                                        </div>
                                    </div>

                                    {
                                        !isCompanyInEditMode && <button className="btn-create-company" onClick={() => SetIsCompanyInEditMode(true)}>Edit Company</button>


                                    }
                                    {
                                        isCompanyInEditMode && <button className="btn-update-company" type="submit">Update Company</button>

                                    }
                                    {
                                        isCompanyInEditMode && <button className="btn-create-company" onClick={() => SetIsCompanyInEditMode(false)}>Cancel Edit </button>


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

export default ViewCompany

