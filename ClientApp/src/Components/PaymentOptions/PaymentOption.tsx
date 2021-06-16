import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/PaymentOption.scss';

import PublicIcon from '@material-ui/icons/Public';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PageviewIcon from '@material-ui/icons/Pageview';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import MoonLoader from 'react-spinners';
import IPaymentOptionsList from '../../Types/IPaymentOptionsList';
import IPaymentField from '../../Types/IPaymentField';

const PaymentOption = ({ companyPaymentMethodID, fields, itemID, itemName, paymentMethodID, paymentMethodName }: IPaymentOptionsList
) => {
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



  };

  const fieldsJson: IPaymentField = JSON.parse(fields);

  return (
    <div className="payment-option-card">






      <div className="payment-option-itemName">

        <h2>Item Name: <span>{itemName}</span></h2>


      </div>
      <div className="payment-option-paymentMethodName">

        <h2>Payment Method Name : <span>{paymentMethodName}</span></h2>


      </div>


      <div className="payment-option-fields">


        {
          fieldsJson.bankName ?
            <h2>Bank Name: <span>{fieldsJson.bankName}</span></h2>
            :
            ""
        }





        {
          fieldsJson.branchCode ?
            <h2>Bank Code: <span>{fieldsJson.branchCode}</span></h2>
            :
            ""
        }




        {
          fieldsJson.accountNumber ?
            <h2>Bank Account Number: <span>{fieldsJson.accountNumber}</span></h2>
            :
            ""
        }

        {
          fieldsJson.phoneNumber ?
            <h2>Mobile payment number: <span>{fieldsJson.phoneNumber}</span></h2>
            :
            ""
        }






        {
          fieldsJson.cardName ?
            <h2>Card Name: <span>{fieldsJson.cardName}</span></h2>
            :
            ""
        }


        {
          fieldsJson.cardNumber ?

            <h2>Card Number: <span>{fieldsJson.cardNumber}</span></h2>
            :
            ""
        }








      </div>



      <div className="payment-option-action-status">
        <div className="payment-option-action-view">
          <Link to={`/view/${companyPaymentMethodID}`}><PageviewIcon className="icon-payment-option-action" style={{ fontSize: 20 }} />View</Link>


        </div>
        {/* <div className="payment-option-action-homepage">
          <Link to=""><PublicIcon className="icon-payment-option-action" style={{ fontSize: 20 }} />Homepage</Link>

        </div> */}
        <button className="payment-option-action-delete" onClick={(event) => handleDeleteCompany(event, '45122')}>
          {/* <button className="btn-delete-company"> */}
          <DeleteForeverIcon className="icon-payment-option-action-delete" style={{ fontSize: 20 }} />Delete


          {/* </button> */}

        </button>


      </div>

    </div>
  )
}

export default PaymentOption
