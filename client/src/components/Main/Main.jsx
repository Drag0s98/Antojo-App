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
        <Route component={Error} />
      </Switch>
    </main>
  );
};

export default Main;
