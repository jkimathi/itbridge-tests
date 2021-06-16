import React, { Suspense } from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { GridLoader, HashLoader } from 'react-spinners';



import '../Styles/App.scss';

const Login = React.lazy(() => import('../Components/Authentication/Login'));
const SignUp = React.lazy(() => import('../Components/Authentication/SignUp'));
const Dashboard = React.lazy(() => import('../Components/Dashboard/DashBoard'));
//companies components
const Companies = React.lazy(() => import('../Components/Company/Companies'));
const NewCompany = React.lazy(() => import('../Components/Company/NewCompany'));

const ViewCompany = React.lazy(() => import('../Components/Company/ViewCompany'));


//companies components
const Branches = React.lazy(() => import('../Components/Branch/Branches'));
const NewBranch = React.lazy(() => import('../Components/Branch/NewBranch'));

const ViewBranch = React.lazy(() => import('../Components/Branch/ViewBranch'));
//company portal 
const CustomersPortal = React.lazy(() => import('../Components/CustomersPotal/CustomersPortal'));
//customer booking
const CustomerBooking = React.lazy(() => import('../Components/EventBooking/EventBooking'));

//products components
const Products = React.lazy(() => import('../Components/Products/Products'));
const NewProduct = React.lazy(() => import('../Components/Products/NewProduct'));
const ViewProduct = React.lazy(() => import('../Components/Products/ViewProduct'));
//confirm payment
const ComfirmPayment = React.lazy(() => import('../Components/PaymentConfirmation/PaymentConfirmation'));
//classes components
const Classes = React.lazy(() => import('../Components/ProductClasses/ProductClasses'));
const NewClass = React.lazy(() => import('../Components/ProductClasses/NewClass'));
const ViewClass = React.lazy(() => import('../Components/ProductClasses/ViewClass'));



//company booking
const CompanyBookingList = React.lazy(() => import('../Components/CompanyBookings/CompanyBookings'));



//payment options


const PaymentOptions = React.lazy(() => import('../Components/PaymentOptions/PaymentOptions'));
const ViewPaymentOptions = React.lazy(() => import('../Components/PaymentOptions/ViewPaymentOption'));
const NewPaymentOption = React.lazy(() => import('../Components/PaymentOptions/NewPaymentOption'));
const ViewPaymentOptionItemList = React.lazy(() => import('../Components/PaymentOptions/PaymentOptionsList'));


//events
const EventsLIst = React.lazy(() => import('../Components/Events/Events'));
const NewEvent = React.lazy(() => import('../Components/Events/NewEvent'));
const ViewEvent = React.lazy(() => import('../Components/Events/ViewEvent'));


const Logout = React.lazy(() => import('../Components/Authentication/Logout'));

//search page
const DefaultSearchPage = React.lazy(() => import('../Components/MainSearchPage/MainSearchPage'));

const PageNotFound = React.lazy(() => import('../Components/PageNotFound/PageNotFound'));

function App() {
  return (
    <div className="App">

      <Router>
        <Suspense fallback={<div className="loader-container"><GridLoader
          size={20} margin={2} color="#0078d4" /></div>}>
          <Switch>


            <Route exact path="/" component={DefaultSearchPage} />

            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} />

            <Route exact path="/companies/list" component={Companies} />

            <Route exact path="/companies/view/:companyId" component={ViewCompany} />
            <Route exact path="/companies/new" component={NewCompany} />



            <Route exact path="/branches/list" component={Branches} />

            <Route exact path="/branches/view/:branchId" component={ViewBranch} />
            <Route exact path="/branches/new" component={NewBranch} />

            <Route exact path="/products/list" component={Products} />
            <Route exact path="/products/view/:productId" component={ViewProduct} />
            <Route exact path="/products/new" component={NewProduct} />


            <Route exact path="/classes/list/:productID" component={Classes} />
            <Route exact path="/classes/view/:productClassId" component={ViewClass} />
            <Route exact path="/classes/new/" component={NewClass} />

            <Route exact path="/payments/list" component={PaymentOptions} />
            <Route exact path="/payments/view/:itemID" component={ViewPaymentOptionItemList} />

            <Route exact path="/payments/new" component={NewPaymentOption} />


            <Route exact path="/events/list" component={EventsLIst} />
            <Route exact path="/events/new" component={NewEvent} />
            <Route exact path="/events/view/:eventID" component={ViewEvent} />


            <Route exact path="/:companyLink" component={CustomersPortal} />
            <Route exact path="/portal/booking/:companyLink/:eventClasses_eventClassID" component={CustomerBooking} />


            <Route exact path="/portal/payment" component={ComfirmPayment} />

            <Route exact path="/bookings/list/:eventID" component={CompanyBookingList} />
            <Route exact path="/logout" component={Logout} />


            <Route component={PageNotFound} />


          </Switch>

        </Suspense>
      </Router>



    </div>
  );
}

export default App;
