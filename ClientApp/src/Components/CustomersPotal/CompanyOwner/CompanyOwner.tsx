import React from 'react';
import '../../../Styles/CompanyOwner.scss'
import ICompany_owner from '../../../Types/ICompany_owner';

const CompanyOwner = (
    { owners_userID, owners_token, owners_name, owners_surname, owners_dateOfBirth,
        owners_imageLink, owners_genderID, owners_titleID, owners_languageID,
        owners_countryID, owners_createdBy, owners_createdDate }: ICompany_owner
) => {
    return (
        <div className="company-owner">
            <div className="company-owner-content">

                <div className="owner-header">
                    <h2>Company Owner</h2>
                </div>
                <div className="owner-details">
                    <div className="owners-details-name">
                        <h3>Owner's Name: <span>{owners_name}</span></h3>


                    </div>
                    <div className="owners-details-surname">
                        <h3>Owner's Surname: <span>{owners_surname}</span></h3>


                    </div>
                    <div className="owners-details-email">
                        <h3>Owner's Email: <span></span></h3>


                    </div>
                    <div className="owners-details-phone">
                        <h3>Owner's Phone: <span></span></h3>


                    </div>

                </div>
            </div>

        </div >
    )
}

export default CompanyOwner
