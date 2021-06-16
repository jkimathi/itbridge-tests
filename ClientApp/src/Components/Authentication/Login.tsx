import React, { useState, useEffect } from 'react';
import '../../Styles/Login.scss';
import { useForm } from "react-hook-form";
import axiosInstance from "../../Api/Api";
import {
    GridLoader
} from 'react-spinners';
import { Link } from 'react-router-dom';
import NavigationSearchhPage from '../Navigation/NavigationSearchhPage';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import Footer from '../Footer/Footer';
import accountResourceService from '../../core/Services/account-resource-service';

const _services = new accountResourceService();

interface ILogin {
    username: string;
    password: string;

};

const Login = (props: any) => {
    const { register, handleSubmit, errors } = useForm<ILogin>();
    const [resultLoginError, SetresultLoginError] = useState(false);
    const [isLoginInProgress, SetIsLoginInProgress] = useState(false);
    const [stateCountryName, setstateCountryName] = useState("");


    const formData = new FormData();
    const onSubmit = (data: ILogin) => {
        SetIsLoginInProgress(true);
        SetresultLoginError(false);
     
        formData.append("password", data.password);
        formData.append("username", data.username);

        axiosInstance
            .post("/auth/login", formData)
            .then((response) => {
                if (response.status === 200) {

                    if (response.data.userDetails) {
                        sessionStorage.setItem("token", response.data.token);
                        sessionStorage.setItem("defaultCompany", response.data.defaultCompanyDetails.name);
                        const fullName = response.data.userDetails.name + " " + response.data.userDetails.surname;
                        sessionStorage.setItem("userFullName", fullName);
                        props.history.push("/dashboard");
                    }
                } else {
                    SetresultLoginError(true);
                    SetIsLoginInProgress(false);
                }
            })
            .catch((error) => {

                SetresultLoginError(true);
                SetIsLoginInProgress(false);
            });
    };

    async function getCountryCodeIso3() {
        const data = await _services.getCountryCode();
        setstateCountryName(data.country_name.toString())
    }

    useEffect(() => {
        getCountryCodeIso3();
    }, []);

    const getCurrentUser = sessionStorage.getItem("token");

    if (getCurrentUser) {
        props.history.push("/dashboard");
    }
    return (
        <div className="login">
            <div className="navigation">
                <NavigationSearchhPage />
            </div>
            <div className="login-container">

                <div className="login-left">
                    <div className="text-container">
                        <div className="company-name">
                            <h2>IT Bridge {stateCountryName}</h2>
                            <h3>Welcome Back!</h3>
                        </div>
                        <div className="company-intro">
                            <p>Signin to your account and manage your business</p>
                        </div>
                        <div className="support-team">
                            <p>Support Team: <a href="mailto:support@itbridge.co.za">support@itbridge.co.za</a></p>
                        </div>
                    </div>
                </div>
                <div className="login-right">
                    <div className="form-container">

                        <h1>Signin</h1>
                        {isLoginInProgress &&
                            <div className="loader-icon-login">
                                <GridLoader size={20} margin={2} color="#0078d4" />
                            </div>

                        }



                        <form onSubmit={handleSubmit(onSubmit)}>
                            {resultLoginError &&
                                <div className="login-alert">
                                    <p>There was a problem logging in. Check your email and password or create an account.</p>
                                </div>}

                            <div className="form-control">
                                <input type="text" name="username"
                                    ref={register({ required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })}
                                    disabled={isLoginInProgress} />
                                {/* <div className="input-undeline"></div>
                                <label>Username</label> */}

                                <span className="highlight"></span>
                                <span className="input-undeline"></span>
                                <label>Username</label>

                                {errors.username && errors.username.type === "required" && <span className="required-field">Please provide an email address</span>}
                                {errors.username && errors.username.type === "pattern" && <span className="required-field">Please provide a valid email address</span>}
                            </div>

                            <div className="form-control">
                                <input type="password" name="password"
                                    ref={register({ required: true })}
                                    disabled={isLoginInProgress}
                                />
                                <div className="input-undeline"></div>
                                <label>Password</label>
                                {errors.password && <span className="required-field">Please provide a valid password.</span>}
                            </div>
                            <div className="form-control "  >

                                <button className={isLoginInProgress ? 'btn-auth-hidden' : 'btn-auth'} type="submit"  >SignIn</button>

                            </div>
                            <div className="link-to-sign-in-help">

                                <p>
                                    Forgot password? <Link to="/signup">  Reset</Link>
                                </p>
                            </div>
                            <div className="link-to-sign-in-help">
                                <p>
                                    Don’t have an account?  <Link to="/signup">Signup</Link>
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

export default Login
