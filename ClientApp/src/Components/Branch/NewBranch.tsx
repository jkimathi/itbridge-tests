import React, { useEffect, useState } from 'react';
import '../../Styles/NewBranch.scss';
import { useForm } from "react-hook-form";
import {
    GridLoader
} from 'react-spinners';
import TopNavigation from '../Navigation/TopNavigation';
import LeftNavigation from '../Navigation/LeftNavigation';
import axiosInstance from '../../Api/Api';
import { useAppSelector } from '../../App/hooks';
import { selectNavigationState } from '../../features/navigation/navigationSlice';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import Footer from '../Footer/Footer';
import INewBranch from '../../Types/INewBranch';
import ICountries from '../../Types/ICountries';

import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

import BlockIcon from '@material-ui/icons/Block';


const NewBranch = (props: any) => {
    const { register, handleSubmit, errors } = useForm<INewBranch>();
    const [resultCreateBranchError, SetresultCreateBranchError] = useState(false);
    const [isCreateBranchInProgress, SetIsCreateBranchInProgress] = useState(false);
    const [stateCompanyFound, setstateCompanyFound] = useState(false);
    const [stateCountryCode, setStateCountryCode] = useState("");
    const [stateCountries, setStateCountries] = useState<ICountries[]>([]);
    const navState = useAppSelector(selectNavigationState);
    const onSubmit = (data: INewBranch) => {
        const phoneNumberWithCountryCode = stateCountryCode + data.Phonenumber;
        SetIsCreateBranchInProgress(true);
        let formData = new FormData();
        formData.append("Name", data.Name);
        formData.append("Email", data.Email);
        formData.append("Phonenumber", phoneNumberWithCountryCode);
        formData.append("PhysicalAddress", data.PhysicalAddress);
        formData.append("CountryID", data.CountryID);

        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };
        axiosInstance
            .post("branch", formData, config)
            .then((response) => {

                if (response.status === 201) {

                    props.history.push("/branches/list");
                } else {

                    SetIsCreateBranchInProgress(false);
                    SetresultCreateBranchError(true)
                }


            })
            .catch((error) => {
                SetIsCreateBranchInProgress(false);
                SetresultCreateBranchError(true)

            });

    };

    const emailPatterns = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phoneNumberPatterns = /^\d{9}$/;


    //load countries
    useEffect(() => {

        axiosInstance
            .get("/auth/countries")
            .then((response) => {
                setStateCountries(response.data.countries);

            })
            .catch((error) => {

            });

        const defaultCompany = sessionStorage.getItem("defaultCompany");
        //verify if a company exist before creating a branch
        if (defaultCompany) {
            setstateCompanyFound(true);
        } else {
            setstateCompanyFound(false);
        }

    }, []);

    //list countries
    const listCountries = stateCountries.map((country, countryID) => {

        return (
            <>

                <option key={countryID} value={country.countryID}>
                    {country.name}
                </option>
            </>
        )

    });

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let countryID = Number(e.target.value);
        const selectedCountries = stateCountries.filter(country => country.countryID == countryID);
        setStateCountryCode(selectedCountries[0].phonenumberCode.toString());
    }
    return (

        <div className="newbranch">


            <div className="newbranch-container">
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
                                    <h1 className="page-header-companies">Create Branch</h1>

                                </div>
                                {
                                    resultCreateBranchError && <div className="create-company-alert">
                                        <p>There was a problem create a new branch. Please  try again.</p>
                                    </div>
                                }

                                {isCreateBranchInProgress &&
                                    <div className="loader-icon-create-company">

                                        <GridLoader size={15} margin="2" color="#0078d4" />
                                    </div>

                                }
                                {
                                    stateCompanyFound ?

                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form-new-company">
                                                <div className="form-new-company-left">
                                                    <div className="form-control">



                                                        <input type="text" name="Name" ref={register({ required: true })}
                                                            disabled={isCreateBranchInProgress} />
                                                        <div className="input-undeline"></div>
                                                        <label>Name</label>
                                                        {errors.Name && <span className="required-field">Please provide a valid name</span>}

                                                    </div>

                                                    <div className="form-control">
                                                        <select name="CountryID" ref={register({ required: true })}
                                                            disabled={isCreateBranchInProgress}
                                                            onChange={handleCountryChange}
                                                        >
                                                            <option></option>
                                                            {listCountries}
                                                        </select>

                                                        <div className="input-undeline"></div>
                                                        <label>Country</label>
                                                        {errors.CountryID && <span className="required-field">Please provide a valid country</span>}
                                                    </div>

                                                    <div className="form-control-phone-number">
                                                        <div className="country-code">
                                                            <h2>+{stateCountryCode}</h2>
                                                        </div>
                                                        <div className="phone-number-container">

                                                            <input type="text" name="Phonenumber" ref={register({ required: true, pattern: phoneNumberPatterns })}
                                                                disabled={isCreateBranchInProgress} />
                                                            <div className="input-undeline"></div>
                                                            <label>Phone number</label>
                                                            {errors.Phonenumber?.type === "required" && <span className="required-field">Please provide a valid phone number </span>}
                                                            {errors.Phonenumber?.type === "pattern" && <span className="required-field">Allowed Phone number format: 814567896 </span>}

                                                        </div>
                                                    </div>


                                                    <div className="form-control">
                                                        <input type="text"
                                                            name="Email" ref={register({ required: true, pattern: emailPatterns })}
                                                            disabled={isCreateBranchInProgress}
                                                        />
                                                        <div className="input-undeline"></div>
                                                        <label>Email</label>
                                                        {errors.Email && <span className="required-field">Please provide a valid email</span>}
                                                    </div>






                                                </div>
                                                <div className="form-new-company-right">
                                                    <div className="form-control">

                                                        <textarea name="PhysicalAddress" rows={3} ref={register({ required: true })}
                                                            disabled={isCreateBranchInProgress}></textarea>
                                                        <div className="input-undeline"></div>
                                                        <label>Physical Address</label>
                                                        {errors.PhysicalAddress && <span className="required-field">Please provide a valid physical address Message</span>}
                                                    </div>



                                                </div>
                                            </div>

                                            {
                                                !isCreateBranchInProgress && <button className="btn-create-company" type="submit">Create Branch</button>

                                            }




                                        </form>

                                        :
                                        <div className="container-no-company-found">
                                            <div className="container-no-company-found-icon">
                                                <BlockIcon style={{ fontSize: 70 }} />
                                            </div>
                                            <div className="container-no-company-found-text">
                                                <h2> You do not have any companies at the moment. You need at least on company to create a branch.
                                                </h2>

                                                <Link className="link-create-company" to="/companies/new"> <AddIcon className="icon-add-company" style={{ fontSize: 18 }} />Create company</Link>

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


    )
}

export default NewBranch
