import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Product.scss';

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



const Product = (
    {

        branchID, branchesEmail, branchesName, branchesPhonenumber, code, createdBy, createdDate, deactivatedDate, descriptions, isActive, name, ProductID, subcategoryID, productID
    }: IProduct
) => {

    return (
        <div className="product-card">
            <div className="product-name">


                <h2>Product name: <span>{name}</span></h2>

            </div>
            <div className="product-code">

                <h2>Product code: <span>{code}</span></h2>



            </div>
            <div className="product-from-place">
                <h2>Description: <span>{descriptions}</span></h2>
            </div>
            <div className="product-to-place">

                <h2>Branch Name: <span>{branchesName}</span></h2>



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
            <div className="product-action-status">
                <div className="product-action-view">
                    <Link to={`/products/view/${productID}`}>
                        <PageviewIcon className="icon-product-action" style={{ fontSize: 20 }} />View Product</Link>


                </div>
                <div className="product-action-classes">
                    {/* <Link to={companies_websiteUrlLink}><PublicIcon className="icon-company-action" style={{ fontSize: 20 }} />Homepage</Link> */}
                    <Link to={`/classes/list/${productID}`}>
                        <BookIcon className="icon-product-action" style={{ fontSize: 20 }} />
                        View Classes</Link>

                </div>

                <div className="product-action-booking">
                    {/* <Link to={companies_websiteUrlLink}><PublicIcon className="icon-company-action" style={{ fontSize: 20 }} />Homepage</Link> */}
                    {/* <Link to={`/bookings/view/${productID}`}>
                        <ListAltIcon className="icon-product-action" style={{ fontSize: 20 }} />
                        View Booking</Link> */}

                </div>



            </div>

        </div >
    )
}

export default Product
