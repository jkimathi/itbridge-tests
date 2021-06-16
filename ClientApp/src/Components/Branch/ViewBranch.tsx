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
import ICountries from '../../Types/ICountries';

import { animateScroll as scroll } from 'react-scroll';
import IResultBranches from '../../Types/IResultBranches';
import IUpdateBranch from '../../Types/IUpdateBranch';

const ViewBranch = (props: any) => {
    const { register, handleSubmit, errors } = useForm<IUpdateBranch>();
    const [resultCreateBranchError, SetresultCreateBranchError] = useState(false);
    const [isCreateBranchInProgress, SetIsCreateBranchInProgress] = useState(false);
    const [stateCountries, setStateCountries] = useState<ICountries[]>([]);
    const navState = useAppSelector(selectNavigationState);
    const [stateBranchDetails, setStateBranchDetails] = useState<IResultBranches>();
    const [stateisBrancInEditMode, setstateisBranchInEditMode] = useState(false);
    const [stateBrancCountryName, setstateBrancCountryName] = useState("");

    const branchList = JSON.parse(sessionStorage.getItem('branchList') || '{}');
    const branchId: string = props.match.params.branchId;
    const onSubmit = (data: IUpdateBranch) => {
        SetIsCreateBranchInProgress(true);
        SetresultCreateBranchError(false);
        scroll.scrollToTop();
        let formData = new FormData();

        formData.append("BranchID", String(stateBranchDetails?.branchID));
        formData.append("IsMainBranch", data.IsMainBranch);
        formData.append("Name", data.Name);
        formData.append("Email", data.Email);
        formData.append("Phonenumber", data.Phonenumber);
        formData.append("PhysicalAddress", data.PhysicalAddress);
        formData.append("CountryID", String(stateBranchDetails?.countryID));

        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };
        axiosInstance
            .put("branch", formData, config)
            .then((response) => {

                if (response.data.results) {

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
    const phoneNumberPatterns = /^\d{10}$/;

    //load event details
    useEffect(() => {
        if (branchList) {

            const retrieveBranch = branchList.find((branch: { branchID: string; }) => branch.branchID === branchId);
            setStateBranchDetails(retrieveBranch);

        } else {

            props.history.push("/branches/list");
        }

    }, [])


    //load countries
    useEffect(() => {

        axiosInstance
            .get("/auth/countries")
            .then((response) => {


                setStateCountries(response.data.countries);

                const retrieveBranch: IResultBranches = branchList.find((branch: { branchID: string; }) => branch.branchID === branchId);
                setStateBranchDetails(retrieveBranch);

                const listCountries = response.data.countries;

                if (listCountries) {

                    const selectedCountryID = retrieveBranch.countryID;
                    const currentBrancCountry: ICountries = listCountries.find((country: { countryID: number; }) => country.countryID == selectedCountryID);
                    setstateBrancCountryName(currentBrancCountry.name);
                }



            })
            .catch((error) => {

            });




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
                                    <h1 className="page-header-companies">View Branch</h1>

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
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-new-company">
                                        <div className="form-new-company-left">
                                            <div className="form-control">



                                                <input type="text" name="Name"
                                                    defaultValue={stateBranchDetails?.name}
                                                    ref={register({ required: true })}
                                                    readOnly={!stateisBrancInEditMode} />
                                                <div className="input-undeline"></div>
                                                <label>Name</label>
                                                {errors.Name && <span className="required-field">Please provide a valid name</span>}

                                            </div>
                                            <div className="form-control">


                                                <input type="tel"
                                                    defaultValue={stateBranchDetails?.phonenumber}
                                                    name="Phonenumber" ref={register({ required: true, pattern: phoneNumberPatterns })}
                                                    readOnly={!stateisBrancInEditMode} />
                                                <div className="input-undeline"></div>
                                                <label>Phone number</label>
                                                {errors.Phonenumber && <span className="required-field">Please provide a valid phone number with a minimun of 10 digits</span>}
                                            </div>

                                            <div className="form-control">
                                                <input type="text"
                                                    defaultValue={stateBranchDetails?.email}
                                                    name="Email" ref={register({ required: true, pattern: emailPatterns })}
                                                    readOnly={!stateisBrancInEditMode}
                                                />
                                                <div className="input-undeline"></div>
                                                <label>Email</label>
                                                {errors.Email && <span className="required-field">Please provide a valid email</span>}
                                            </div>
                                            <div className="form-control-checkbox">
                                                <div className="IsProductActive">


                                                    <input type="checkbox"
                                                        defaultChecked={stateBranchDetails?.isActive}
                                                        name="IsMainBranch"
                                                        ref={register()}
                                                        disabled={!stateisBrancInEditMode}

                                                    />
                                                    <span>Is this the main branch ?</span>

                                                </div>




                                            </div>

                                            {
                                                !stateisBrancInEditMode &&
                                                <div className="form-control">



                                                    <input type="text" name="Name"
                                                        defaultValue={stateBrancCountryName}
                                                        ref={register({ required: true })}
                                                        readOnly={!stateisBrancInEditMode} />
                                                    <div className="input-undeline"></div>
                                                    <label>Country Name</label>

                                                </div>
                                            }









                                            {
                                                stateisBrancInEditMode &&
                                                <div className="form-control">
                                                    <select name="CountryID" ref={register({ required: true })}

                                                    >
                                                        <option></option>
                                                        {listCountries}
                                                    </select>
                                                    {/* <input type="text" name="countryID" ref={register({ required: true })}
disabled={isSignUpInProgress} /> */}
                                                    <div className="input-undeline"></div>
                                                    <label>Country</label>
                                                    {errors.CountryID && <span className="required-field">Please provide a valid country</span>}
                                                </div>


                                            }





                                        </div>
                                        <div className="form-new-company-right">
                                            <div className="form-control">

                                                <textarea
                                                    defaultValue={stateBranchDetails?.physicalAddress}
                                                    name="PhysicalAddress" rows={3} ref={register({ required: true })}
                                                    readOnly={!stateisBrancInEditMode}></textarea>
                                                <div className="input-undeline"></div>
                                                <label>Physical Address</label>
                                                {errors.PhysicalAddress && <span className="required-field">Please provide a valid physical address Message</span>}
                                            </div>



                                        </div>
                                    </div>


                                    {
                                        !stateisBrancInEditMode && <button className="btn-create-company" onClick={() => setstateisBranchInEditMode(true)}>Edit Branch</button>


                                    }
                                    {
                                        stateisBrancInEditMode && <button className="btn-update-company" type="submit">Update Branch</button>

                                    }
                                    {
                                        stateisBrancInEditMode && <button className="btn-create-company" onClick={() => setstateisBranchInEditMode(false)}>Cancel Edit </button>


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

export default ViewBranch
