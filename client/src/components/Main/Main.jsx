import React from "react";
import { Route, Switch } from 'react-router-dom';

import Browser from '../Browser';
import Login from "../Login/Login";
import Reset from "../Reset/Reset";



const Main = () => {



  return (
    <main>
      <Switch>
        <Route to='/' component={Browser} exact />
        <Route to='/' component={Login} />
        <Route to='/' component={Reset} />
      </Switch>
    </main>
  );
};

export default Main;
