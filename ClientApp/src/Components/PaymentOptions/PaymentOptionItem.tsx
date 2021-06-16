import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/PaymentOptionItem.scss';

import PublicIcon from '@material-ui/icons/Public';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PageviewIcon from '@material-ui/icons/Pageview';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import MoonLoader from 'react-spinners';
import IPaymentOptionItem from '../../Types/IPaymentOptionItem';

const PaymentOptionItem = ({ itemName, itemID }: IPaymentOptionItem) => {
  const MySwal = withReactContent(Swal);
  const companyStatus = false;

  //delete company React.MouseEvent<HTMLButtonElement, MouseEvent>
  const handleDeleteCompany = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, companyID: string) => {


    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
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
    <div className="payment-option-item-card">






      <div className="payment-option-item-itemName">

        <h2>Item Name: <span>{itemName}</span></h2>


      </div>





      <div className="payment-option-item-action-status">
        <div className="payment-option-item-action-view">
          <Link to={`/payments/view/${itemID}`}><PageviewIcon className="icon-payment-option-item-action" style={{ fontSize: 20 }} />View</Link>


        </div>
        {/* <div className="payment-option-item-action-edit">
          <Link to=""><PublicIcon className="icon-payment-option-item-action" style={{ fontSize: 20 }} />Edit</Link>

        </div> */}
        <button className="payment-option-item-action-delete" onClick={(event) => handleDeleteCompany(event, '45122')}>
          {/* <button className="btn-delete-company"> */}
          <DeleteForeverIcon className="icon-payment-option-item-action-delete" style={{ fontSize: 20 }} />Delete


          {/* </button> */}

        </button>


      </div>

    </div>
  )
}

export default PaymentOptionItem
