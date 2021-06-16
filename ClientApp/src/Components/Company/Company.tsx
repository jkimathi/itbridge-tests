import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Company.scss';

import PublicIcon from '@material-ui/icons/Public';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PageviewIcon from '@material-ui/icons/Pageview';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ICompanies from '../../Types/ICompanies';



const Company = (
    { companies_companyID, companies_name, companies_uniqueCode, companies_phonenumber, companies_email, companies_isPremium, companies_isActive, companies_websiteUrlLink, companies_advertMessage, companies_imagesLink, companies_physicalAddress
    }: ICompanies
) => {
    const MySwal = withReactContent(Swal);

    let companyID: string;
    companyID = companies_companyID;

    //delete company React.MouseEvent<HTMLButtonElement, MouseEvent>
    const handleDeleteCompany = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, companyid: string) => {


        MySwal.fire({
            title: 'Are you sure?',
            text: `You are about to delete the following company: ${companies_name}. You won't be able to revert this!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',

        }).then((result) => {
            if (result.isConfirmed) {
                MySwal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        });

        /**
         * Swal.fire({
  title: 'Submit your Github username',
  input: 'text',
  inputAttributes: {
    autocapitalize: 'off'
  },
  showCancelButton: true,
  confirmButtonText: 'Look up',
  showLoaderOnConfirm: true,
  preConfirm: (login) => {
    return fetch(`//api.github.com/users/${login}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .catch(error => {
        Swal.showValidationMessage(
          `Request failed: ${error}`
        )
      })
  },
  allowOutsideClick: () => !Swal.isLoading()
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: `${result.value.login}'s avatar`,
      imageUrl: result.value.avatar_url
    })
  }
})
         */

    };
    return (
        <div className="company-card">
            <div className="company-name">
                <h2>Company name: <span>{companies_name}</span></h2>

            </div>
            <div className="company-phone-number">

                <h2>Phone number: <span>{companies_phonenumber}</span></h2>



            </div>
            {/* <div className="company-unique-code">
                <h2>Company Code: <span>{companies_uniqueCode}</span></h2>
            </div> */}
            <div className="company-email">

                <h2>Company Email: <span>{companies_email}</span></h2>



            </div>
            <div className="company-status">
                {


                    companies_isActive ? <h2>Company's Status: <span className="status-active"><LockOpenIcon className="icon-company-status" style={{ fontSize: 20 }} /> Active</span></h2>
                        :
                        <h2>Company's Status: <span className="status-not-active"><LockIcon className="icon-company-status" style={{ fontSize: 20 }} />Not Active</span></h2>


                }


            </div>
            <div className="company-physical-address">
                <h2>Company Physical address: <span>{companies_physicalAddress}</span></h2>

            </div>
            {/* <div className="company-advert">

                <h2>Company Advert: <span>{companies_advertMessage}</span></h2>
            </div> */}
            <div className="company-action-status">
                <div className="company-action-view">
                    <Link to={`/companies/view/${companies_companyID}`}><PageviewIcon className="icon-company-action" style={{ fontSize: 20 }} />View</Link>


                </div>
                <div className="company-action-homepage">
                    <Link
                        to={`/${companies_websiteUrlLink}`}
                        target="_blank"

                    >
                        <PublicIcon className="icon-company-action" style={{ fontSize: 20 }} />Homepage</Link>

                </div>
                <button className="company-action-delete" onClick={(event) => handleDeleteCompany(event, companyID)}>
                    {/* <button className="btn-delete-company"> */}
                    <DeleteForeverIcon className="icon-company-action-delete" style={{ fontSize: 20 }} />Delete


                    {/* </button> */}

                </button>


            </div>

        </div >
    )
}

export default Company
