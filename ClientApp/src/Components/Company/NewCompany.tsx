import React, { useEffect, useRef, useState } from 'react';
import '../../Styles/NewCompany.scss';
import { useForm } from "react-hook-form";
import {
    RiseLoader
} from 'react-spinners';
import TopNavigation from '../Navigation/TopNavigation';
import LeftNavigation from '../Navigation/LeftNavigation';
import axiosInstance from '../../Api/Api';
import Footer from '../Footer/Footer';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import { useAppSelector } from '../../App/hooks';
import { selectNavigationState } from '../../features/navigation/navigationSlice';
import { animateScroll as scroll } from 'react-scroll';
import INewCompany from '../../Types/INewCompany';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Compressor from 'compressorjs';

//image type used for compression
enum enum_ImageCategory {
    LogoImage,
    PortalImage
};




const NewCompany = (props: any) => {
    const { register, handleSubmit, errors } = useForm<INewCompany>();
    const [resultCreateCompanyError, SetresultCreateCompanyError] = useState(false);
    const [isCreateCompanyInProgress, SetIsCreateCompanyInProgress] = useState(false);
    const [stateIsCompanyLogoSelected, setstateIsCompanyLogoSelected] = useState(false);
    const [stateSelectedCompanyLogoPreview, setstateSelectedCompanyLogoPreview] = useState<File>();
    const [stateSelectedCompanyLogoPath, setstateSelectedCompanyLogoPath] = useState<string>();
    const UploadCompanyLogoInputRef = useRef<HTMLInputElement>(null);

    const [stateIsCustomerPortalSelected, setstateIsCustomerPortalSelected] = useState(false);
    const [stateSelectedCustomerPortalPreview, setstateSelectedCustomerPortalPreview] = useState<File>();
    const [stateSelectedCustomerPortalPath, setstateSelectedCustomerPortalPath] = useState<string>();
    const UploadCustomerPortalInputRef = useRef<HTMLInputElement>(null);

    const emailPatterns = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phoneNumberPatterns = /^\d{10}$/;
    const navState = useAppSelector(selectNavigationState);
    const onSubmit = (data: INewCompany) => {

        SetIsCreateCompanyInProgress(true);
        scroll.scrollToTop();
        let formData = new FormData();


        formData.append("Name", data.Name);
        formData.append("Email", data.Email);
        formData.append("Phonenumber", data.Phonenumber);
        formData.append("PhysicalAddress", data.PhysicalAddress);
        formData.append("AdvertMessage", data.AdvertMessage);
        formData.append("IsPaymentOnProductLevel", data.IsPaymentOnProductLevel);


        if (stateIsCompanyLogoSelected) {
            formData.append("Logo", stateSelectedCompanyLogoPreview!);


        }
        if (stateIsCustomerPortalSelected) {
            formData.append("CustomerPortalImage", stateSelectedCustomerPortalPreview!);

        }

        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };
        axiosInstance
            .post("company", formData, config)
            .then((response) => {

                if (response.status === 201) {

                    props.history.push("/companies/list");
                } else {


                    SetIsCreateCompanyInProgress(false);
                    SetresultCreateCompanyError(true)
                }


            })
            .catch((error) => {
                SetIsCreateCompanyInProgress(false);
                SetresultCreateCompanyError(true)

            });




    };

    //select  company logo
    const handleSelectCompanyLogo = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        event.preventDefault();
        UploadCompanyLogoInputRef.current?.click();

    }

    //select  customer portal 
    const handleSelectCustomerPortalLogo = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        event.preventDefault();
        UploadCustomerPortalInputRef.current?.click();

    }

    //compress portal logo 
    /**
     * 
     * @param logo  shoul be an image that will be compressed 
     * @param quality : quality of the compression a number 0.8 (for portal) and 0.6 (for logo) are recommanded
     * @param imageCateGory of the image can be company logo or portal image
     */
    const compressImageBeforeUpload = (rawImage: File, CompressionQuality: number, imageCateGory: enum_ImageCategory) => {

        new Compressor(rawImage, {
            quality: CompressionQuality,
            success(result) {

                if (imageCateGory === enum_ImageCategory.PortalImage) {
                    setstateSelectedCustomerPortalPreview(result as File);
                    setstateIsCustomerPortalSelected(true);
                } if (imageCateGory === enum_ImageCategory.LogoImage) {
                    setstateSelectedCompanyLogoPreview(result as File);
                    setstateIsCompanyLogoSelected(true);
                }


            },
            error(error) {
            },
        });





    }

    const selectCompanyLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        const logoCompany = event.target.files[0];
        if (logoCompany && logoCompany.type.substr(0, 5) === "image") {
            compressImageBeforeUpload(logoCompany, 0.6, enum_ImageCategory.LogoImage);
        }

    };

    const selectCustomerPortalImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        const portalImage = event.target.files[0];
        if (portalImage && portalImage.type.substr(0, 5) === "image") {
            compressImageBeforeUpload(portalImage, 0.8, enum_ImageCategory.PortalImage);
        }


    };



    useEffect(() => {
        if (stateSelectedCompanyLogoPreview) {
            const reader = new FileReader();
            reader.onloadend = () => {

                setstateSelectedCompanyLogoPath(reader.result as string);
            };
            reader.readAsDataURL(stateSelectedCompanyLogoPreview);
        } else {
            setstateSelectedCompanyLogoPath("");
        }

        if (stateSelectedCustomerPortalPreview) {
            const reader = new FileReader();
            reader.onloadend = () => {

                setstateSelectedCustomerPortalPath(reader.result as string);
            };
            reader.readAsDataURL(stateSelectedCustomerPortalPreview);
        } else {
            setstateSelectedCompanyLogoPath("");
        }
    }, [stateSelectedCompanyLogoPreview, stateSelectedCustomerPortalPreview]);

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
                                    <h1 className="page-header-companies">Create Company</h1>

                                </div>
                                {
                                    resultCreateCompanyError && <div className="create-company-alert">
                                        <p>There was a problem while creating a new company. Please try again.</p>
                                    </div>
                                }

                                {isCreateCompanyInProgress &&
                                    <div className="loader-icon-create-company">

                                        <RiseLoader size={15} margin="2" color="#0078d4" />
                                    </div>

                                }
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-new-company">
                                        <div className="form-new-company-left">
                                            <div className="form-control">
                                                <input type="text" name="Name" ref={register({ required: true })}
                                                    disabled={isCreateCompanyInProgress} />
                                                <div className="input-undeline"></div>
                                                <label>Name</label>
                                                {errors.Name && <span className="required-field">Please provide a valid name</span>}

                                            </div>
                                            <div className="form-control">
                                                <input type="tel" name="Phonenumber" ref={register({ required: true, pattern: phoneNumberPatterns })}
                                                    disabled={isCreateCompanyInProgress} />
                                                <div className="input-undeline"></div>
                                                <label>Phone number</label>
                                                {errors.Phonenumber && <span className="required-field">Please provide a valid phone number with a minimun of 10 digits</span>}
                                            </div>



                                            <div className="form-control">
                                                <input type="text"
                                                    name="Email" ref={register({ required: true, pattern: emailPatterns })}
                                                    disabled={isCreateCompanyInProgress}
                                                />
                                                <div className="input-undeline"></div>
                                                <label>Email</label>
                                                {errors.Email && <span className="required-field">Please provide a valid email</span>}
                                            </div>
                                            <div className="form-control">
                                                <input type="text" name="AdvertMessage" ref={register({ required: true })}
                                                    disabled={isCreateCompanyInProgress} />
                                                <div className="input-undeline"></div>
                                                <label>Advert Message</label>
                                                {errors.AdvertMessage && <span className="required-field">Please provide a valid Advert Message</span>}
                                            </div>
                                            <div className="form-control">

                                                <textarea name="PhysicalAddress" rows={3} ref={register({ required: true })}
                                                    disabled={isCreateCompanyInProgress}></textarea>
                                                <div className="input-undeline"></div>
                                                <label>Physical Address</label>
                                                {errors.PhysicalAddress && <span className="required-field">Please provide a valid Advert Message</span>}
                                            </div>
                                            <div className="form-control-check-box">
                                                <div className="IsPaymentOnProductLevel">
                                                    <div className="input-IsPaymentOnProductLevel">
                                                        <input type="checkbox" name="IsPaymentOnProductLevel" ref={register()} /><span>Are you accepting payment on each product?</span>

                                                    </div>



                                                </div>

                                            </div>



                                        </div>



                                        <div className="form-new-company-right">


                                            <div className="form-control-logo">
                                                <div className="title-control">
                                                    <div className="title">
                                                        <label>Select Company Logo</label>

                                                    </div>
                                                    <div className="controls">

                                                        <AddAPhotoIcon

                                                            style={{ fontSize: 35 }} className="icon "
                                                            onClick={(event) => handleSelectCompanyLogo(event)}
                                                        />


                                                        <input
                                                            type="file"
                                                            style={{ display: "none" }}
                                                            ref={UploadCompanyLogoInputRef}
                                                            accept="image/*"

                                                            onChange={(event) => selectCompanyLogo(event)}

                                                        />

                                                    </div>

                                                </div>
                                                {
                                                    stateSelectedCompanyLogoPath &&
                                                    <div className="image-preview-container">
                                                        <img
                                                            className="image-preview"
                                                            src={stateSelectedCompanyLogoPath}
                                                        />

                                                    </div>

                                                }

                                            </div>


                                            <div className="form-control-logo">
                                                <div className="title-control">
                                                    <div className="title">
                                                        <label>Select customer portal image</label>

                                                    </div>
                                                    <div className="controls">

                                                        <AddAPhotoIcon

                                                            style={{ fontSize: 35 }} className="icon "
                                                            onClick={(event) => handleSelectCustomerPortalLogo(event)}
                                                        />



                                                        <input
                                                            type="file"
                                                            style={{ display: "none" }}
                                                            ref={UploadCustomerPortalInputRef}
                                                            accept="image/*"

                                                            onChange={(event) => selectCustomerPortalImage(event)}

                                                        />



                                                    </div>

                                                </div>
                                                {
                                                    stateSelectedCustomerPortalPath &&
                                                    <div className="image-preview-container">
                                                        <img
                                                            className="image-preview"
                                                            src={stateSelectedCustomerPortalPath} />

                                                    </div>
                                                }
                                            </div>








                                        </div>
                                    </div>

                                    {
                                        !isCreateCompanyInProgress && <button className="btn-create-company" type="submit">Create Company</button>

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

export default NewCompany
