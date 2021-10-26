import React, { useContext } from "react";
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';

import { DataContext } from "../../context/context";
import Onboarding from '../Onboarding';
import Login from "../Login";
import Reset from "../Reset";
import Home from '../Home';
import Error from '../Error';
import Search from '../Result_Search';
import More_Info from "../More_Info";

import Chat from "../Chat/Chat";

import Add_CreditCard from "../Add_CreditCard";
import Address from "../Address/Address";
import Add_Address from "../Add_Address";
import Credit_Cards from "../Credit_Cards/Credit_Cards";
import SearchBy_Cat from '../SearchBy_cat';

import Confirm_Order from "../Confirm_Order/Confirm_Order";
import Order_Confirmed from "../Order_Confirmed/Order_Confirmed";
import Orders_List from "../Orders_List/Orders_List";
import Order_Details from '../Order_Details/Order_Details';

import loader from '../Loading';

const Main = () => {

  const { itsLog, setitsLog } = useContext(DataContext)
  return (
    <main>
     {/*  {itsLog === false ? <Redirect to='/login' /> : ''} */}
      <Switch>
        <Route path='/' component={Onboarding} exact />
        <Route path='/home' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/reset' component={Reset} />
        <Route path='/search' component={Search} />
        <Route path='/chat' component={Chat} />
        <Route path='/more' component={More_Info} />
        <Route path='/card' component={Credit_Cards} />
        <Route path='/addcard' component={Add_CreditCard} />
        <Route path='/address' component={Address} />
        <Route path='/add/address' component={Add_Address} />
        <Route path='/category' component={SearchBy_Cat} />
        <Route path='/confirmorder' component={Confirm_Order} />
        <Route path='/orderconfirmation' component={Order_Confirmed} />
        <Route path='/orders' component={Orders_List} />
        <Route path='/orderdetails' component={Order_Details} />
        <Route path='/loader' component={loader}/>
        <Route component={Error} />
      </Switch>
    </main>
  );
};

export default Main;
