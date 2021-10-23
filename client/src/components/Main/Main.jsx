import React from "react";
import { Route, Switch } from 'react-router-dom';

import Onboarding from '../Onboarding';
import Login from "../Login";
import Reset from "../Reset";
import Home from '../Home';
import Error from '../Error';
import Search from '../Result_Search';
import More_Info from "../More_Info";
import Add_CreditCard from "../Add_CreditCard";

const Main = () => {

  return (
    <main>
      <Switch>
        <Route path='/' component={Onboarding} exact />
        <Route path='/home' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/reset' component={Reset} />
        <Route path='/search' component={Search} />
        <Route path='/more' component={More_Info} />
        <Route path='/addcard' component={Add_CreditCard} />
        <Route component={Error} />
      </Switch>
    </main>
  );
};

export default Main;
