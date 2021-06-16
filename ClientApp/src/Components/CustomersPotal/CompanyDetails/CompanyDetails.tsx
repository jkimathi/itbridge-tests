import React from 'react';
import '../../../Styles/CompanyDetails.scss';
import ICompanyDetailsProfile from '../../../Types/ICompanyDetailsProfile';


const CompanyDetails = (
    {
        companys_companyID,
        companys_name,
        companys_uniqueCode,
        companys_phonenumber,
        companys_email,
        companys_isPremium,
        companys_isPaymentOnProductLevel,
        companys_isActive,
        companys_activatedBy,
        companys_activatedDate,
        companys_deactivatedBy,
        companys_deactivatedDate,
        companys_websiteUrlLink,
        companys_advertMessage,
        companys_imagesLink,
        companys_documentsLink,
        companys_physicalAddress,
        companys_createdBy,
        companys_createdDate,
        companys_editedBy
    }: ICompanyDetailsProfile
) => {
    return (
        <div className="company-details">

            <div className="company-details-content">
                <div className="company-details-header">
                    <h2>Company Owner</h2>
                </div>
                <div className="company-details">
                    <div className="company-details-data">
                        <h3>Company Name: <span>{companys_name}</span></h3>


                    </div>
                    <div className="company-details-data">
                        <h3>Company code: <span>{companys_uniqueCode}</span></h3>


                    </div>




                    <div className="company-details-data">
                        <h3>Company type: <span>
                            {
                                companys_isPremium ? "Premium" : "Normal"

                            }
                        </span></h3>


                    </div>
                    <div className="company-details-data">
                        <h3>Company's status: <span>
                            {
                                companys_isActive ? "Active" : "Not active"

                            }
                        </span></h3>


                    </div>
                    <div className="company-details-data">
                        <h3>Image : <span>{companys_imagesLink ? companys_imagesLink : ""}</span></h3>


                    </div>
                    <div className="company-details-data">
                        <h3>Phone number: <span>{companys_phonenumber}</span></h3>


                    </div>
                    <div className="company-details-data">
                        <h3>Email Address: <span>{companys_email}</span></h3>


                    </div>
                    <div className="company-details-data">
                        <h3>Website: <span> {companys_websiteUrlLink}</span></h3>


                    </div>
                    <div className="company-details-data">
                        <h3>Advert: <span>{companys_advertMessage}</span></h3>



                    </div>
                    <div className="company-details-data">
                        <h3>Physical Address: <span>{companys_physicalAddress}</span></h3>


                    </div>



                </div>
            </div>

        </div>
    )
}

export default CompanyDetails
