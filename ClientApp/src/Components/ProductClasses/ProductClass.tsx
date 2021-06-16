import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/ProductClass.scss';

import PublicIcon from '@material-ui/icons/Public';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PageviewIcon from '@material-ui/icons/Pageview';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ListAltIcon from '@material-ui/icons/ListAlt';
import BookIcon from '@material-ui/icons/Book';

import IProduct from '../../Types/IProduct';
import IProductClasses from '../../Types/IProductClasses';



const ProductClass = (

    {

        classes_fromPlace, classes_fromPlaceName, classes_toPlace, classes_toPlaceName, classes_activatedBy, classes_activatedDate, classes_classID, classes_code, classes_createdBy,
        classes_createdDate,
        classes_deactivatedBy,
        classes_deactivatedDate,
        classes_descriptions,
        classes_editedBy,
        classes_editedDate,
        classes_isActive,
        classes_name,
        classes_price,
        classes_productID,
        classes_ticketsRangedFrom,
        classes_ticketsRangedTo,
        classes_totalNumberOfTickets,
        products_branchID,
        products_code,
        products_descriptions,
        products_fromPlace,
        products_isActive,
        products_name,
        products_productID,
        products_subcategoryID,
        products_toPlace }
        : IProductClasses) => {
    const MySwal = withReactContent(Swal);
    // const companyStatus = false;
    // let companyID: string;
    // companyID = companies_companyID;

    //delete productclass React.MouseEvent<HTMLButtonElement, MouseEvent>
    const handleDeleteProductClass = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, productClassId: string) => {


        MySwal.fire({
            title: 'Are you sure?',
            text: `You are about to delete the following company: ${productClassId}. You won't be able to revert this!`,
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
        <div className="product-class-card">
            <div className="product-class-name">



                <h2>Product class name: <span>{classes_name}</span></h2>

            </div>
            <div className="product-class-code">

                <h2>Product class code: <span>{classes_code}</span></h2>



            </div>
            <div className="product-class-from-place">
                <h2>From: <span>{classes_fromPlaceName}</span></h2>
            </div>
            <div className="product-class-to-place">

                <h2>To: <span>{classes_toPlaceName}</span></h2>



            </div>

            {/* branchID, branchesEmail, branchesName, branchesPhonenumber, , createdBy,
            createdDate, deactivatedDate,descriptions,fromPlace,fromPlace_Name,fromplace_name,
            isActive,,subcategoryID,toPlace */}

            {/* <div className="company-status">
                {


                    companies_isActive ? <h2>Company's Status: <span className="status-active"><LockOpenIcon className="icon-company-status" style={{ fontSize: 20 }} /> Active</span></h2>
                        :
                        <h2>Company's Status: <span className="status-not-active"><LockIcon className="icon-company-status" style={{ fontSize: 20 }} />Not Active</span></h2>


                }


            </div> */}
            {/* <div className="company-physical-address">
                <h2>Company Physical address: <span>{companies_physicalAddress}</span></h2>

            </div> */}
            {/* <div className="company-advert">

                <h2>Company Advert: <span>{companies_advertMessage}</span></h2>
            </div> */}
            <div className="product-class-action-status">
                <div className="product-class-action-view">
                    <Link to={`/classes/view/${classes_classID}`}>
                        <PageviewIcon className="icon-product-class-action" style={{ fontSize: 20 }} />View </Link>


                </div>


                {/* <div className="product-class-action-booking">
                    {/* <Link to={companies_websiteUrlLink}><PublicIcon className="icon-company-action" style={{ fontSize: 20 }} />Homepage</Link> */}
                {/* <Link to={`/bookings/view/${classes_classID}`}>
                    <ListAltIcon className="icon-product-class-action" style={{ fontSize: 20 }} />
                    Delete</Link>

            </div>  */}
                <button className="product-class-action-delete" onClick={(event) => handleDeleteProductClass(event, classes_classID)}>
                    {/* <button className="btn-delete-company"> */}
                    <DeleteForeverIcon className="icon-product-class-action-delete" style={{ fontSize: 20 }} />Delete


                    {/* </button> */}

                </button>



            </div>

        </div >
    )
}

export default ProductClass
