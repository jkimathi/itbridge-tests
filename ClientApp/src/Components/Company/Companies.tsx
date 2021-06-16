import React, { useState, useEffect } from 'react';
import Company from './Company';
import '../../Styles/Companies.scss';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

import LeftNavigation from '../Navigation/LeftNavigation';
import TopNavigation from '../Navigation/TopNavigation';
import axiosInstance from "../../Api/Api";
import ICompanies from '../../Types/ICompanies';
import { GridLoader } from 'react-spinners';
import BlockIcon from '@material-ui/icons/Block';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import Footer from '../Footer/Footer';
import { useAppSelector } from '../../App/hooks';
import { selectNavigationState } from '../../features/navigation/navigationSlice';
import { useForm } from 'react-hook-form';
import IDefaultCompany from '../../Types/IDefaultCompany';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';



const Companies = (props: any) => {
    const [stateCompanies, setstateCompanies] = useState<ICompanies[]>([]);
    const navState = useAppSelector(selectNavigationState);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isPageEmpty, setIsPageEmpty] = useState(false);
    const [isUpdateDeaultCompanyIprogress, setIsUpdateDeaultCompanyIprogress] = useState(false);
    const [stateDefaultCompany, setstateDefaultCompany] = useState("");


    const { register, handleSubmit, errors } = useForm<IDefaultCompany>();
    const MySwal = withReactContent(Swal);



    //update default company
    const onSubmit = (data: IDefaultCompany) => {
        setIsUpdateDeaultCompanyIprogress(true);


        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };
        //change default company
        axiosInstance
            .get(`company/set/current/company/${data.companyId}`, config)
            .then((response) => {


                if (response.data.response) {
                    //retrieve company details
                    const newDefaultCompany = stateCompanies.find((company: { companies_companyID: string; }) => company.companies_companyID === data.companyId);

                    setIsUpdateDeaultCompanyIprogress(false);
                    // set default company name
                    sessionStorage.setItem("defaultCompany", String(newDefaultCompany?.companies_name));
                    setstateDefaultCompany(String(newDefaultCompany?.companies_name));

                    MySwal.fire(
                        'Updated!',
                        'Commpany successfully updated.',
                        'success'
                    )


                } else {
                    setIsUpdateDeaultCompanyIprogress(false);
                    MySwal.fire(
                        'Error!',
                        'Error please try again.',
                        'error'
                    )

                }


            })
            .catch((error) => {
                setIsUpdateDeaultCompanyIprogress(false);
                MySwal.fire(
                    'Error!',
                    'Error please try again.',
                    'error'
                )
            });



    }



    //load companies
    useEffect(() => {
        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };

        const defaultCompany = sessionStorage.getItem("defaultCompany");
        setstateDefaultCompany(String(defaultCompany));
        axiosInstance
            .get("company", config)
            .then((response) => {

                setIsPageLoading(false);
                if (response.data.list.length) {

                    setstateCompanies(response.data.list);
                    sessionStorage.setItem("companiesList", JSON.stringify(response.data.list));

                } else {
                    setIsPageEmpty(true)


                }
            })
            .catch((error) => {

                setIsPageLoading(false);

            });
    }, []);

    const listCompanies = stateCompanies.map((company) => {
        return (
            <Company


                companies_companyID={company.companies_companyID}
                companies_name={company.companies_name}
                companies_uniqueCode={company.companies_uniqueCode}
                companies_phonenumber={company.companies_phonenumber}
                companies_email={company.companies_email}
                companies_isPremium={company.companies_isPremium}
                companies_isActive={company.companies_isActive}

                companies_websiteUrlLink={company.companies_websiteUrlLink}
                companies_advertMessage={company.companies_advertMessage}
                companies_imagesLink={company.companies_imagesLink}

                companies_physicalAddress={company.companies_physicalAddress}



            />
        )

    });


    /*
    list of companies to allow user to switch between companies
    for data retrieval
    */
    const usersCompanies = stateCompanies.map((Company) => {
        return (
            <>
                <option key={Company.companies_companyID} value={Company.companies_companyID}>
                    {Company.companies_name}

                </option>
            </>
        )
    });
    return (
        <div className="companies">

            <div className="companies-container">
                <div className={navState ? "page-left-navigation" : "page-left-navigation-hidden"}>
                    <LeftNavigation />
                </div>

                <div className="page-top-right-navigation-page-content">
                    <div className="top-right-navigation">

                        <TopNavigation />
                    </div>
                    <div className="page-content">
                        <div className="companies">

                            <div className="companies-container">
                                <div className="companies-container-current-company">
                                    {
                                        !isPageEmpty ?
                                            <div className="current-company">
                                                <h3>Default company: <span>{stateDefaultCompany ? stateDefaultCompany : "Not set"}</span></h3>

                                            </div>
                                            :
                                            ""


                                    }

                                    {isUpdateDeaultCompanyIprogress &&

                                        <div className="loader-updatedefault-company">
                                            <GridLoader size={18} margin="2" color="#0078d4" />

                                        </div>




                                    }






                                    {!isUpdateDeaultCompanyIprogress && !isPageEmpty ?
                                        <div className="list-my-companies">

                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="container-select-company">
                                                    <select name="companyId" ref={register({ required: true })}
                                                    >
                                                        {
                                                            usersCompanies
                                                        }

                                                    </select>

                                                    {errors.companyId &&
                                                        <span className="required-field">Please select a company</span>
                                                    }



                                                </div>

                                                <div className="container-change-company">
                                                    <button className="btn-change-company">Switch company</button>

                                                </div>
                                            </form>

                                        </div>
                                        :
                                        ""

                                    }


                                </div>
                                <div className="companies-container-header">
                                    <h1 className="page-header-companies">Companies</h1>
                                    <Link className="link-create-company" to="/companies/new"> <AddIcon className="icon-add-company" style={{ fontSize: 18 }} />Create company</Link>

                                </div>
                                {isPageLoading ?
                                    <div className="loader-companies">

                                        <GridLoader size={20} margin="2" color="#0078d4" /></div>

                                    :

                                    <div className="companies-list">
                                        {
                                            isPageEmpty ?
                                                <div className="container-no-company-found">
                                                    <div className="container-no-company-found-icon">
                                                        <BlockIcon style={{ fontSize: 70 }} />
                                                    </div>
                                                    <div className="container-no-company-found-text">
                                                        <h2> You do not have any companies at the moment
                                                        </h2>

                                                        <Link className="link-create-company" to="/companies/new"> <AddIcon className="icon-add-company" style={{ fontSize: 18 }} />Create company</Link>

                                                    </div>


                                                </div>
                                                :
                                                listCompanies



                                        }


                                    </div>

                                }



                            </div>

                        </div>
                        <BackToTopButton />


                    </div>

                </div>


            </div>


            <Footer />

        </div>






    )
}

export default Companies
