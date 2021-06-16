import React, { useState, useEffect } from 'react';
import '../../Styles/Signup.scss';
import { useForm } from "react-hook-form";
import { GridLoader, PropagateLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import axiosInstance from '../../Api/Api';
import axios from 'axios';
import { animateScroll as scroll } from 'react-scroll';
import NavigationSearchhPage from '../Navigation/NavigationSearchhPage';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import Footer from '../Footer/Footer';
import ISignUP from '../../Types/ISignUP';
import ILanguages from '../../Types/ILanguages';
import ICountries from '../../Types/ICountries';
import IGenders from '../../Types/IGenders';
import accountResourceService from '../../core/Services/account-resource-service';
import IIsoRetrievalModel from "../../core/Models/iso-retrieval-model";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
 

import ICategories from '../../Types/ICategories';
import ISubCategories from '../../Types/ISubCategories';

const SignUp = (props: any) => {
    const { register, handleSubmit, errors } = useForm<ISignUP>();
    const [resultSignUpError, SetResultSignUpError] = useState(false);
    const [isSignUpInProgress, SetIsSignUpInProgress] = useState(false);
    const [isCheckUsernameResultVisible, SetIsCheckUsernameResultVisible] = useState(false);
    const [stateLanguages, setStateLanguages] = useState<ILanguages[]>([]);
    const [stateSelectedLanguages, setStateSelectedLanguages] = useState<ILanguages[]>([]);
    const [stateCountries, setStateCountries] = useState<ICountries[]>([]);
    const [stateGenders, setStateGenders] = useState<IGenders[]>([]);
    const [stateCountry, setStateCountry] = useState<ICountries>();
    const [stateIso, setStateIso] = useState<IIsoRetrievalModel>();

    const [stateCountryCode, setStateCountryCode] = useState("");
    const [stateLanguageId, setStateLanguageId] = useState(Number);
    const [stateCountryID, setStateCountryID] = useState(Number)
    const [stateCompanyType, setStateCompanyType] = useState<ICategories[]>([]);


    //Services
    const _services = new accountResourceService();

    //const [countryDetails, SetCountryDetails] = useState<ICountry>();
    const [usernameAvaialbilityText, SetUsernameAvaialbilityText] = useState("");
    const [IsUsernameAvailable, SetIsUsernameAvailable] = useState(false);
    const [ICheckUsernameStatusInProgress, SetICheckUsernameStatusInProgress] = useState(false);
    const emailPatterns = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phoneNumberpattern = /^\d{10}$/;

    let languageID = 0

    const onSubmit = (data: ISignUP) => {

        // if (!isValidPhoneNumber(stateCountryCode)) {
        //     alert("Phone Number is not valid!");
        //     return;
        // }

        SetIsSignUpInProgress(true);
        SetResultSignUpError(false);
        scroll.scrollToTop();
        let formData = new FormData();

        formData.append("Name", data.Name);
        formData.append("Surname", data.Surname);
        formData.append("Email", data.Email);
        formData.append("Password", data.Password);
        formData.append("Phonenumber", data.Phonenumber);
        formData.append("LanguageID", data.LanguageID);
        formData.append("CountryID", data.CountryID);
        formData.append("GenderID", data.GenderID);
        formData.append("BusinessTypeID", data.BusinessTypeID);
        axiosInstance
            .post("auth/registration", formData)
            .then((response) => {

                if (response.status === 201) {

                    props.history.push("/");
                } else {
                    SetResultSignUpError(true);
                    SetIsSignUpInProgress(false);
                }


            })
            .catch((error) => {
                SetResultSignUpError(true);
                SetIsSignUpInProgress(false);
            });
    };

    //verify user email
    const handleVerifyUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        const username = e.target.value;
        SetUsernameAvaialbilityText("");
        SetIsCheckUsernameResultVisible(true);
        SetICheckUsernameStatusInProgress(true);

        if (emailPatterns.test(username)) {
            axiosInstance
                .get(`auth/return/secret_user/given/username/${username}`)
                .then((response) => {

                    if (response.data.user != null) {

                        SetICheckUsernameStatusInProgress(false);
                        SetUsernameAvaialbilityText("Username not available");
                        SetIsUsernameAvailable(false);
                    } else {
                        SetICheckUsernameStatusInProgress(false);
                        SetUsernameAvaialbilityText("Username available");
                        SetIsUsernameAvailable(true);
                    }

                })
                .catch((error) => {
                    alert(error)
                    SetICheckUsernameStatusInProgress(false);

                });
        } else {
            SetIsCheckUsernameResultVisible(false);
        }
    };


    async function getCountryCodeIso3() {
        const data = await _services.getCountryCode();
        sessionStorage.setItem("country", data.country_name);
        setStateIso(data);
    }

    async function getLanguages() {
        const response = await _services.getLanguages();
        setStateLanguages(response.languages);

    }
    async function getCountries() {
        debugger
        const countries = await _services.getCountries();
        setStateCountries(countries.countries);
        setStateCountryID(countries.countries.filter((item: { name: string | undefined; }) => item.name == sessionStorage.getItem("country"))[0]?.countryID)  ///  don't forget to fix 
        setStateCountryCode(countries.countries.filter((item: { name: string | null; }) => item.name == sessionStorage.getItem("country"))[0]?.phonenumberCode.toString())
        setStateLanguageId(countries.countries.filter((item: { name: string | null; }) => item.name == sessionStorage.getItem("country"))[0]?.languageID)
    }

    async function getCompanysTypes(langaueId: number) {
        const response = await _services.getCompanyTypes(langaueId);
        setStateCompanyType(response.list);
    }

    async function getGenders(langaueId: number) {
        const response = await _services.getGenders(langaueId);
        setStateGenders(response.genders);

    }
    useEffect(() => {
        getCountryCodeIso3();
        getCountries();
        getLanguages();
        getCompanysTypes(1);
        getGenders(1);

    }, []);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const languageId = parseInt(e.target.value);
        setStateLanguageId(languageId);
        getGenders(languageId);
        getCompanysTypes(languageId);
    }

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStateCountryID(parseInt(e.target.value))
        let countryID = Number(e.target.value);
        const selectedCountries = stateCountries.filter(country => country.countryID == countryID);
        setStateCountryCode(selectedCountries[0].phonenumberCode.toString());
        const selectedLanguageId = Number(selectedCountries[0].languageID);
        setStateLanguageId(selectedLanguageId);
        getCompanysTypes(selectedLanguageId);
        getGenders(selectedLanguageId);

    }

    return (
        <div className="signup">
            <div className="navigation">
                <NavigationSearchhPage />
            </div>
            <div className="signup-container">

                <div className="signup-left">
                    <div className="text-container">
                        <div className="company-name">
                            <h2>IT Bridge {sessionStorage.getItem("country")}</h2>
                            <h3>Welcome Back!</h3>
                        </div>
                        <div className="company-intro">
                            <p>Create an account to your account and manage your business</p>
                        </div>
                        <div className="support-team">
                            <p>Support Team: <a href="mailto:support@itbridge.co.za">support@itbridge.co.za</a></p>
                        </div>
                    </div>
                </div>
                <div className="signup-right">
                    <div className="form-container">

                        <h1>Sign up</h1>

                        {isSignUpInProgress &&
                            <div className="loader-icon-signup">
                                <GridLoader size={20} margin={2} color="#0078d4" />
                            </div>

                        }

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {resultSignUpError &&
                                <div className="login-alert">
                                    <p>There was a problem logging in. Check your email and password or create an account.</p>
                                </div>
                            }
                            <div className="form-control">
                                <input type="text" name="Name" ref={register({ required: true })}
                                    disabled={isSignUpInProgress} />
                                <div className="input-undeline"></div>
                                <label>Name</label>
                                {errors.Name && <span className="required-field">Please provide a valid name</span>}
                            </div>
                            <div className="form-control">
                                <input type="text" name="Surname" ref={register({ required: true })} disabled={isSignUpInProgress} />
                                <div className="input-undeline"></div>
                                <label>Surname</label>
                                {errors.Surname && <span className="required-field">Please provide a valid surname</span>}
                            </div>
                            <div className="form-control">
                                <input type="text" name="Email"
                                    ref={register({ required: true, pattern: emailPatterns })}
                                    disabled={isSignUpInProgress}
                                    onBlur={(event) => handleVerifyUsername(event)}
                                />
                                <div className="input-undeline"></div>
                                <label>Email</label>
                                {errors.Email && <span className="required-field">Please provide a valid email address</span>}
                                {/* <p className={IsUsernameAvailable ? "username-available" : "username-not-available"} >{usernameAvaialbilityText}</p> */}
                            </div>
                            {
                                isCheckUsernameResultVisible ?
                                    <div className="form-control-username-status">
                                        <div className="loader-username-status">
                                            {
                                                ICheckUsernameStatusInProgress && <PropagateLoader size={15} color="#0078d4" />
                                            }

                                        </div>
                                        <p className={IsUsernameAvailable ? "username-available" : "username-not-available"} >{usernameAvaialbilityText}</p>
                                    </div>
                                    :
                                    ''
                            }
                            <div className="form-control">
                                <input type="password" name="Password" ref={register({ required: true, minLength: 8 })}
                                    disabled={isSignUpInProgress} />
                                <div className="input-undeline"></div>
                                <label>Password</label>
                                {errors.Password && <span className="required-field">Please provide a valid password with a minimun of 8 digits</span>}
                            </div>
                            <div className="form-control">

                                <select name="CountryID" value={stateCountryID} ref={register({ required: true })}
                                    disabled={isSignUpInProgress}
                                    onChange={(event) => handleCountryChange(event)}>
                                    <option ></option>
                                    {stateCountries.map((option) => (
                                        <option value={option.countryID}>{option.name}</option>
                                    ))}
                                </select>

                                <div className="input-undeline"></div>
                                <label>Country</label>
                                {errors.CountryID && <span className="required-field">Please provide a valid country</span>}
                            </div>
                            <div className="form-control-phone-number">
                                {/* <div className="country-code">
                                    <h2>+{stateCountryCode}</h2>
                                </div> */}
                                <div className="phone-number-container">
                                    <PhoneInput
                                        name="Phonenumber"
                                        placeholder="Enter phone number"
                                        value={stateCountryCode}
                                        onChange={setStateCountryCode} />

                                    {/* <input type="text" name="Phonenumber" ref={register({ required: true, minLength: 10, pattern: phoneNumberpattern })}
                                        disabled={isSignUpInProgress} /> */}
                                    {/* <div className="input-undeline"></div>
                                    <label>Phone number</label> */}
                                    {errors.Phonenumber && <span className="required-field">Please provide a valid phone number </span>}
                                </div>
                            </div>

                            <div className="form-control">
                                <select name="LanguageID" value={stateLanguageId} ref={register({ required: true })}
                                    disabled={isSignUpInProgress} onChange={(event) => handleLanguageChange(event)} >
                                    <option></option>
                                    {stateLanguages.map((option) => (
                                        <option value={option.languageID}>{option.name}</option>
                                    ))}
                                </select>
                                <div className="input-undeline"></div>
                                <label>Language</label>
                                {errors.LanguageID && <span className="required-field">Please provide a valid language</span>}
                            </div>

                            <div className="form-control">
                                <select name="GenderID" ref={register({ required: true })}
                                    disabled={isSignUpInProgress}>
                                        <option>Select Gender</option>
                                    {stateGenders.map((option) => (
                                        <option value={option.genderID}>{option.name}</option>
                                    ))}
                                </select>
                                <div className="input-undeline"></div>
                                <label>Gender</label>
                                {errors.GenderID && <span className="required-field">Please provide a valid gender</span>}
                            </div>
                            <div className="form-control">
                                <select
                                    name="BusinessTypeID"
                                    ref={register({ required: true })}
                                    disabled={isSignUpInProgress}
                                >
                                    <option>Select Business Type</option>
                                    {
                                        stateCompanyType.map((category) => (
                                            <option key={category.categoryID} value={category.categoryID}>
                                                {category.name}
                                            </option>
                                        ))
                                    }
                                </select>

                                <div className="input-undeline"></div>
                                <label>Buisness Type</label>
                                {errors.BusinessTypeID && (
                                    <span className="required-field">
                                        Please provide a valid category
                                    </span>
                                )}
                            </div>
                            <div className="form-control">
                                <button className={isSignUpInProgress ? 'btn-auth-hidden' : 'btn-auth'} type="submit">Sign Up</button>
                            </div>
                            <div className="link-to-sign-up-help">
                                <p>
                                    Already have an account?  <Link to="/">  Signin</Link>
                                </p>
                            </div>

                        </form>

                    </div>

                </div>
            </div >
            <BackToTopButton />
            <Footer />
        </div>

    )
}

export default SignUp
